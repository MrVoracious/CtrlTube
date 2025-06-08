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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_FROM_LOCALHOST') {
    const { prompt } = message.payload;

    fetch('http://localhost:8080/proxy/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3.2',  
        prompt: prompt,
        stream: false      
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Ollama response:', data);
      sendResponse({ success: true, data: data.response }); 
    })
    .catch(error => {
      console.error('Error fetching from Ollama:', error);
      sendResponse({ success: false, error: error.message });
    });

    return true; 
  }
});
