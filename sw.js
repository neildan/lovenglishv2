// Set a name for the current cache
var cacheName = 'v1_love_english_cache';

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
  './js/jquery.mCustomScrollbar.concat.min.js',
  './pages/narnia.html',
  './audios/1/main.mp3',
  './audios/1/mini.mp3',
  './audios/1/questions.mp3',
  './audios/2/main.mp3',
  './audios/2/mini.mp3',
  './audios/2/questions.mp3',
  './audios/3/main.mp3',
  './audios/3/mini.mp3',
  './audios/3/questions.mp3',
  './audios/4/main.mp3',
  './audios/4/mini.mp3',
  './audios/4/questions.mp3',
  './audios/5/main.mp3',
  './audios/5/mini.mp3',
  './audios/5/questions.mp3',
  './audios/6/main.mp3',
  './audios/6/mini.mp3',
  './audios/6/questions.mp3',
  './audios/7/main.mp3',
  './audios/7/mini.mp3',
  './audios/7/questions.mp3',
  './audios/8/main.mp3',
  './audios/8/mini.mp3',
  './audios/8/questions.mp3',
  './audios/9/main.mp3',
  './audios/9/mini.mp3',
  './audios/9/questions.mp3',
  './audios/10/main.mp3',
  './audios/10/mini.mp3',
  './audios/10/questions.mp3',
  './audios/11/main.mp3',
  './audios/11/mini.mp3',
  './audios/11/questions.mp3',
  './audios/12/main.mp3',
  './audios/12/mini.mp3',
  './audios/12/questions.mp3'
]


self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Installed');

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(

    // Open the cache
    caches.open(cacheName).then(function (cache) {

      // Add all the default files to the cache
      console.log('[ServiceWorker] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  ); // end e.waitUntil
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(

    // Get all the cache keys (cacheName)
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {

        // If a cached item is saved under a previous cacheName
        if (thisCacheName !== cacheName) {

          // Delete that cached file
          console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  ); // end e.waitUntil

});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(

    // Check in cache for the request being made
    caches.match(e.request)


      .then(function (response) {

        // If the request is in the cache
        if (response) {
          console.log("[ServiceWorker] Found in Cache", e.request.url, response);
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {

            if (!response) {
              console.log("[ServiceWorker] No response from fetch ")
              return response;
            }

            var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function (cache) {

              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log('[ServiceWorker] New Data Cached', e.request.url);

              // Return the response
              return response;

            }); // end caches.open

          })
          .catch(function (err) {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
          });


      }) // end caches.match(e.request)
  ); // end e.respondWith
});