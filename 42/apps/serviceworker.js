var cacheName = 'hello-pwa';
var filesToCache = [
  // '/',
  'cards.html',
  'css/searchresults.css',
  'css/blocks.css',
  'js/branches.js',
  'js/lostandfound.js',
  'main.js'
  /*
  add bootstrap, jquery and font awsome
  */
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});