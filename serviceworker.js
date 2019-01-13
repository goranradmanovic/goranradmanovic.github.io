//Configuration
const version = '1.0.0',
	  CACHE = version + '::PWAsite',
	  //An array of essential files to install, which ensure the site functions offline 
	  installFilesEssential = [
	  	'/',
	  	'/index.html',
	  	'/manifest.json',
	  	'/assets/css/main.min.css',
	  	'/assets/css/sal.css',
	  	'/assets/js/main.min.js',
	  	'/assets/js/sal.js',
	  ],
	  //Optionally, an array of desirable files. These will be downloaded, if possible, but won’t make the installation abort on failure.
	  installFilesDesirable = [
	  	'/assets/images/icons/favicon.ico',
	  	'/assets/images/icons/glint.svg',
	  	'/assets/images/icons-rating/star-1.svg',
	  	'/assets/images/icons-rating/star-2.svg',
	  	'/assets/images/icons-rating/star-3.svg',
	  	'/assets/images/icons-rating/star-4.svg',
	  	'/assets/images/icons-rating/star-5.svg',
	  	'/assets/images/meta/gr-thumbnail.jpg',
	  	'/assets/images/profile/goran.webp',
	  	'/assets/images/projects/betting-panel.webp',
	  	'/assets/images/projects/bplace.webp',
	  	'/assets/images/projects/chatty.webp',
	  	'/assets/images/projects/dynamic-layout.webp',
	  	'/assets/images/projects/einfo.webp',
	  	'/assets/images/projects/lists.webp',
	  	'/assets/images/projects/oldportfolio.webp',
	  	'/assets/images/projects/stealio.webp',
	  	'/assets/pdf/cv.pdf'
	  ];

//Install Static Files
//The installStaticFiles() function adds files to the cache using the promise-based Cache API. 
//A return value is only generated when the essential files are cached
function installStaticFiles() {

	//Open cache with cache name
	return caches.open(CACHE).then(cache => {
		//Cache desirable files
		cache.addAll(installFilesDesirable);

		//Cache essential files
		return cache.addAll(installFilesEssential);
	});
}


//Clear old caches (delete old caches when they exist)
function clearOldCaches() {

	return caches.keys().then(keylist => {

		return Promise.all(
			keylist.filter(key => key !== CACHE).map(key => caches.delete(key))
		);
	});
}


//Is image URL
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f); //Add dot before image extension

function isImage(url) {
	return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);
}


//Return offline assets
//The offlineAsset() function checks whether the request is for an image and returns an SVG containing the text “offline”. All other requests return the offlineURL page.
function offlineAssets(url) {

	if (isImage(url)) {

		//Return image
		return new Response(
			'<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">Offline</text></svg>',
			{
				headers: {
					'Content-Type': 'image/svg+xml',
					'Cache-Control': 'no-store'
				}
			}
		);
	}
}


/*** SW Listeners ***/

//Install event listener. The waitUntil method ensures the service worker won’t install until all enclosed code has executed. 
//It runs installStaticFiles() then self.skipWaiting() to make the service worker active
self.addEventListener('install', event => {
	//console.log('Service worker: install');

	//Cache core files
	event.waitUntil(
		installStaticFiles().then(() => self.skipWaiting())
	);
});


//Application activated (This occurs when the service worker is activated, either immediately after installation or on return)
self.addEventListener('activate', event => {

	//console.log('Service worker: activate');

	event.waitUntil(
		//self.clients.claim() call sets this service worker as the active worker for the site
		clearOldCaches().then(() => self.clients.claim())
	);
});


//Fetch Event - This occurs whenever a network request is made. It calls the respondWith() method to hijack GET requests and return:
//An asset from the cache.
//If #1 fails, the asset is loaded from the network using the Fetch API) (unrelated to the service worker fetch event). That asset is then added to the cache.
//If #1 and #2 fail, an appropriate response is returned.

self.addEventListener('fetch', event => {

	//Abandond non-GET requests
	if (event.request.method !== 'GET') return;

	let url = event.request.url;

	event.respondWith(

		caches.open(CACHE).then(cache => {

			return cache.match(event.request).then(response => {

				if (response) {
					//Return cached file
					//console.log('cache fetch: ', url);

					return response;
				}

				//Make network request
				return fetch(event.request).then(newReq => {

					//console.log('Network fetch: ', url);

					if (newReq.ok) cache.put(event.request, newReq.clone());

					return newReq;
				}).catch(() => offlineAssets(url));
			})
		})
	);
});