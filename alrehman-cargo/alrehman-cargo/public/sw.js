const CACHE='alrehman-v2';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add('/icon.svg')).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('alrehman-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
// Pages, scripts and API responses always come from the network to avoid stale Next.js bundles.
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;if(new URL(event.request.url).pathname==='/icon.svg')event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)))});
