document.querySelector('.update').addEventListener('click', function (e) {
    e.preventDefault();
    const about = document.querySelector('textarea').value;
    chrome.storage.local.set({ aboutMe: about }, () => {
        alert("Updated!");
    });
});
chrome.storage.local.get(["aboutMe"], (result) => {
    if (result.aboutMe) {
        document.querySelector('textarea').value = result.aboutMe;
    } else {
        document.querySelector('textarea').value = "Enter something to get started...";
    }
});
chrome.storage.local.get(["points"], (result) => {
    if (result.points) {
        document.querySelector('#pointsTime').textContent = result.points;
    } else {
        document.querySelector('#pointsTime').textContent = "00:30";
    }
});

chrome.storage.local.set({ points: "10:00" });

// use points
const time = document.getElementById("pointsTime")
const usePoints = document.getElementById("usePoints")

let resting;
chrome.storage.local.get(["resting"], (result) => {
    resting = result.resting
})




chrome.storage.local.get(["resting"], (result) => {
    if (result.resting) {
        usePoints.textContent = "End Break";
    } else {
        usePoints.textContent = "Use Points";
    }
})


usePoints.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.storage.local.get(["resting"], (result) => {
            if (!result.resting) {
                chrome.tabs.sendMessage(tabs[0].id, { type: "START_BREAK"});
                chrome.runtime.sendMessage({ type: "START_BREAK", payload: time.textContent }, () => {
                    usePoints.textContent = "End Break";
                });
            } else {
                chrome.tabs.sendMessage(tabs[0].id, { type: "STOP_BREAK" });
                chrome.runtime.sendMessage({ type: "STOP_BREAK" }, () => {
                    usePoints.textContent = "Use Points";
                });
            }
        })
    });
});

function updateTimeFromStorage() {
    chrome.storage.local.get("points", ({ points }) => {
        if (points) time.textContent = points;
    });
}

// Keep updating the time every second when popup is open
setInterval(updateTimeFromStorage, 1000);