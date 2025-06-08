{
  "name": "CtrlTube",
  "version": "0.6.0" ,
  "description": "Fix your algorithm, smartly",
  "permissions": ["storage", "tabs", "activeTab", "scripting"],
  "host_permissions": ["https://*.youtube.com/*"],
  "background":{
    "service_worker" : "service_worker.js"
  },
  "content_scripts": [
    {
      "matches": ["https://*.youtube.com/*"],
      "js": ["workIt.js"],
      "type": "module",
      "run_at": "document_idle"
    }
  ],
  "web_accessible_resources": [
  {
    "resources": ["inject.css", "index.js"],
    "matches": ["https://*.youtube.com/*"]
  }
],

  "action":{
    "default_icon": "icon.png",
    "default_title": "CtrlTube",
    "default_popup": "index.html"
  },
  "manifest_version" : 3
}
