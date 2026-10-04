const resources = [
  { name: "Claude Code", category: "AI Coding", logo: "claude-code-mascot", description: "Agentic coding tool for understanding, editing, and working across real codebases.", url: "https://www.anthropic.com/claude-code" },
  { name: "GitHub Copilot", category: "AI Coding", logo: "github", description: "AI coding tools integrated with GitHub and popular development environments.", url: "https://github.com/features/copilot" },
  { name: "Codex", category: "AI Coding", logo: "codex", description: "OpenAI's coding agent for writing, reviewing, and fixing code from the terminal or the cloud.", url: "https://openai.com/codex/" },
  { name: "Claude", category: "AI Chat", logo: "claude-ai", description: "Anthropic's assistant for writing, analysis, coding, and long-document work.", url: "https://claude.ai/" },
  { name: "ChatGPT", category: "AI Chat", logo: "chatgpt", description: "OpenAI's general-purpose assistant for chat, images, voice, and research.", url: "https://chatgpt.com/" },
  { name: "Gemini", category: "AI Chat", logo: "gemini", description: "Google's AI assistant with deep Google Workspace and Search integration.", url: "https://gemini.google.com/" },
  { name: "DeepSeek", category: "AI Chat", logo: "deepseek", description: "Open-weight reasoning and coding models with a free chat interface.", url: "https://www.deepseek.com/" },
  { name: "Visual Studio Code", category: "Apps", logo: "vscode", description: "Popular, extensible code editor with a huge extension ecosystem.", url: "https://code.visualstudio.com/" },
  { name: "Zed", category: "Apps", logo: "zed", description: "Fast modern code editor focused on collaboration and a lightweight experience.", url: "https://zed.dev/" },
  { name: "PyCharm", category: "Apps", logo: "pycharm", description: "JetBrains' Python IDE with strong refactoring, debugging, and environment tooling.", url: "https://www.jetbrains.com/pycharm/" },
  { name: "Brave", category: "Apps", logo: "brave", description: "Chromium-based browser with privacy protections built in.", url: "https://brave.com/" },
  { name: "Firefox", category: "Apps", logo: "firefox", description: "Independent open-source browser with strong privacy controls and customization.", url: "https://www.mozilla.org/firefox/" },
  { name: "Discord", category: "Apps", logo: "discord", description: "Voice, text, and communities. Home to most dev, AI, and gaming servers.", url: "https://discord.com/" },
  { name: "Hacker News", category: "News", logo: "hacker-news", description: "Developer-heavy news and discussion around startups, programming, AI, and technology.", url: "https://news.ycombinator.com/" },
  { name: "Ars Technica", category: "News", logo: "ars-technica", description: "Technology reporting covering software, hardware, science, security, and policy.", url: "https://arstechnica.com/" },
  { name: "OpenAI News", category: "News", logo: "chatgpt", description: "Official product, research, and company announcements from OpenAI.", url: "https://openai.com/news/" },
  { name: "Anthropic News", category: "News", logo: "claude-ai", description: "Official Claude, research, safety, and product announcements from Anthropic.", url: "https://www.anthropic.com/news" },
  { name: "Simple Icons", category: "Design", logo: "simple-icons", description: "A massive collection of free SVG brand icons for popular tech products and services.", url: "https://simpleicons.org/" },
  { name: "SVG Repo", category: "Design", emoji: "🖼️", description: "Large collection of SVG vectors and icons for websites and projects.", url: "https://www.svgrepo.com/" },
  { name: "Linux", category: "Operating Systems", logo: "linux", description: "Open-source operating system ecosystem with distributions for nearly every kind of machine.", url: "https://www.linux.org/" },
  { name: "Windows", category: "Operating Systems", logo: "windows", description: "Microsoft's desktop operating system and the most common platform for PC software and gaming.", url: "https://www.microsoft.com/windows/" },
  { name: "macOS", category: "Operating Systems", logo: "macos", description: "Apple's desktop operating system for Mac computers, popular in software and creative workflows.", url: "https://www.apple.com/macos/" },
  { name: "GitHub", category: "Developer Tools", logo: "github", description: "Code hosting, collaboration, issues, releases, Actions, and open-source discovery.", url: "https://github.com/" },
  { name: "Git", category: "Developer Tools", logo: "git", description: "The version control system behind nearly every modern software project.", url: "https://git-scm.com/" },
  { name: "Cloudflare", category: "Developer Tools", logo: "cloudflare", description: "Web infrastructure, DNS, CDN, Workers, storage, security, and developer services.", url: "https://www.cloudflare.com/" },
  { name: "Windows Terminal", category: "Developer Tools", logo: "terminal", description: "Modern tabbed terminal for PowerShell, Command Prompt, and WSL.", url: "https://aka.ms/terminal" },
  { name: "MDN Web Docs", category: "Learning", logo: "javascript", description: "One of the best references for HTML, CSS, JavaScript, browser APIs, and web standards.", url: "https://developer.mozilla.org/" },
  { name: "TryHackMe", category: "Learning", logo: "tryhackme", description: "Guided, hands-on cybersecurity rooms that are beginner friendly.", url: "https://tryhackme.com/" },
  { name: "Roblox Creator Hub", category: "Learning", logo: "roblox-studio", description: "Docs, tutorials, and tools for building and publishing Roblox experiences.", url: "https://create.roblox.com/" }
];

const categoryEmoji = {
  "AI Coding": "🤖", "AI Chat": "💬", "Apps": "💻", "News": "📰", "Design": "🎨",
  "Operating Systems": "🖥️", "Developer Tools": "🔧", "Learning": "📚"
};

const grid = document.querySelector("#resourceGrid");
const filters = document.querySelector("#filters");
const search = document.querySelector("#search");
const count = document.querySelector("#resultCount");

let activeCategory = "All";
const categories = ["All", ...new Set(resources.map(item => item.category))];

const label = category => category === "All" ? "✨ All" : `${categoryEmoji[category] || "📦"} ${category}`;

function renderFilters() {
  filters.innerHTML = categories.map(category =>
    `<button type="button" class="filter ${category === activeCategory ? "active" : ""}" data-category="${category}" aria-pressed="${category === activeCategory}">${label(category)}</button>`
  ).join("");
}

function iconFor(item) {
  return item.logo
    ? `<img src="./emojis/${item.logo}.svg" alt="" loading="lazy" width="28" height="28" />`
    : `<span aria-hidden="true">${item.emoji || categoryEmoji[item.category]}</span>`;
}

function renderResources() {
  const q = search.value.trim().toLowerCase();

  const shown = resources.filter(item => {
    const inCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = [item.name, item.category, item.description].join(" ").toLowerCase().includes(q);
    return inCategory && matchesSearch;
  });

  count.textContent = `${shown.length} ${shown.length === 1 ? "resource" : "resources"}`;

  const showTag = activeCategory === "All";
  grid.innerHTML = shown.length
    ? shown.map(item => `
      <a class="card" href="${item.url}" target="_blank" rel="noreferrer">
        <div class="card-head">
          <div class="icon">${iconFor(item)}</div>
          <div>
            <h3>${item.name}</h3>
            ${showTag ? `<span class="tag">${categoryEmoji[item.category] || "📦"} ${item.category}</span>` : ""}
          </div>
          <span class="arrow" aria-hidden="true">↗</span>
        </div>
        <p>${item.description}</p>
      </a>
    `).join("")
    : '<div class="empty">🔍 Nothing matched that search.</div>';
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  history.replaceState(null, "", activeCategory === "All" ? location.pathname : "#" + encodeURIComponent(activeCategory));
  renderFilters();
  renderResources();
});

search.addEventListener("input", renderResources);

document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== search && !event.metaKey && !event.ctrlKey) {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape" && document.activeElement === search) {
    search.value = "";
    search.blur();
    renderResources();
  }
});

const fromHash = decodeURIComponent(location.hash.slice(1));
if (categories.includes(fromHash)) activeCategory = fromHash;

renderFilters();
renderResources();
