const pattern = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/.*/;
const pattern1 = /^https:\/\/([a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/.*/;
const pattern2 = /^https:\/\/(?:[a-zA-Z0-9-]+\.)?youtube\.com\/watch\?v=[^&\s]+/;

// functions define ---------------------------------------------

let flag = false;
let loadedShit = 0;
let tabUrl = window.location.href;
let loop = 0;
let titles = [];
let activated = true;

// while(true){
//     setTimeout(function () {
//         chrome.runtime.sendMessage({ type: "GET_TIME" }, ({ resting }) => {
//             console.log(resting);
//             activated = resting;
//         })
//     }, 1000)
// }
async function updateStat() {
    await chrome.storage.local.get(["resting"], (result) => {
        activated = !result.resting;
    })
}


requestIdleCallback(() => {
    console.log("Listening AHHHHH");
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.type === "START_BREAK") {
            console.log("[Content Script] Received START_BREAK");
            sendResponse({ status: "Break stopped" });
            runIt();
        }

        if (msg.type === "STOP_BREAK") {
            console.log("[Content Script] Received STOP_BREAK");
            sendResponse({ status: "Break stopped" });
            runIt();
        }
    });

    updateStat();
});
// -------------------------------------------------------

const observer = new MutationObserver(() => {
    if (location.href !== tabUrl) {
        tabUrl = window.location.href;
        flag = false;
        titles = [];
        loadedShit = 0;
        loop = 0;
        runIt();
    }
});

const videoBank2D = [
    ["But what is a Neural Network? | Deep learning, chapter 1", "https://www.youtube.com/watch?v=aircAruvnKk", "AI, Neural Networks", "3Blue1Brown"],
    ["Machine Learning Crash Course for Beginners", "https://www.youtube.com/watch?v=Gv9_4yMHFhI", "AI, ML", "Daniel Bourke"],
    ["How Machines Learn", "https://www.youtube.com/watch?v=R9OHn5ZF4Uo", "AI, Machine Learning", "CGP Grey"],
    ["Gradient Descent, Step-by-Step", "https://www.youtube.com/watch?v=sDv4f4s2SB8", "AI, Optimization", "StatQuest"],
    ["Convolutional Neural Networks explained", "https://www.youtube.com/watch?v=YRhxdVk_sIs", "AI, Deep Learning", "deeplizard"],
    ["Competitive Programming Tips and Tricks", "https://www.youtube.com/watch?v=fgWbQkLk1TU", "CP, Tips", "William Lin"],
    ["Dynamic Programming - Learn to Solve DP Problems", "https://www.youtube.com/watch?v=oBt53YbR9Kk", "CP, DP", "NeetCode"],
    ["Binary Search Explained", "https://www.youtube.com/watch?v=s4DPM8ct1pI", "CP, Binary Search", "Errichto"],
    ["How to Start Competitive Programming?", "https://www.youtube.com/watch?v=2MaCrn38X0Y", "CP, Beginner", "Errichto"],
    ["Bit Manipulation Full Course", "https://www.youtube.com/watch?v=0SmmjeoG708", "CP, Bitwise", "take U forward"],
    ["Learn Python - Full Course for Beginners", "https://www.youtube.com/watch?v=rfscVS0vtbw", "Python, Beginner", "freeCodeCamp"],
    ["Python in 100 Seconds", "https://www.youtube.com/watch?v=x7X9w_GIm1s", "Python, Quick", "Fireship"],
    ["Object Oriented Programming in Python", "https://www.youtube.com/watch?v=Ej_02ICOIgs", "Python, OOP", "freeCodeCamp"],
    ["Python Lambda Functions Explained", "https://www.youtube.com/watch?v=hYzwCsKGRrg", "Python, Functions", "Tech With Tim"],
    ["Recursion Explained - Data Structures and Algorithms", "https://www.youtube.com/watch?v=IJDJ0kBx2LM", "DSA, Recursion", "Abdul Bari"],
    ["The Essence of Linear Algebra", "https://www.youtube.com/watch?v=fNk_zzaMoSs", "Math, Linear Algebra", "3Blue1Brown"],
    ["Essence of Calculus", "https://www.youtube.com/watch?v=WUvTyaaNkzM", "Math, Calculus", "3Blue1Brown"],
    ["Fourier Transform Explained", "https://www.youtube.com/watch?v=spUNpyF58BY", "Math, Signal Processing", "3Blue1Brown"],
    ["Probability Explained", "https://www.youtube.com/watch?v=KzfWUEJjG18", "Math, Probability", "Veritasium"],
    ["Understanding Eigenvectors and Eigenvalues", "https://www.youtube.com/watch?v=PFDu9oVAE-g", "Math, Algebra", "Zach Star"],
    ["What is Quantum Entanglement?", "https://www.youtube.com/watch?v=ZuvK-od647c", "Physics, Quantum", "MinutePhysics"],
    ["What is a Neutrino?", "https://www.youtube.com/watch?v=I-6-p3bChpQ", "Physics, Particle", "Fermilab"],
    ["General Relativity Explained Simply", "https://www.youtube.com/watch?v=AwhKZ3fd9JA", "Physics, Relativity", "PBS Space Time"],
    ["Why is Light Speed the Limit?", "https://www.youtube.com/watch?v=VSxX5MEV5SU", "Physics, Conceptual", "PBS Space Time"],
    ["Quantum Mechanics in 5 Minutes", "https://www.youtube.com/watch?v=p7bzE1E5PMY", "Physics, Quantum", "Kurzgesagt"],
    ["How the Internet Works", "https://www.youtube.com/watch?v=TNQsmPf24go", "CS, Internet", "Code.org"],
    ["Operating Systems: Crash Course", "https://www.youtube.com/watch?v=26QPDBe-NB8", "CS, OS", "CrashCourse"],
    ["What is an API?", "https://www.youtube.com/watch?v=s7wmiS2mSXY", "CS, API", "MuleSoft"],
    ["How Computers Calculate - ALU", "https://www.youtube.com/watch?v=1I5ZMmrOfnA", "CS, Computer Architecture", "Ben Eater"],
    ["How Memory Works", "https://www.youtube.com/watch?v=xf7wT1fjtxQ", "CS, Memory", "Ben Eater"],
    ["The Most Efficient Way to Study", "https://www.youtube.com/watch?v=CPxSzxylRCI", "Study Tips, Neuroscience", "Thomas Frank"],
    ["The Chemistry of Fireworks", "https://www.youtube.com/watch?v=Zcxn5k7NfHA", "Chemistry, Fun", "Periodic Videos"],
    ["DNA vs RNA", "https://www.youtube.com/watch?v=4PKjF7OumYo", "Biology, Genetics", "Amoeba Sisters"],
    ["What is CRISPR?", "https://www.youtube.com/watch?v=MnYppmstxIs", "Biotech, Genetic Engineering", "Kurzgesagt"],
    ["How to Learn Anything Fast - 5 Tips", "https://www.youtube.com/watch?v=UNP03fDSj1U", "Learning, Productivity", "Thomas Frank"],
    ["Active Recall vs Passive Review", "https://www.youtube.com/watch?v=Z-zNHHpXoMM", "Study, Techniques", "Ali Abdaal"]
];


function removeShorts() {
    document.querySelectorAll("ytd-rich-section-renderer").forEach((el) => {
        el.remove();
    })
}

function repeatingLoop() {
    updateStat();
    if (activated) {
        setTimeout(function () {
            if (titles.length == 0) {
                console.log("in loop")
                try {
                    getTitles();
                    removeShorts();
                } catch (error) {
                    console.log(error);
                }

                repeatingLoop()
            }
        }, 1000)
    }
}

function getYouTubeID(url) {
  const m = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}


async function getTitles() {
    console.log("get Titles func")
    console.log(activated);
    updateStat();
    console.log(activated);
    if (activated) {
        console.log("Attempting to remove titles...")
        // await repeatingLoop()
        titles = Array.from(document.querySelectorAll('ytd-rich-grid-media yt-formatted-string#video-title'))
            .map(el => el.textContent.trim())

        if (titles.length > 0 && !flag) {
            console.log("Initialised....")
            document.querySelector("ytd-continuation-item-renderer").remove();
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
            console.log("loop: ", loop)
            loop = loop + 1;


            await chrome.storage.local.get(["aboutMe"], async (result) => {
                let userContext = ""
                if (result.aboutMe == "") {
                    userContext = "A student interested in understanding the world and improving skills. Prefers conceptual videos. Not interested in lifestyle vlogs, general entertainment, or drama "
                } else {
                    userContext = result.aboutMe;
                }
                let ans = await apiCall(`You are a classifier that determines whether YouTube videos are educational *for a specific user*.
                    Task:
                    Given:
                    1. A userContext string describing the user's background, interests, age, and learning goals.
                    2. An array of YouTube video titles.
                    
                    Return a JavaScript array of booleans of the same length.
                    
                    Rules:
                    1. Return true if the video is educational *for the given user* — it should teach the user something relevant to their context (e.g., academic subject, hobby, technical skill, self-improvement, etc.).
                    2. Return false if the video does not serve educational value to that user — even if it's generally informative but unrelated to their context.
                    3. Do NOT assume hidden meaning. Judge based strictly on the title.
                    4. Output only the JavaScript array and nothing else.
                    
                    Example:
                    
                    userContext:
                    "A 17-year-old student interested in AI, physics, competitive programming, and building tech projects. Prefers conceptual videos and tutorials. Not interested in lifestyle vlogs, general entertainment, or drama."
                    
                    Input:
                    ["React Tutorial for Beginners", "Funniest TikToks Compilation", "Understanding Quantum Entanglement", "I Tried Coding for 24 Hours", "MrBeast's $1,000,000 Island Challenge", "Dynamic Programming Explained Simply"]
                    
                    Output:
                    [true, false, true, false, false, true]
                    
                    Now classify the following titles based on the user context:
                    
                    userContext:
                    ${userContext}
                    
                    Input:
                    ${showTitle}`);

                console.log("Gemini Response: ", ans);
                for (let i = 0; i < elements.length; i++) {
                    if (!ans[i]) {
                        elements[i].style.display = "none";
                        elements[i].classList.remove("showBox");
                        console.log("removed: ", showTitle[i])
                    }
                }
                loadedShit = document.getElementById("contents").children.length;
                const contents = document.getElementById("contents")

                if (ans.filter(x => x == true).length < 30) {
                    for (let i = 0; i < 6 - ans.filter(x => x == true).length; i++) {
                        const e = videoBank2D[i];
                        let link = e[1]
                        let title = e[0]
                        let tags = e[2]
                        const newDiv = document.createElement("div");
                        newDiv.className = "ytBox";

                        newDiv.innerHTML = `
                        <div onClick="window.location='${(link)}';" class="thumbnail"><img src="http://i3.ytimg.com/vi/${getYouTubeID(link)}/maxresdefault.jpg" alt=""></div>
                        <div class="details">
                            <div class="title">${title}</div>
                            <div class="tags">${tags}</div>
                        </div>
                `;

                        contents.appendChild(newDiv);
                    }
                }



            });
        }
    }
}



function rickRoll() {
    alert("!!!! You shall not pass !!!!")
    window.location.href = "https://youtube.com";
}
// ---------------------watch place functions----------------------------------------
let currentTitle = []
let titleList = []
let currentTitleName = ""

async function getTitleCurrentVideo() {
    updateStat();
    if (activated) {
        currentTitle = document.querySelectorAll('h1.ytd-watch-metadata yt-formatted-string.ytd-watch-metadata');

        if (currentTitle.length > 0) {
            document.querySelectorAll('ytd-continuation-item-renderer').forEach(el => el.remove());
            currentTitleName = currentTitle[0].textContent
            console.log(currentTitleName)
            document.querySelector("ytd-reel-shelf-renderer").remove();
            sideVideos = document.querySelectorAll('ytd-compact-video-renderer')
            let sideTitles = []
            for (let i = 0; i < sideVideos.length; i++) {
                const e = sideVideos[i];
                e.classList.add("showBox");
                sideTitles.push(e.querySelector("span.ytd-compact-video-renderer").textContent.trim())
            }

            sideTitles.push(currentTitleName)


            await chrome.storage.local.get(["aboutMe"], async (result) => {
                let userContext = ""
                if (result.aboutMe == "") {
                    userContext = "A student interested in understanding the world and improving skills. Prefers conceptual videos. Not interested in lifestyle vlogs, general entertainment, or drama "
                } else {
                    userContext = result.aboutMe;
                }
                let ans = await apiCall(`You are a classifier that determines whether YouTube videos are educational *for a specific user*.
                    Task:
                    Given:
                    1. A userContext string describing the user's background, interests, age, and learning goals.
                    2. An array of YouTube video titles.
                    
                    Return a JavaScript array of booleans of the same length.
                    
                    Rules:
                    1. Return true if the video is educational *for the given user* — it should teach the user something relevant to their context (e.g., academic subject, hobby, technical skill, self-improvement, etc.).
                    2. Return false if the video does not serve educational value to that user — even if it's generally informative but unrelated to their context.
                    3. Do NOT assume hidden meaning. Judge based strictly on the title.
                    4. Output only the JavaScript array and nothing else.
                    
                    Example:
                    
                    userContext:
                    "A 17-year-old student interested in AI, physics, competitive programming, and building tech projects. Prefers conceptual videos and tutorials. Not interested in lifestyle vlogs, general entertainment, or drama."
                    
                    Input:
                    ["React Tutorial for Beginners", "Funniest TikToks Compilation", "Understanding Quantum Entanglement", "I Tried Coding for 24 Hours", "MrBeast's $1,000,000 Island Challenge", "Dynamic Programming Explained Simply"]
                    
                    Output:
                    [true, false, true, false, false, true]
                    
                    Now classify the following titles based on the user context:
                    
                    userContext:
                    ${userContext}
                    
                    Input:
                    ${sideTitles}`);

                console.log("Gemini Response: ", ans);

                if (!ans[ans.length - 1]) {
                    window.location.href = "https://www.youtube.com/";
                }

                for (let i = 0; i < (sideTitles.length - 1); i++) {
                    if (!ans[i]) {
                        sideVideos[i].style.display = "none";
                        sideVideos[i].classList.remove("showBox");
                        console.log("removed: ", sideTitles[i])
                    }
                }
                loadedShit = document.getElementById("contents").children.length;
            });

        }
    }
}

function titleLoopCurrentVideo() {
    updateStat();
    if (activated) {
        setTimeout(function () {
            if (currentTitle.length == 0) {
                console.log(`getting current video name`)
                try {
                    getTitleCurrentVideo()
                } catch (error) {
                    console.log(error);
                }

                titleLoopCurrentVideo()
            }
        }, 1000)
    }
}

// ------------------------------------------------------------
async function runIt() {
    if (pattern1.test(tabUrl)) {
        console.log("shorts")
        rickRoll()
    } else if (pattern2.test(tabUrl)) {
        console.log("watch")
        updateStat();
        if (activated) {
            titleLoopCurrentVideo()

            let timeout;
            window.addEventListener('scroll', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    document.querySelectorAll('ytd-continuation-item-renderer').forEach(el => el.remove());
                }, 100);
            });
        }

    } else if (pattern.test(tabUrl)) {
        console.log("home")
        updateStat();
        if (activated) {
            if (!flag) {
                console.log("intialise home")
                repeatingLoop()
            } else {
                console.log("run home")
                removeShorts();
                getTitles();
            }
        }
    }
}


requestIdleCallback(() => {
    runIt();
});

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
    console.log(generatedText)
    const match = generatedText.match(/\[.*\]/s);
    const array = match ? JSON.parse(match[0].replace(/false/g, 'false').replace(/true/g, 'true')) : [];

    return array;
}

const cssURL = chrome.runtime.getURL("inject.css");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssURL;

document.head.appendChild(link);