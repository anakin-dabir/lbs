self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      console.log('cached');
      return cache.addAll(['/']);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      console.log('cach fetched');
      return response || fetch(event.request);
    })
  );
});
