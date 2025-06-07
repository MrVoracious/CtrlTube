let titles = [];
let loadedShit = 0;
// document.getElementById("contents").addEventListener("load", (event) => {
//     titles = Array.from(document.querySelectorAll('ytd-rich-grid-media yt-formatted-string#video-title'))
//         .map(el => el.textContent.trim())
// });

function removeShorts() {
    document.querySelectorAll("ytd-rich-section-renderer").forEach((el) => {
        el.remove();
    })
}

function getTitles() {
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

window.addEventListener('scroll', function () {
    if (document.getElementById("contents").children.length != loadedShit) {
        loadedShit = document.getElementById("contents").children.length;
        removeShorts();
        getTitles()
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
                getTitles();
            } catch (error) {
                console.log(error);
            }

            repeatingLoop()
        }
    }, 1000)
}

repeatingLoop();


// -------------------_API SYSTEMS AND SHIT_----------------------------------------------------

