chrome.runtime.onInstalled.addListener(() => {});

const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;
const pattern1 = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/.*/;

chrome.action.onClicked.addListener(async (tab) => {
  if(pattern1.test(tab.url)){
    await chrome.scripting.executeScript({
      files: ["shortsRickRoll.js"],
      target: { tabId: tab.id },
  });
  }else if (pattern.test(tab.url)) {
    await chrome.scripting.executeScript({
        files: ["workIt.js"],
        target: { tabId: tab.id },
    });
}
});

// chrome.tabs.query({
//     active: true,
//     currentWindow: true
// }, function(tabs){
//     if (pattern.test(tabs[0].url)) {
//         chrome.scripting.executeScript({
//             target: {tabId: tabs[0].id},
//             files: ["workIt.js"]
//         });
//     }
// });