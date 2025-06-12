chrome.storage.sync.get({ enabled: true, allowedSites: [] }, ({ enabled, allowedSites }) => {
  const currentHost = window.location.hostname;

  if (!enabled || !allowedSites.some(site => currentHost.includes(site))) {
    console.log("⚠️ Extension disabled or site not in allowed list");
    return;
  }

  const video = document.querySelector("video");
  if (!video) return;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !video.paused) {
      video.pause();
      console.log("⏸️ Paused video due to tab blur");
    } else if (!document.hidden && video.paused) {
      video.play();
      console.log("▶️ Played video due to tab focus");
    }
  });

  window.addEventListener("blur", () => {
    if (!video.paused) {
      video.pause();
      console.log("⏸️ Paused video due to window blur");
    }
  });

  window.addEventListener("focus", () => {
    if (video.paused) {
      video.play();
      console.log("▶️ Played video due to window focus");
    }
  });
});
