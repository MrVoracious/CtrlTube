const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;
const pattern1 = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/.*/;

// functions define ---------------------------------------------

let flag = false;
let loadedShit = 0;
let tabUrl = window.location.href;
let loop = 0;
let titles = [];

const observer = new MutationObserver(() => {
    if (location.href !== tabUrl) {
        tabUrl = window.location.href;
        runIt();
    }
});

const observer2 = new MutationObserver(() => {
    if (document.getElementById("contents").children.length > loadedShit) {
        elements = document.getElementById("contents").querySelectorAll("ytd-rich-item-renderer");
        elements.forEach(el => {
            el.classList.add("showBox");
        })
        runIt();
    }
});

function removeShorts() {
    document.querySelectorAll("ytd-rich-section-renderer").forEach((el) => {
        el.remove();
    })
}

function repeatingLoop() {
    setTimeout(function () {
        if (titles.length == 0) {
            console.log("in loop")
            try {
                getTitles()
            } catch (error) {
                console.log(error);
            }

            repeatingLoop()
        }
    }, 1000)
}


async function getTitles() {
    console.log("Attempting to remove titles...")
    // await repeatingLoop()
    titles = Array.from(document.querySelectorAll('ytd-rich-grid-media yt-formatted-string#video-title'))
        .map(el => el.textContent.trim())

    if (titles.length > 0 && !flag) {
        console.log("Initialised....")
        document.querySelector("ytd-continuation-item-renderer").remove();
        observer2.observe(document.getElementById("contents"), { childList: true, subtree: true });
        removeShorts();
        loadedShit = document.getElementById("contents").children.length;
        console.log(loadedShit, " videos");
        flag = true
        let el1 = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');
        let el2 = document.querySelector('a[title="Shorts"]');
        if (el1) {
            el1.remove();
        }
        if (el2) {
            el2.remove();
        }

        elements = document.getElementById("contents").querySelectorAll("ytd-rich-item-renderer");
        elements.forEach(el => {
            el.classList.add("showBox");
        })

    }

    if (flag) {
        elo = document.getElementById("contents").querySelectorAll(".showBox")
        elements = []
        elo.forEach(el => {
            if (el.querySelector("ytd-ad-slot-renderer") == null && el.querySelector("yt-lockup-view-model") == null) {
                elements.push(el);
            } else {
                el.style.display = "none"
            }
        })
        showTitle = []
        elements.forEach(el => {
            element = el.querySelector("yt-formatted-string#video-title")
            if (element) {
                showTitle.push(element)
            }
        })
        showTitle = showTitle.map(el => el.textContent.trim())
        console.log(showTitle, elements)
        console.log("loop: ", loop)
        loop = loop + 1;

        let result = await apiCall(`You are a classifier that determines whether YouTube videos are educational or not.

Task:
Given an array of YouTube video titles, return a JavaScript array of booleans of the same length.

Rules:
1. Return 'true' if the video is educational — i.e., it teaches a concept, explains how something works, covers a scientific, technical, academic, or skill-based topic, or helps the viewer learn something useful.
2. Return 'false' if the video is not educational — i.e., it is entertainment, comedy, meme, vlog, music, reaction, gaming, drama, challenge, opinion, or general lifestyle content with no learning focus.
3. Only use the title to make the decision. Do not assume hidden meaning or unseen content. Be strict — if the title doesn't clearly indicate educational value, return 'false'.
4. Your final output must ONLY be the JavaScript array of booleans. No explanation or extra text.

Examples:
Input:
["How to Solve a Rubik’s Cube in 5 Minutes", "Reacting to Funny TikToks", "Understanding Black Holes", "My Daily Vlog - College Edition"]

Output:
[true, false, true, false]

Now classify the following titles:${showTitle}`);
        console.log(result)
        for (let i = 0; i < elements.length; i++) {
            if (!result[i]) {
                elements[i].style.display = "none";
                elements[i].classList.remove("showBox");
                console.log("removed ", showTitle[i], elements[i])
            } else {
                console.log("Correct Vid: ", showTitle[i], elements[i])
            }
        }
        loadedShit = document.getElementById("contents").children.length;
    }

}

function rickRoll() {
    alert("!!!! You shall not pass !!!!")
    window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=cAEBQFQd4ETX4dC-&t=43";
}
// -------------------------------------------------------------

function runIt() {
    if (pattern1.test(tabUrl)) {
        rickRoll()
    } else if (pattern.test(tabUrl)) {
        removeShorts();
        if (!flag) {
            repeatingLoop()
        } else {
            getTitles();
        }
    }
}

runIt();

observer.observe(document.body, { childList: true, subtree: true });

// -------------------_API SYSTEMS AND SHIT_----------------------------------------------------

async function apiCall(prompt) {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAC6gdJAMwTlqLW8kUci6WJcGXduyGflz4", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    })

   
    const data = await response.json();
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text.toLowerCase();
    const match = generatedText.match(/\[.*\]/s);
    const array = match ? JSON.parse(match[0].replace(/false/g, 'false').replace(/true/g, 'true')) : [];

    console.log(array);
    return array;
}

const cssURL = chrome.runtime.getURL("inject.css");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssURL;

document.head.appendChild(link);


