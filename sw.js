// Offline cache. Bump VERSION whenever any file changes so phones pick up the update.
const VERSION = 'ww-checklist-v5';
const FILES = [
  './', 'index.html', 'style.css', 'app.js', 'data.js', 'manifest.webmanifest',
  'Icons/icon-192.png', 'Icons/icon-512.png', 'Icons/apple-touch-icon.png',
  'Icons/gear/bait_bag.webp',
  'Icons/gear/bomb_bag.webp',
  'Icons/gear/bomb_bag_upgrade_1.webp',
  'Icons/gear/bomb_bag_upgrade_2.webp',
  'Icons/gear/boomerang.webp',
  'Icons/gear/cabana_deed.webp',
  'Icons/gear/deku_leaf.webp',
  'Icons/gear/delivery_bag.webp',
  'Icons/gear/deluxe_picto_box.webp',
  'Icons/gear/dins_pearl.webp',
  'Icons/gear/empty_bottle.webp',
  'Icons/gear/farores_pearl.webp',
  'Icons/gear/fire_arrow.webp',
  'Icons/gear/grappling_hook.webp',
  'Icons/gear/heart.webp',
  'Icons/gear/heart_container.webp',
  'Icons/gear/heros_bow.webp',
  'Icons/gear/heros_charm.webp',
  'Icons/gear/heros_shield.webp',
  'Icons/gear/heros_sword.webp',
  'Icons/gear/hookshot.webp',
  'Icons/gear/ice_arrow.webp',
  'Icons/gear/iron_boots.webp',
  'Icons/gear/joy_pendant.webp',
  'Icons/gear/light_arrow.webp',
  'Icons/gear/magic_armor.webp',
  'Icons/gear/master_sword.webp',
  'Icons/gear/master_sword_half.webp',
  'Icons/gear/master_sword_powerless.webp',
  'Icons/gear/mirror_shield.webp',
  'Icons/gear/nayrus_pearl.webp',
  'Icons/gear/picto_box.webp',
  'Icons/gear/pirates_charm.webp',
  'Icons/gear/power_bracelet.webp',
  'Icons/gear/quiver_upgrade_1.webp',
  'Icons/gear/quiver_upgrade_2.webp',
  'Icons/gear/sail.webp',
  'Icons/gear/skull_hammer.webp',
  'Icons/gear/spoils_bag.webp',
  'Icons/gear/telescope.webp',
  'Icons/gear/tingle_bottle.webp',
  'Icons/gear/tingle_statue.webp',
  'Icons/gear/treasure_chart.webp',
  'Icons/gear/triforce_shard.webp',
  'Icons/gear/wallet_upgrade_1.webp',
  'Icons/gear/wallet_upgrade_2.webp',
  'Icons/gear/wind_waker.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first (so updates arrive when online), cache fallback (so it works offline in the Great Sea).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
