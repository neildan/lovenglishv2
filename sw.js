;
//asignar un nombre y versión al cache
const cacheName = 'love_english_cache',
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

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(urlsToCache)
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});