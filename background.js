const DEFAULT_SITES = [];

async function getMutedSites() {
  const { mutedSites } = await chrome.storage.sync.get({ mutedSites: DEFAULT_SITES });
  return mutedSites;
}

function shouldMute(url, sites) {
  try {
    const hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
    return sites.some(name => {
      // "google" matches google.com, google.co.uk, etc.
      const pattern = name.toLowerCase();
      const re = new RegExp("(^|\\.)" + pattern.replace(/\./g, "\\.") + "\\.[^.]+");
      return re.test(hostname);
    });
  } catch {
    return false;
  }
}

async function checkAndMuteTab(tab) {
  if (!tab.url) return;
  const sites = await getMutedSites();
  const mute = shouldMute(tab.url, sites);
  if (mute && !tab.mutedInfo?.muted) {
    chrome.tabs.update(tab.id, { muted: true });
  }
}

// Mute on tab creation
chrome.tabs.onCreated.addListener((tab) => {
  checkAndMuteTab(tab);
});

// Mute on navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === "complete") {
    checkAndMuteTab(tab);
  }
});

// Mute all matching tabs on startup
chrome.runtime.onStartup.addListener(async () => {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(checkAndMuteTab);
});

// Mute all matching tabs on install/update
chrome.runtime.onInstalled.addListener(async () => {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(checkAndMuteTab);
});
