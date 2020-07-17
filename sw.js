// Set a name for the current cache
var cacheName = 'v2_love_english_cache';

// Default files to always cache
var cacheFiles = [
  './',
  './script.js',
  './css/bootstrap.min.css',
  './css/jquery.mCustomScrollbar.css',
  './css/styles.css',
  './fonts/Friendly-Schoolmates.otf',
  './fonts/Mithella-Regular.otf',
  './img/icons/brain-16.png',
  './img/icons/brain-24.png',
  './img/icons/brain-32.png',
  './img/icons/brain-64.png',
  './img/icons/brain-128.png',
  './img/icons/brain-256.png',
  './img/icons/brain-512.png',
  './img/icons/download.png',
  './js/jquery.mCustomScrollbar.concat.min.js',
]

/**
 * Event Install Service Worker
 * @author Daniel Valencia <2020/07/16>
 */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

/**
 * Event Activate Service Worker
 * @author Daniel Valencia <2020/07/16>
 */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        if (thisCacheName !== cacheName) return caches.delete(thisCacheName);
      }));
    })
  );
});

/**
 * Event Fetch Service Worker
 * @author Daniel Valencia <2020/07/16>
 */
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request)
      .then(function (response) {
        if (response) return response;
        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {
            if (!response) return response;
            var responseClone = response.clone();
            caches.open(cacheName).then(function (cache) {
              cache.put(e.request, responseClone);
              return response;
            });
          })
          .catch(function (err) { });
      })
  );
});