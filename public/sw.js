// Service Worker for Stucare Ambassador PWA
const CACHE_NAME = 'stucare-v1';

// Install event - cache essential files
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
