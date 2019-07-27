const _cacheName = "MovieCatalguePWA-v1";
let filesToCache = [
    "/",
    "/manifest.json",
    "/index.html",
    "/nav.html",
    "/detail.html",
    "/css/custom.css",
    "/css/materialize.min.css",
    "/pages/now-playing.html",
    "/pages/favorites.html",
    "/pages/upcoming.html",
    "/images/sample-1.jpg",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/js/controller/api-controller.js",
    "/js/lib/materialize.min.js",
    "/js/lib/idb.js",
    "/js/controller/nav-controller.js",
    "/js/controller/sw-controller.js",
    "/js/controller/db-controller.js"
];

self.addEventListener('install', event => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches
            .open(_cacheName)
            .then(function (cache) {
                console.log("[ServiceWorker] caching app shell");
                return cache.addAll(filesToCache)
            })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('MovieCatalguePWA') &&
                        cacheName !== _cacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request)
            })
    )
});