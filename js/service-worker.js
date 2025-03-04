const cacheName = 'podcasts-de-horror-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Substitua por seus próprios arquivos
  '/script.js',  // Substitua por seus próprios arquivos
  '/icone 2/icon-192x192.png',
  '/icone 2/icon-512x512.png'
];

// Instalando o service worker e cacheando arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Ativando o service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Recuperando os arquivos do cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request);
    })
  );
});

