// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode")
    ? "Make Light Mode"
    : "Make Dark Mode";
});

// Tabs
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Q2: Event Logging
function logEvent(event, type) {
  const tag = event.target.tagName.toLowerCase();
  let objType = "text";
  if (tag === "img") objType = "image";
  else if (tag === "select") objType = "drop-down";
  else if (tag === "button") objType = "button";

  console.log(`${new Date().toISOString()} | ${type} | ${objType}`);
}
document.addEventListener("click", e => logEvent(e, "click"));
window.addEventListener("load", e => logEvent(e, "view"));

// Q3: Text Analysis
function analyzeText() {
  const text = document.getElementById("text-input").value;
  const output = document.getElementById("text-output");

  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const words = (text.match(/\b\w+\b/g) || []).length;
  const spaces = (text.match(/ /g) || []).length;
  const newlines = (text.match(/\n/g) || []).length;
  const symbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

  const pronouns = ["i", "you", "he", "she", "it", "we", "they"];
  const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "under"];
  const articles = ["a", "an"];

  const tokenCounts = { pronouns: {}, prepositions: {}, articles: {} };
  const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

  tokens.forEach(token => {
    if (pronouns.includes(token)) tokenCounts.pronouns[token] = (tokenCounts.pronouns[token] || 0) + 1;
    if (prepositions.includes(token)) tokenCounts.prepositions[token] = (tokenCounts.prepositions[token] || 0) + 1;
    if (articles.includes(token)) tokenCounts.articles[token] = (tokenCounts.articles[token] || 0) + 1;
  });

  output.textContent = `
Letters: ${letters}
Words: ${words}
Spaces: ${spaces}
Newlines: ${newlines}
Special Symbols: ${symbols}

Pronouns: ${JSON.stringify(tokenCounts.pronouns, null, 2)}
Prepositions: ${JSON.stringify(tokenCounts.prepositions, null, 2)}
Indefinite Articles: ${JSON.stringify(tokenCounts.articles, null, 2)}
  `;
}
