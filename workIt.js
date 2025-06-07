const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;
const pattern1 = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/.*/;

// functions define ---------------------------------------------


let loadedShit = 0;

function removeShorts() {
    document.querySelectorAll("ytd-rich-section-renderer").forEach((el) => {
        el.remove();
    })
}

function getTitles(flag) {
    console.log("Attempting to remove titles...")
    titles = Array.from(document.querySelectorAll('ytd-rich-grid-media yt-formatted-string#video-title'))
        .map(el => el.textContent.trim())
    console.log("YouTube Video Titles:", titles);
    loadedShit = document.getElementById("contents").children.length;
    if (titles.length > 0 && !flag) {
        console.log("titles logged")
        removeShorts()
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
}

function rickRoll(){
    alert("!!!! You shall not pass !!!!")
    window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=cAEBQFQd4ETX4dC-&t=43";
}

// -------------------------------------------------------------

let tabUrl = window.location.href;

function runIt(){
    loadedShit = 0;
    let flag = false;
    if(pattern1.test(tabUrl)){
        rickRoll()
     }else if(pattern.test(tabUrl)){
         let titles = [];
         window.addEventListener('scroll', function () {
             if (document.getElementById("contents").children.length != loadedShit) {
                 loadedShit = document.getElementById("contents").children.length;
                 removeShorts();
                 getTitles(flag)
             }
         });
     
         window.addEventListener('load', function () {
             removeShorts();
         });
     
         flag = false
         function repeatingLoop() {
             setTimeout(function () {
                 if (!flag) {
                     try {
                         getTitles(flag);
                     } catch (error) {
                         console.log(error);
                     }
     
                     repeatingLoop()
                 }
             }, 1000)
         }
     
         repeatingLoop();
     }
}

runIt();

const observer = new MutationObserver(() => {
  if (location.href !== tabUrl) {
    tabUrl = window.location.href;
    runIt();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// -------------------_API SYSTEMS AND SHIT_----------------------------------------------------

async function apiCall(prompt){
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAC6gdJAMwTlqLW8kUci6WJcGXduyGflz4`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        })
    });

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    return generatedText;
}

