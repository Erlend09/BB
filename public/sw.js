// sw.js

// Installeringsfasen
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    // event.waitUntil() 
  });
  
  // Aktiveringsfasen
  self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
  });
  
  // Fetch-hendelse: Håndter nettverksforespørsler (for caching/offline)
  self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching:', event.request.url);
  });
  