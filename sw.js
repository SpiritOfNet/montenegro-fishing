/* Cache this site's static atlas and local vectors. Do not bulk-cache map tiles. */
const CACHE='fishing-atlas-v4-all-fish';
const FILES=['./','./index.html','./styles.css','./rdr.css','./app.js','./drawn-map.js','./data.js','./manifest.webmanifest','./assets/favicon.svg','./assets/fish-sketches.png','./assets/fish-sketches-extra.png','./assets/paper-rdr.png','./assets/caveat.ttf','./assets/oswald.ttf','./assets/geography.js','./assets/drawn-geography.js','./assets/roboto-slab-regular.ttf','./assets/roboto-slab-bold.ttf','./vendor/leaflet/leaflet.js','./vendor/leaflet/leaflet.css','./vendor/markercluster/leaflet.markercluster.js','./vendor/markercluster/MarkerCluster.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fishing-atlas-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin||e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
