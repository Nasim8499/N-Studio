const C = "nstudio-v4";
const ASSETS = ["./", "index.html", "app/icon-192.png", "app/icon-512.png", "app/icon-maskable-512.png", "app/apple-touch-icon.png"];
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then((c) => c.addAll(ASSETS).catch(() => {})));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.origin !== location.origin) return;
  if (r.mode === "navigate") {
    e.respondWith(fetch(r).then((res) => {
      const copy = res.clone();
      caches.open(C).then((c) => c.put("index.html", copy));
      return res;
    }).catch(() => caches.match("index.html").then((m) => m || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(r).then((hit) => hit || fetch(r).then((res) => {
    const copy = res.clone();
    caches.open(C).then((c) => c.put(r, copy)).catch(() => {});
    return res;
  })));
});
