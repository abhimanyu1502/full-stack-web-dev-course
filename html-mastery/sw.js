/**
 * Service Worker — HTML & CSS Mastery Platform
 * Caches static assets for offline resilience and fast subsequent loads.
 * Strategy: Network-first for HTML, Cache-first for CSS/JS/fonts.
 */

const CACHE_NAME    = 'htmlmastery-v6';
const DYNAMIC_CACHE = 'htmlmastery-dynamic-v6';

// Core assets to pre-cache on install
const PRECACHE_ASSETS = [
    '/styles.css',
    '/script.js',
    '/editor.js',
    '/progress.js',
    '/projects-data.js',
    '/project-system.js',
    '/playgrounds.js',
    '/css-app.js',
    '/css-data-1.js',
    '/css-data-2.js',
    '/css-data-3.js',
    '/css-data-4.js',
    '/dashboard.html',
    '/introduction.html',
    '/projects.html',
    '/css.html',
    '/my-progress.html',
    '/playgrounds.html'
];

// ── Install: pre-cache core assets ───────────────────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // cache.addAll silently ignores individual failures on Surge
            return Promise.allSettled(
                PRECACHE_ASSETS.map(url =>
                    cache.add(url).catch(err => console.warn('[SW] Pre-cache failed for', url, err.message))
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// ── Activate: clean up old caches ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter(k => k !== CACHE_NAME && k !== DYNAMIC_CACHE)
                    .map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch: smart routing strategy ─────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Never cache API calls or extension requests
    if (url.pathname.startsWith('/api/') || url.protocol === 'chrome-extension:') {
        return; // let browser handle natively
    }

    // For GET requests only
    if (request.method !== 'GET') return;

    const ext = url.pathname.split('.').pop().toLowerCase();

    // ── CSS, JS, fonts, images: Cache-first (fast) ─────────────────────────
    if (['css', 'js', 'woff2', 'woff', 'ttf', 'png', 'jpg', 'svg', 'ico', 'gif', 'webp'].includes(ext)) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    if (!response || response.status !== 200 || response.type === 'opaque') return response;
                    const cloned = response.clone();
                    caches.open(DYNAMIC_CACHE).then(c => c.put(request, cloned));
                    return response;
                }).catch(() => caches.match(request));
            })
        );
        return;
    }

    // ── HTML pages: Network-first with cache fallback ──────────────────────
    if (ext === 'html' || url.pathname === '/' || !url.pathname.includes('.')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (!response || response.status !== 200) return response;
                    const cloned = response.clone();
                    caches.open(CACHE_NAME).then(c => c.put(request, cloned));
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // ── Everything else: Network-first ─────────────────────────────────────
    event.respondWith(
        fetch(request).catch(() => caches.match(request))
    );
});
