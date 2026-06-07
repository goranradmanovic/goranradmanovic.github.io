'use strict'

const VERSION = '1.0.2'
const CACHE_NAME = `${VERSION}::PWAsite`

const ESSENTIAL_FILES = [
    '/',
    '/index.html',
    '/404.html',
    '/pages/privacy-policy.html',
    '/assets/pdf/cv.pdf',
    '/manifest.json',
    
    // Main Entry Points
    '/assets/css/main.min.css',
    '/assets/js/index.min.js',

    // JS Utilities
    '/assets/js/utils/gtag-cookie.min.js'
];

const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'avif'])

// Helpers
function isImage(urlStr) {
    const ext = urlStr.split('.').pop().split('?')[0] // strip query params if any
    return IMAGE_EXTENSIONS.has(ext)
}

function isDataOrDocument(request, url) {
    return (
        request.destination === 'document' || 
        url.pathname.endsWith('.json') || 
        url.pathname.includes('/assets/data/')
    )
}

function offlineImageResponse() {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120">
            <path fill="#eff1f3" d="M0 0h120v120H0z"/>
            <path fill="#687787" fill-rule="evenodd" d="M33.25 38.482a2.625 2.625 0 0 1 2.604-2.607h47.292a2.606 2.606 0 0 1 2.604 2.607v42.036a2.625 2.625 0 0 1-2.604 2.607H35.854a2.607 2.607 0 0 1-2.604-2.607zm47.25 2.643h-42v36.75l24.392-24.397a2.625 2.625 0 0 1 3.712 0L80.5 67.401zm-36.75 10.5a5.25 5.25 0 1 0 10.5 0 5.25 5.25 0 0 0-10.5 0" clip-rule="evenodd"/>
        </svg>`;
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
}

// 1. STRATEGY: Network-First (For HTML, JSON data)
async function networkFirstStrategy(request) {
    const cache = await caches.open(CACHE_NAME)
    try {
        const networkResponse = await fetch(request)
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone())
        }
        return networkResponse
    } catch (error) {
        const cachedResponse = await cache.match(request)
        if (cachedResponse) return cachedResponse
        
        // Return 404 page if offline and trying to access a page
        if (request.destination === 'document') {
            const errorCache = await caches.match('/404.html')
            if (errorCache) return errorCache
        }
        throw error
    }
}

// 2. STRATEGY: Cache-First (For CSS, JS, Images, PDFs)
async function cacheFirstStrategy(request, url) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)
    if (cachedResponse) return cachedResponse

    try {
        const networkResponse = await fetch(request)
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone())
        }
        return networkResponse
    } catch (error) {
        if (isImage(url.pathname)) {
            return offlineImageResponse()
        }
        // If CV or critical asset fails and no cache exists
        return new Response('Offline content unavailable.', { status: 503, statusText: 'Offline' })
    }
}

// Lifecycles
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ESSENTIAL_FILES))
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    )
})

// Interceptor
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return

    const url = new URL(event.request.url)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return

    if (isDataOrDocument(event.request, url)) {
        event.respondWith(networkFirstStrategy(event.request))
    } else {
        event.respondWith(cacheFirstStrategy(event.request, url))
    }
})

// Listen for messages from the pwa-toast component
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})