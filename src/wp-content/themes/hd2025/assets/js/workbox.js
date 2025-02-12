importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js");
let registerRoute = workbox.routing.registerRoute;
let CacheFirst = workbox.strategies.CacheFirst;
let CacheableResponsePlugin = workbox.cacheableResponse.CacheableResponsePlugin;
let ExpirationPlugin = workbox.expiration.ExpirationPlugin;
let maxAgeSeconds = 7 * 24 * 60 * 60;
let maxEntries = 60;
let cacheName = "GAUDEV-workbox-cache";
let matchCallback = function matchCallback2(_ref) {
  let request = _ref.request;
  return request.destination === "/wp-content/themes/hd2025/assets/css/.*" || request.destination === "/wp-content/themes/hd2025/assets/js/.*" || request.destination === "/wp-content/themes/hd2025/assets/img/.*";
};
registerRoute(
  matchCallback,
  new CacheFirst({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries,
        maxAgeSeconds
      })
    ]
  })
);
let expectedCaches = ["GAUDEV"];
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open("GAUDEV").then(function(cache) {
      return cache.addAll(["/"]);
    })
  );
});
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    }).then(function() {
      console.log("GAUDEV now ready to handle fetches.");
    })
  );
});
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
//# sourceMappingURL=workbox.js.map
