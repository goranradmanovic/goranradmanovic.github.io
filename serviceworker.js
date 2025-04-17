'use strict';

// Configuration
const VERSION = '1.0.1';
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
    '/assets/images/icons/skills/livewire.svg',
    '/assets/images/icons/skills/alpinejs.svg',
    '/assets/images/meta/gr-thumbnail.jpg',
    '/assets/images/profile/goran.avif',
    '/assets/images/projects/airquality.avif',
    '/assets/images/projects/aleabet.avif',
    '/assets/images/projects/aleabetlists.avif',
    '/assets/images/projects/b2bplatform.avif',
    '/assets/images/projects/bplace.avif',
    '/assets/images/projects/chatty.avif',
    //'/assets/images/projects/dynamic-layout.avif',
    '/assets/images/projects/einfo.avif',
    '/assets/images/projects/examiz.avif',
    '/assets/images/projects/goranradmanovic.avif',
    '/assets/images/projects/jatheoncloud.avif',
    '/assets/images/projects/keno.avif',
    '/assets/images/projects/mascaro.avif',
    '/assets/images/projects/mondrian.avif',
    '/assets/images/projects/nikom.avif',
    '/assets/images/projects/niotix.avif',
    '/assets/images/projects/oldportfolio.avif',
    '/assets/images/projects/oomovers.avif',
    '/assets/images/projects/prettyballerinas.avif',
    '/assets/images/projects/rhmzrs.avif',
    '/assets/images/projects/stealio.avif',
    '/assets/images/projects/thefruitsofthevillage.avif',
    '/assets/images/projects/trendseam.avif',
    '/assets/images/projects/trivial.avif',
    '/assets/images/projects/tsd.avif',
    '/assets/images/projects/xe.avif',
    '/assets/images/popup/airquality.avif',
    '/assets/images/popup/aleabet.avif',
    '/assets/images/popup/aleabetlist.avif',
    '/assets/images/popup/b2b.avif',
    '/assets/images/popup/bplace.avif',
    '/assets/images/popup/chatty.avif',
    //'/assets/images/popup/dynamiclayout.avif',
    '/assets/images/popup/einfo.avif',
    '/assets/images/popup/examiz.avif',
    '/assets/images/popup/goranradmanovic.avif',
    '/assets/images/popup/jatheon.avif',
    '/assets/images/popup/keno.avif',
    '/assets/images/popup/mascaro.avif',
    '/assets/images/popup/mondrian.avif',
    '/assets/images/popup/nikom.avif',
    '/assets/images/popup/niotix.avif',
    '/assets/images/popup/oldportfolio.avif',
    '/assets/images/popup/oomovers.avif',
    '/assets/images/popup/prettyballerinas.avif',
    '/assets/images/popup/rhmzrs.avif',
    '/assets/images/popup/stealio.svg',
    '/assets/images/popup/stealio.avif',
    '/assets/images/popup/thefruitsofthevillage.avif',
    '/assets/images/popup/trendseam.avif',
    '/assets/images/popup/trivial.avif',
    '/assets/images/popup/tsd.avif',
    '/assets/images/popup/xe.avif',
    '/assets/images/screenshots/desktop/desktop-home.webp',
    '/assets/images/screenshots/mobile/desktop-mobile.webp',
    '/assets/pdf/cv.pdf',
    '/assets/data/experience-list.json',
    '/assets/data/projects-list.json',
    '/assets/data/head.json'
];

// Helper Functions
const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'avif']);

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
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <path fill="#eee" d="M0 0h400v300H0z"/>
            <text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="20" fill="#ccc">
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
