const CACHE_NAME = 'sky-grace-v2';
const assets = [
  '/',
  '/index.html',
  '/sermons.html',
  '/theology-school.html',
  '/calendar.html',
  '/live.html',
  '/give.html',
  '/register.html',            // Added for offline access
  '/registration-success.html',    // Added for offline access
  '/manifest.json',
  '/assets/images/logo.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Fetch Assets from Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});