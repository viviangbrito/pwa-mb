const CACHE_NAME = 'podcasts-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icone2/Assets.xcassets/AppIcon.appiconset/192.png',
  '/icone2/Assets.xcassets/AppIcon.appiconset/256.png',
  '/icone2/Assets.xcassets/AppIcon.appiconset/384.png',
  '/icone2/Assets.xcassets/AppIcon.appiconset/512.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  console.log("[Service Worker] Instalado");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[Service Worker] Armazenando arquivos no cache...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  console.log("[Service Worker] Ativado");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Removendo cache antigo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepta requisições e busca no cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
