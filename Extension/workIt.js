const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;
const pattern1 = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/.*/;

// functions define ---------------------------------------------

let flag = false;
let loadedShit = 0;
let tabUrl = window.location.href;
let loop = 0;

const observer = new MutationObserver(() => {
    if (location.href !== tabUrl) {
      tabUrl = window.location.href;
      runIt();
    }
});

const observer2 = new MutationObserver(() => {
    if(document.getElementById("contents").children.length > loadedShit){
        runIt();    
    }
});

function removeShorts() {
    document.querySelectorAll("ytd-rich-section-renderer").forEach((el) => {
        el.remove();
    })
}

async function getTitles() {
    console.log("Attempting to remove titles...")
    titles = Array.from(document.querySelectorAll('ytd-rich-grid-media yt-formatted-string#video-title'))
        .map(el => el.textContent.trim())

    if (titles.length > 0 && !flag) {
        observer2.observe(document.getElementById("contents"), { childList: true, subtree: true });
        removeShorts();
        loadedShit = document.getElementById("contents").children.length;
        console.log(loadedShit, " videos");
        flag = true
        let el1 = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');
        let el2 = document.querySelector('a[title="Shorts"]');
        if(el1){
            el1.remove();
        }
        if(el2){
            el2.remove();
        }
    }

    if(flag){
        elements = document.getElementById("contents").querySelectorAll("ytd-rich-item-renderer")
        console.log("loop: ", loop)
        loop = loop+1;
        // let result =  await apiCall(`Give me an array that displays for each element in this array: ${titles} whether a video titled like the element would be educational for a class 12th CBSE Commerce stream student. Only give true/false with no explanation. Return to me just the array with no supporting text and no code blocks`);
        for(let i = 0; i < elements.length; i++){
            if(Math.random() > 0.5){
                await elements[i].remove();
                console.log("removed ", titles[i])
            }
        }
        loadedShit = document.getElementById("contents").children.length;
    }

}

function rickRoll(){
    alert("!!!! You shall not pass !!!!")
    window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=cAEBQFQd4ETX4dC-&t=43";
}
// -------------------------------------------------------------

function runIt(){
    if(pattern1.test(tabUrl)){
        rickRoll()
     }else if(pattern.test(tabUrl)){
        removeShorts();
        getTitles();
     }
}

runIt();

observer.observe(document.body, { childList: true, subtree: true });

// -------------------_API SYSTEMS AND SHIT_----------------------------------------------------

async function apiCall(prompt){

    await chrome.runtime.sendMessage({
        type: 'FETCH_FROM_LOCALHOST',
        payload: {
            prompt: prompt
        }
    }, (response) => {
        // const generatedText =  JSON.parse(data.candidates[0].content.parts[0].text.toLowerCase());
        console.log(response);
        // return generatedText;
        return []
    });
}

const cssURL = chrome.runtime.getURL("inject.css");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssURL;

document.head.appendChild(link);