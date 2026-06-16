// Web Worker that sends a 'tick' message every second.
// Unlike setInterval on the main thread, Web Workers are NOT throttled
// when the tab is in the background (alt-tabbed), so countdowns and
// polling remain accurate.

let intervalId = null;

self.onmessage = function (e) {
  if (e.data === 'start') {
    if (intervalId !== null) return; // already running
    intervalId = setInterval(() => {
      self.postMessage('tick');
    }, 1000);
  } else if (e.data === 'stop') {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};
