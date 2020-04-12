;
//asignar un nombre y versión al cache
const CACHE_NAME = 'love_english_cache',
  urlsToCache = [
    './index.html',
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

// Durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
  }());
});

// Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', (event) => {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.filter((cacheName) => {
        // Return true if you want to remove this cache,
        // but remember that caches are shared across
        // the whole origin
      }).map(cacheName => caches.delete(cacheName))
    );
  }());
});

// Cuando el navegador recupera una url
self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open('mysite-dynamic');
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});