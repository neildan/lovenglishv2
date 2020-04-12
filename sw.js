;
//asignar un nombre y versión al cache
const CACHE_NAME = 'love_english',
  urlsToCache = [
    './',
    'script.js',
    'css/bootstrap.min.css',
    'css/jquery.mCustomScrollbar.css',
    'css/styles.css',
    'fonts/Friendly-Schoolmates.otf',
    'fonts/Mithella-Regular.otf',
    'img/icons/brain-16.png',
    'img/icons/brain-24.png',
    'img/icons/brain-32.png',
    'img/icons/brain-64.png',
    'img/icons/brain-128.png',
    'img/icons/brain-256.png',
    'img/icons/brain-512.png',
    'js/jquery.mCustomScrollbar.concat.min.js',
    'pages/narnia.html',
    'audios/1/main.mp3',
    'audios/1/mini.mp3',
    'audios/1/questions.mp3',
    'audios/2/main.mp3',
    'audios/2/mini.mp3',
    'audios/2/questions.mp3',
    'audios/3/main.mp3',
    'audios/3/mini.mp3',
    'audios/3/questions.mp3',
    'audios/4/main.mp3',
    'audios/4/mini.mp3',
    'audios/4/questions.mp3',
    'audios/5/main.mp3',
    'audios/5/mini.mp3',
    'audios/5/questions.mp3',
    'audios/6/main.mp3',
    'audios/6/mini.mp3',
    'audios/6/questions.mp3',
    'audios/7/main.mp3',
    'audios/7/mini.mp3',
    'audios/7/questions.mp3',
    'audios/8/main.mp3',
    'audios/8/mini.mp3',
    'audios/8/questions.mp3',
    'audios/9/main.mp3',
    'audios/9/mini.mp3',
    'audios/9/questions.mp3',
    'audios/10/main.mp3',
    'audios/10/mini.mp3',
    'audios/10/questions.mp3',
    'audios/11/main.mp3',
    'audios/11/mini.mp3',
    'audios/11/questions.mp3',
    'audios/12/main.mp3',
    'audios/12/mini.mp3',
    'audios/12/questions.mp3'
  ]

  //durante la fase de instalación, generalmente se almacena en caché los activos estáticos
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
  })

  //una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
  self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              //Eliminamos lo que ya no se necesita en cache
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName)
              }
            })
          )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
  })

  //cuando el navegador recupera una url
  self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            //recuperar del cache
            return res
          }
          //recuperar de la petición a la url
          return fetch(e.request)
        })
    )
  })