const resources = [
  { name: "Claude Code", category: "AI Coding", icon: "AI", description: "Agentic coding tool for understanding, editing, and working across real codebases.", url: "https://www.anthropic.com/claude-code" },
  { name: "GitHub Copilot", category: "AI Coding", icon: "GH", description: "AI coding tools integrated with GitHub and popular development environments.", url: "https://github.com/features/copilot" },
  { name: "Visual Studio Code", category: "Apps", icon: "VS", description: "Popular, extensible code editor with a huge extension ecosystem.", url: "https://code.visualstudio.com/" },
  { name: "Zed", category: "Apps", icon: "ZD", description: "Fast modern code editor focused on collaboration and a lightweight experience.", url: "https://zed.dev/" },
  { name: "Brave", category: "Apps", icon: "BR", description: "Chromium-based browser with privacy protections built in.", url: "https://brave.com/" },
  { name: "Firefox", category: "Apps", icon: "FF", description: "Independent open-source browser with strong privacy controls and customization.", url: "https://www.mozilla.org/firefox/" },
  { name: "Hacker News", category: "News", icon: "HN", description: "Developer-heavy news and discussion around startups, programming, AI, and technology.", url: "https://news.ycombinator.com/" },
  { name: "Ars Technica", category: "News", icon: "AR", description: "Technology reporting covering software, hardware, science, security, and policy.", url: "https://arstechnica.com/" },
  { name: "OpenAI News", category: "News", icon: "OA", description: "Official product, research, and company announcements from OpenAI.", url: "https://openai.com/news/" },
  { name: "Anthropic News", category: "News", icon: "AN", description: "Official Claude, research, safety, and product announcements from Anthropic.", url: "https://www.anthropic.com/news" },
  { name: "Simple Icons", category: "Design", icon: "SI", description: "A massive collection of free SVG brand icons for popular tech products and services.", url: "https://simpleicons.org/" },
  { name: "SVG Repo", category: "Design", icon: "SVG", description: "Large collection of SVG vectors and icons for websites and projects.", url: "https://www.svgrepo.com/" },
  { name: "Linux", category: "Operating Systems", icon: "LX", description: "Open-source operating system ecosystem with distributions for nearly every kind of machine.", url: "https://www.linux.org/" },
  { name: "Windows", category: "Operating Systems", icon: "WIN", description: "Microsoft's desktop operating system and the most common platform for PC software and gaming.", url: "https://www.microsoft.com/windows/" },
  { name: "macOS", category: "Operating Systems", icon: "MAC", description: "Apple's desktop operating system for Mac computers, popular in software and creative workflows.", url: "https://www.apple.com/macos/" },
  { name: "GitHub", category: "Developer Tools", icon: "GH", description: "Code hosting, collaboration, issues, releases, Actions, and open-source discovery.", url: "https://github.com/" },
  { name: "Cloudflare", category: "Developer Tools", icon: "CF", description: "Web infrastructure, DNS, CDN, Workers, storage, security, and developer services.", url: "https://www.cloudflare.com/" },
  { name: "MDN Web Docs", category: "Learning", icon: "MDN", description: "One of the best references for HTML, CSS, JavaScript, browser APIs, and web standards.", url: "https://developer.mozilla.org/" }
];

const grid = document.querySelector("#resourceGrid");
const filters = document.querySelector("#filters");
const search = document.querySelector("#search");

let activeCategory = "All";
const categories = ["All", ...new Set(resources.map(item => item.category))];

function renderFilters() {
  filters.innerHTML = categories.map(category =>
    `<button class="filter ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`
  ).join("");
}

function renderResources() {
  const q = search.value.trim().toLowerCase();

  const shown = resources.filter(item => {
    const inCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = [item.name, item.category, item.description]
      .join(" ")
      .toLowerCase()
      .includes(q);
    return inCategory && matchesSearch;
  });

  grid.innerHTML = shown.length
    ? shown.map(item => `
      <article class="card">
        <div class="card-top">
          <div class="icon">${item.icon}</div>
          <span class="tag">${item.category}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a href="${item.url}" target="_blank" rel="noreferrer">visit ↗</a>
      </article>
    `).join("")
    : '<div class="empty">Nothing matched that search.</div>';
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderResources();
});

search.addEventListener("input", renderResources);

renderFilters();
renderResources();
