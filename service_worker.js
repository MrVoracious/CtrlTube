chrome.runtime.onInstalled.addListener(() => {});

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
},async function(tabs){
  if(pattern.test(tabs[0].url)){
      await chrome.scripting.executeScript({
        files: ["workIt.js"],
        target: { tabId: tabs[0].id },
    });
  }
});