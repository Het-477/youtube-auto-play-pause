chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-extension") {
    chrome.storage.sync.get({ enabled: true }, ({ enabled }) => {
      chrome.storage.sync.set({ enabled: !enabled }, () => {
        console.log(`🔁 Extension is now ${!enabled ? "enabled" : "disabled"}`);
      });
    });
  }
});
