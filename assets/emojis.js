const emojis = [
  ["Linux","OS","linux.svg"],["macOS","OS","macos.svg"],["Windows","OS","windows.svg"],
  ["Claude AI","AI","claude-ai.svg"],["Claude Code Mascot","AI","claude-code-mascot.svg"],["ChatGPT","AI","chatgpt.svg"],["Codex","AI","codex.svg"],
  ["Apple","Platform","apple.svg"],["Samsung","Platform","samsung.svg"],["Android","Platform","android.svg"],["Google","Platform","google.svg"],
  ["Brave","Browser","brave.svg"],["Firefox","Browser","firefox.svg"],
  ["VS Code","Developer","vscode.svg"],["Zed","Developer","zed.svg"],["PyCharm","Developer","pycharm.svg"],["Python","Developer","python.svg"],
  ["JavaScript","Developer","javascript.svg"],["HTML","Developer","html.svg"],["CSS","Developer","css.svg"],["C++","Developer","cplusplus.svg"],
  ["C#","Developer","csharp.svg"],["Markdown","Developer","markdown.svg"],["PHP","Developer","php.svg"],["PowerShell","Developer","powershell.svg"],
  ["Terminal","Developer","terminal.svg"],["Discord","Social","discord.svg"],["Roblox Studio","Developer","roblox-studio.svg"],["Roblox","Gaming","roblox.svg"],
  ["File Explorer","Utility","file-explorer.svg"],["SQLite","Developer","sqlite.svg"],["TryHackMe","Developer","tryhackme.svg"],
  ["Folder","Utility","folder.svg"],["Zip Folder","Utility","zip-folder.svg"],["GitHub","Developer","github.svg"],["Git","Developer","git.svg"],
  ["Xcode","Developer","xcode.svg"],["Expo Go","Developer","expo-go.svg"],["React Native","Developer","react-native.svg"],["Unity","Developer","unity.svg"],
  ["Unreal Engine","Developer","unreal-engine.svg"],["Fortnite","Gaming","fortnite.svg"],["Epic Games","Gaming","epic-games.svg"],["Xbox","Gaming","xbox.svg"],
  ["PlayStation","Gaming","playstation.svg"],["YouTube","Social","youtube.svg"],["Instagram","Social","instagram.svg"],["Snapchat","Social","snapchat.svg"],
  ["TikTok","Social","tiktok.svg"],["DeepSeek","AI","deepseek.svg"],["Kimi AI","AI","kimi-ai.svg"],["Gemini","AI","gemini.svg"]
].map(([name,category,file]) => ({ name, category, file: "./emojis/" + file }));

const grid = document.querySelector("#emojiGrid");
const search = document.querySelector("#emojiSearch");
const filters = document.querySelector("#emojiFilters");
const previewButtons = document.querySelectorAll("[data-preview]");
const count = document.querySelector("#emojiCount");

let category = "All";
let preview = "checker";
const categories = ["All", ...new Set(emojis.map(item => item.category))];
const categoryEmoji = { All: "✨", OS: "🖥️", AI: "🤖", Platform: "📱", Browser: "🌐", Developer: "💻", Social: "💬", Gaming: "🎮", Utility: "🧰" };

function renderFilters() {
  filters.innerHTML = categories.map(item =>
    `<button type="button" class="emoji-filter ${item === category ? "active" : ""}" data-category="${item}" aria-pressed="${item === category}">${categoryEmoji[item] || "📦"} ${item}</button>`
  ).join("");
}

function render() {
  const q = search.value.trim().toLowerCase();
  const results = emojis.filter(item =>
    (category === "All" || item.category === category) &&
    (item.name + " " + item.category).toLowerCase().includes(q)
  );

  count.textContent = results.length;

  grid.innerHTML = results.length ? results.map(item => `
    <article class="emoji-card">
      <div class="emoji-preview ${preview}">
        <img src="${item.file}" alt="${item.name} transparent emoji" loading="lazy" />
      </div>
      <div class="emoji-info">
        <div class="emoji-name">
          <h2>${item.name}</h2>
          <span>${item.category}</span>
        </div>
        <div class="emoji-actions">
          <a href="${item.file}" download>SVG</a>
          <button type="button" data-png="${item.file}" data-name="${item.name}">PNG 256</button>
        </div>
      </div>
    </article>
  `).join("") : '<div class="emoji-empty">No emojis matched that search.</div>';
}

async function downloadPng(file, name) {
  const response = await fetch(file);
  let svg = await response.text();
  svg = svg.replaceAll("currentColor", "#000000");

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const image = new Image();

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = objectUrl;
  });

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);

  const scale = Math.min(size / image.width, size / image.height) * 0.82;
  const width = image.width * scale;
  const height = image.height * scale;
  ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);

  URL.revokeObjectURL(objectUrl);

  const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  const link = document.createElement("a");
  link.href = URL.createObjectURL(pngBlob);
  link.download = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".png";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  category = button.dataset.category;
  renderFilters();
  render();
});

search.addEventListener("input", render);

document.addEventListener("click", event => {
  const button = event.target.closest("[data-png]");
  if (!button) return;
  downloadPng(button.dataset.png, button.dataset.name).catch(() => {
    button.textContent = "try again";
    setTimeout(() => button.textContent = "PNG 256", 1200);
  });
});

previewButtons.forEach(button => {
  button.addEventListener("click", () => {
    preview = button.dataset.preview;
    previewButtons.forEach(item => item.classList.toggle("active", item === button));
    render();
  });
});

renderFilters();
render();