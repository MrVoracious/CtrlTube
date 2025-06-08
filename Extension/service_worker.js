chrome.runtime.onInstalled.addListener(() => { });

// chrome.action.onClicked.addListener(async (tab) => {
//   if(pattern1.test(tab.url)){
//     await chrome.scripting.executeScript({
//       files: ["shortsRickRoll.js"],
//       target: { tabId: tab.id },
//   });
//   }else if (pattern.test(tab.url)) {
//     await chrome.scripting.executeScript({
//         files: ["workIt.js"],
//         target: { tabId: tab.id },
//     });
// }
// });
const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;

chrome.tabs.query({
  active: true,
  currentWindow: true
}, async function (tabs) {
  if (pattern.test(tabs[0].url)) {
    await chrome.scripting.executeScript({
      files: ["workIt.js"],
      target: { tabId: tabs[0].id },
    });
  }
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'FETCH_FROM_LOCALHOST') {
//     const { prompt } = message.payload;

//     

//     return true; 
//   }
// });


let interval = null;
let resting = false;
let currentTime = "09:00";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_BREAK") {
    resting = true;
    currentTime = msg.payload || "09:00";
    startTimer();
    sendResponse({ status: "started" });
    return true;
  }

  if (msg.type === "STOP_BREAK") {
    resting = false;
    clearTimeout(interval);
    sendResponse({ status: "stopped" });
    return true;
  }

  if (msg.type === "GET_TIME") {
    sendResponse({ time: currentTime, resting });
    return true;
  }
});

function subtractOneSecond(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  let totalSeconds = minutes * 60 + seconds;
  if (totalSeconds <= 0) return "00:00";
  totalSeconds -= 1;
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
}

function startTimer() {
  if (!resting) return;

  interval = setTimeout(() => {
    currentTime = subtractOneSecond(currentTime);
    console.log("Timer:", currentTime);
    chrome.storage.local.set({ points: currentTime });

    if (currentTime !== "00:00") {
      startTimer();
    } else {
      resting = false;
    }
  }, 1000);
}