'use strict';

// Configuration
const VERSION = '1.0.0';
const CACHE_NAME = `${VERSION}::PWAsite`;

// Essential files for offline functionality
const ESSENTIAL_FILES = [
    '/',
    '/index.html',
    '/404.html',
    '/manifest.json',
    '/assets/css/main.min.css',
    '/assets/js/index.mjs',
];

// Desirable files to pre-cache if possible
const DESIRABLE_FILES = [
    '/assets/images/icons/favicon.ico',
    '/assets/images/icons/addition/close.svg',
    '/assets/images/icons/addition/dot-grid.svg',
    '/assets/images/icons/addition/envelope-outline.svg',
    '/assets/images/icons/addition/logo.svg',
    '/assets/images/icons/addition/map-pin.svg',
    '/assets/images/icons/addition/pdf.svg',
    '/assets/images/icons/addition/phone.svg',
    '/assets/images/icons/addition/photo-placeholder.svg',
    '/assets/images/icons/addition/404.svg',
    '/assets/images/icons/social-media/envelope.svg',
    '/assets/images/icons/social-media/github.svg',
    '/assets/images/icons/social-media/linkedin.svg',
    '/assets/images/icons/social-media/x.svg',
    //'/assets/images/icons/skills/api.svg',
    //'/assets/images/icons/skills/code.svg',
    //'/assets/images/icons/skills/webpack.svg',
    //'/assets/images/icons/skills/pug.svg',
    //'/assets/images/icons/skills/responsive-design.svg',
    //'/assets/images/icons/skills/prestashop.svg',
    //'/assets/images/icons/skills/shopify.svg',
    '/assets/images/icons/skills/css.svg',
    '/assets/images/icons/skills/firebase.svg',
    '/assets/images/icons/skills/git.svg',
    '/assets/images/icons/skills/gulp.svg',
    '/assets/images/icons/skills/html.svg',
    '/assets/images/icons/skills/js.svg',
    '/assets/images/icons/skills/laravel.svg',
    '/assets/images/icons/skills/mysql.svg',
    '/assets/images/icons/skills/php.svg',
    '/assets/images/icons/skills/pwa.svg',
    '/assets/images/icons/skills/sass.svg',
    '/assets/images/icons/skills/vuejs.svg',
    '/assets/images/icons/skills/vuetify.svg',
    '/assets/images/icons/skills/nuxt.svg',
    '/assets/images/icons/skills/nodejs.svg',
    '/assets/images/icons/skills/primevue.svg',
    '/assets/images/icons/skills/bootstrap.svg',
    '/assets/images/meta/gr-thumbnail.jpg',
    '/assets/images/profile/goran.webp',
    '/assets/images/projects/airquality.webp',
    '/assets/images/projects/aleabet.webp',
    '/assets/images/projects/aleabetlists.webp',
    '/assets/images/projects/b2bplatform.webp',
    '/assets/images/projects/bplace.webp',
    '/assets/images/projects/chatty.webp',
    //'/assets/images/projects/dynamic-layout.webp',
    '/assets/images/projects/einfo.webp',
    '/assets/images/projects/examiz.webp',
    '/assets/images/projects/goranradmanovic.webp',
    '/assets/images/projects/jatheoncloud.webp',
    '/assets/images/projects/keno.webp',
    '/assets/images/projects/mascaro.webp',
    '/assets/images/projects/mondrian.webp',
    '/assets/images/projects/nikom.webp',
    '/assets/images/projects/niotix.webp',
    '/assets/images/projects/oldportfolio.webp',
    '/assets/images/projects/oomovers.webp',
    '/assets/images/projects/prettyballerinas.webp',
    '/assets/images/projects/rhmzrs.webp',
    '/assets/images/projects/stealio.webp',
    '/assets/images/projects/thefruitsofthevillage.webp',
    '/assets/images/projects/trendseam.webp',
    '/assets/images/projects/trivial.webp',
    '/assets/images/projects/tsd.webp',
    '/assets/images/popup/airquality.webp',
    '/assets/images/popup/aleabet.webp',
    '/assets/images/popup/aleabetlist.webp',
    '/assets/images/popup/b2b.webp',
    '/assets/images/popup/bplace.webp',
    '/assets/images/popup/chatty.webp',
    //'/assets/images/popup/dynamiclayout.webp',
    '/assets/images/popup/einfo.webp',
    '/assets/images/popup/examiz.webp',
    '/assets/images/popup/goranradmanovic.webp',
    '/assets/images/popup/jatheon.webp',
    '/assets/images/popup/keno.webp',
    '/assets/images/popup/mascaro.webp',
    '/assets/images/popup/mondrian.webp',
    '/assets/images/popup/nikom.webp',
    '/assets/images/popup/niotix.webp',
    '/assets/images/popup/oldportfolio.webp',
    '/assets/images/popup/oomovers.webp',
    '/assets/images/popup/prettyballerinas.webp',
    '/assets/images/popup/rhmzrs.webp',
    '/assets/images/popup/stealio.svg',
    '/assets/images/popup/thefruitsofthevillage.webp',
    '/assets/images/popup/trendseam.webp',
    '/assets/images/popup/trivial.webp',
    '/assets/images/popup/tsd.webp',
    '/assets/images/screenshots/desktop/desktop-home.webp',
    '/assets/images/screenshots/mobile/desktop-mobile.webp',
    '/assets/pdf/cv.pdf',
    '/assets/data/experience-list.json',
    '/assets/data/projects-list.json',
    '/assets/data/head.json'
];

// Helper Functions
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg']);

/**
 * Checks if a URL corresponds to an image.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is an image.
 */
function isImage(url) {
    const ext = url.split('.').pop();
    return IMAGE_EXTENSIONS.has(ext);
}

/**
 * Checks if a URL has a supported scheme.
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the scheme is supported (http or https).
 */
function isSupportedScheme(url) {
    return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Provides a placeholder for offline image requests.
 * @returns {Response} - An SVG placeholder response.
 */
function offlineImageResponse() {
    const svg = `
        <svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <title>Offline</title>
            <rect width="400" height="300" fill="#eee"/>
            <text x="200" y="150" text-anchor="middle" 
                  dominant-baseline="middle" font-family="sans-serif" 
                  font-size="20" fill="#ccc">
                  Offline
            </text>
        </svg>`;
    return new Response(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'no-store',
        },
    });
}

// Cache Management

/**
 * Caches essential static files.
 * @returns {Promise} - Resolves when caching is complete.
 */
function cacheEssentialFiles() {
    return caches.open(CACHE_NAME).then((cache) => cache.addAll(ESSENTIAL_FILES));
}

/**
 * Clears old caches.
 * @returns {Promise} - Resolves when old caches are deleted.
 */
function clearOldCaches() {
    return caches.keys().then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    );
}

// Service Worker Event Listeners

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        cacheEssentialFiles().then(() => self.skipWaiting())
    );
});

// Activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        clearOldCaches().then(() => self.clients.claim())
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = event.request.url;

    // Skip unsupported schemes
    if (!isSupportedScheme(url)) return;

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) =>
            cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;

                return fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse.ok) cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                    .catch(() => (isImage(url) ? offlineImageResponse() : null));
            })
        )
    );
});
