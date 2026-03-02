const cacheName = "rose-bloom-v5";

const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./rose_b.jpg",
  "./tulip.png",
  "./mixed.jpg",
  "./pinnk.jpg"
];

self.addEventListener("install", e=>{
e.waitUntil(
caches.open(cacheName).then(cache=>cache.addAll(assets))
);
self.skipWaiting();
});

self.addEventListener("activate", event=>{
event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.map(key=>{
if(key!==cacheName) return caches.delete(key);
})
);
})
);
self.clients.claim();
});

self.addEventListener("fetch", event=>{
event.respondWith(
caches.match(event.request).then(res=>res || fetch(event.request))
);
});