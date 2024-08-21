const cacheName = 'static-v1';
const assetsToCache = [
  '/',
  '/indexmobile.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
      caches.open('static-v1').then((cache) => {
        return Promise.all(
          assetsToCache.map((url) => {
            return fetch(url)
              .then((response) => {
                if (!response.ok) {
                  console.warn(`Failed to fetch ${url}: ${response.statusText}`);
                  return;
                }
                return cache.put(url, response);
              })
              .catch((error) => {
                console.error('Failed to cache:', error);
              });
          })
        );
      })
    );
  });
  