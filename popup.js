const DEFAULT_SITES = [];
const textarea = document.getElementById("sites");
const status = document.getElementById("status");

let saveTimeout;

function normalize(raw) {
  let s = raw.trim().toLowerCase();
  if (!s) return "";

  // Strip protocol, path, www prefix, and any TLD
  s = s.replace(/^https?:\/\//i, "").replace(/\/.*$/, "").replace(/^www\./, "");
  // Strip trailing TLD(s) like .com, .co.uk, .net
  s = s.replace(/\.[a-z]{2,}(\.[a-z]{2,})?$/, "");

  return s;
}

async function load() {
  const { mutedSites } = await chrome.storage.sync.get({ mutedSites: DEFAULT_SITES });
  textarea.value = mutedSites.join("\n");
}

async function save() {
  const lines = textarea.value.split("\n");
  const sites = lines
    .map(normalize)
    .filter(s => s.length > 0);

  // Deduplicate while preserving order
  const unique = [...new Set(sites)];

  await chrome.storage.sync.set({ mutedSites: unique });
  status.textContent = "Saved";
  setTimeout(() => { status.textContent = ""; }, 1500);
}

textarea.addEventListener("input", () => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(save, 600);
});

load();
