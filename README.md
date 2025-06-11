# CtrlTube 🎯

> Turn YouTube into your personal learning assistant. Block distractions. Focus better.

CtrlTube is a Chrome extension that helps learners stay focused on educational content by automatically filtering out non-educational YouTube videos. No more rabbit holes — just pure productivity.

![CtrlTube Banner](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/465/627/datas/gallery.jpg) <!-- Add your image path -->

---

## 🚀 Features

- ✅ Automatically hides non-educational YouTube content  
- 🎯 Designed to identify distractions like Shorts, music videos, and entertainment  
- 🔍 Uses keyword analysis and heuristics to detect content type  
- 🧠 Perfect for students and lifelong learners  
- 🌐 Lightweight and privacy-respecting Chrome extension  

---

## 📸 Preview

> _Screenshots of the extension in action_

| Before | After | UI |
|--------|-------|-------|
| ![Before](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/466/015/datas/gallery.jpg) | ![After](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/466/016/datas/gallery.jpg) | ![UI](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/466/013/datas/gallery.jpg) |

---

## 🏆 Achievements

🏅 **Winner - Best Educational Hack at KT HACK 2025**  
CtrlTube impressed judges with its simple idea and big impact — reimagining YouTube as a distraction-free study zone.
***See the win page: [Devpost](https://devpost.com/software/ctrltube)***

---

## 🧩 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/MrVoracious/CtrlTube.git
   ```
2. Open [chrome://extensions](chrome://extensions) in your browser.  
3. Enable **Developer Mode** (top right).  
4. Click **Load unpacked** and select the `CtrlTube` folder.  

---

## 🛠️ Development

This project is built using:

- JavaScript (ES6)
- Chrome Extensions APIs
- Manifest v3

> **Key files:**
- `service_worker.js` – background service worker
- `content.js` – logic injected into YouTube pages
- `popup.html` – minimal UI interface (if needed)

---

## 🔍 How It Works

CtrlTube evaluates YouTube thumbnails, titles, and metadata using predefined rules and keyword filters. Videos deemed distracting are automatically hidden or removed from the page.

> **Planned:** AI-based detection using Gemini API (coming soon).

---

## 📦 Folder Structure

```
CtrlTube/
│
├── extension/           # main folder
├──├── popup.html           # Extension popup
├──├── content.js           # Page logic
├──├── service_worker.js    # Background service worker
├──├── manifest.json        # Extension config
└──├── styles.css           # Optional styling
```
---

## 🤝 Contributing

Pull requests are welcome! To contribute:

1. Fork the repo  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit changes:  
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request  

---

## 📄 License

CC by NC.  
Feel free to use, modify, and distribute under the terms of the license.

---

## 🙌 Acknowledgments

Created with passion at **KT HACK 2025** by  
[MrVoracious](https://github.com/MrVoracious), [fuel000cynical](https://github.com/fuel000cynical), and [insomniac-robot](https://github.com/Insomniac-Robot).
