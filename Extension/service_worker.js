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
chrome.storage.local.get(["resting"], (result) => {
    console.log(result);
    resting = result.resting
})
let currentTime = "00:30";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_BREAK") {
    console.log("Service worker logged start")
    // resting = true;
    chrome.storage.local.set({ resting: true }, () => { });
    currentTime = msg.payload || "00:30";
    startTimer();
    sendResponse({ status: "started" });
    return true;
  }

  if (msg.type === "STOP_BREAK") {
    console.log("Service worker logged stop")
    // resting = false;
    chrome.storage.local.set({ resting: false }, () => { });
    clearTimeout(interval);
    sendResponse({ status: "stopped" });
    return true;
  }

  if (msg.type === "GET_TIME") {
    chrome.storage.local.get(["resting"], (result) => {
      sendResponse({ time: currentTime, resting });
      console.log("Service worker logged time request ", currentTime, result.resting)
      return true;
    })
  }
});

function subtractOneSecond(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  let totalSeconds = minutes * 60 + seconds;
  if (totalSeconds <= 0) return "00:00";
  totalSeconds -= 1;
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
}
function addOneSecond(timeStr) {
  const [minutes, seconds] = timeStr.split(':').map(Number);
  let totalSeconds = minutes * 60 + seconds;
  totalSeconds += 1;
  return `${String(Math.floor(totalSeconds / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
}


function startTimer() {
  chrome.storage.local.get(["resting"], (result) => { if (!result.resting) return; })

  interval = setTimeout(() => {
    currentTime = subtractOneSecond(currentTime);
    console.log("Timer:", currentTime);
    chrome.storage.local.set({ points: currentTime });

    if (currentTime != "00:00") {
      startTimer();
    } else {
      // resting = false;
      chrome.storage.local.set({ resting: false }, () => { });
      chrome.tabs.query({}, (tabs) => {
        const youtubeTab = tabs.find(tab => tab.active && tab.url?.includes("youtube.com"));

        if (youtubeTab) {
          chrome.scripting.executeScript(
            {
              target: { tabId: youtubeTab.id },
              func: () => {
                window.location.href = "https://www.youtube.com/";
              },
            },
            (results) => {
              if (chrome.runtime.lastError) {
                console.error("Injection failed:", chrome.runtime.lastError.message);
              } else {
                console.log("Redirect injected");
              }
            }
          );
        }
      });
    }
  }, 1000);
}