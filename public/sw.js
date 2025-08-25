// Service Worker for Enhanced Performance and Caching
const CACHE_NAME = 'tapze-v1';
const STATIC_CACHE_NAME = 'tapze-static-v1';
const DYNAMIC_CACHE_NAME = 'tapze-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/lovable-uploads/main-banner.png',
  '/lovable-uploads/vcard27.png',
  '/lovable-uploads/vcard28.png',
  '/lovable-uploads/vcard29.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests (except fonts and images)
  const url = new URL(event.request.url);
  if (!url.origin.includes(self.location.origin) && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Network request with caching
      return fetch(event.request).then((response) => {
        // Don't cache if not successful
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Determine cache name based on request type
        const cacheName = event.request.destination === 'document' || 
                         event.request.url.includes('/src/') || 
                         event.request.url.includes('.css') || 
                         event.request.url.includes('.js')
                         ? STATIC_CACHE_NAME 
                         : DYNAMIC_CACHE_NAME;

        // Cache the response
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Fallback for offline pages
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions, cart updates, etc.
  return Promise.resolve();
}