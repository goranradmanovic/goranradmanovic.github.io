//Configuration
const version = '1.0.0',
	  CACHE = version + '::PWAsite',
	  //An array of essential files to install, which ensure the site functions offline
	  installFilesEssential = [
	  	'/',
	  	'/index.html',
	  	'/projects.html',
	  	'/manifest.json',
	  	'/assets/css/main.min.css',
	  	'/assets/css/projects.min.css',
	  	'/assets/css/sal.css',
	  	'/assets/js/main.min.js',
	  	'/assets/js/infomodal.min.js',
	  	'/assets/js/sal.js',
	  ],
	  //Optionally, an array of desirable files. These will be downloaded, if possible, but won’t make the installation abort on failure.
	  installFilesDesirable = [
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-300.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-regular.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-italic.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-600.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-600italic.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-700.woff2',
	  	'/assets/fonts/OpenSans/open-sans-v15-latin-700italic.woff2',
	  	'/assets/fonts/SairaExtraCondensed/saira-extra-condensed-v3-latin-regular.woff2',
	  	'/assets/fonts/SairaExtraCondensed/saira-extra-condensed-v3-latin-500.woff2',
	  	'/assets/fonts/SairaExtraCondensed/saira-extra-condensed-v3-latin-600.woff2',
	  	'/assets/fonts/SairaExtraCondensed/saira-extra-condensed-v3-latin-700.woff2',
	  	'/assets/images/icons/favicon.ico',
	  	'/assets/images/icons/addition/caret-up.svg',
	  	'/assets/images/icons/addition/check-mark.svg',
	  	'/assets/images/icons/addition/pdf.svg',
	  	'/assets/images/icons/addition/glint.svg',
	  	'/assets/images/icons/addition/close.svg',
	  	'/assets/images/icons/addition/photo-placeholder.svg',
	  	'/assets/images/icons/addition/info.svg',
	  	'/assets/images/icons/rating/star-1.svg',
	  	'/assets/images/icons/rating/star-2.svg',
	  	'/assets/images/icons/rating/star-3.svg',
	  	'/assets/images/icons/rating/star-4.svg',
	  	'/assets/images/icons/rating/star-5.svg',
	  	'/assets/images/icons/social-media/envelope.svg',
	  	'/assets/images/icons/social-media/facebook.svg',
	  	'/assets/images/icons/social-media/github.svg',
	  	'/assets/images/icons/social-media/linkedin.svg',
	  	'/assets/images/icons/social-media/skype.svg',
	  	'/assets/images/icons/social-media/twitter.svg',
	  	'/assets/images/icons/skills/api.svg',
	  	'/assets/images/icons/skills/code.svg',
	  	'/assets/images/icons/skills/css3.svg',
	  	'/assets/images/icons/skills/firebase.svg',
	  	'/assets/images/icons/skills/git.svg',
	  	'/assets/images/icons/skills/gulp.svg',
	  	'/assets/images/icons/skills/webpack.svg',
	  	'/assets/images/icons/skills/html5.svg',
	  	'/assets/images/icons/skills/js.svg',
	  	'/assets/images/icons/skills/laravel.svg',
	  	'/assets/images/icons/skills/mysql.svg',
	  	'/assets/images/icons/skills/php.svg',
	  	'/assets/images/icons/skills/pug.svg',
	  	'/assets/images/icons/skills/pwa.svg',
	  	'/assets/images/icons/skills/responsive-design.svg',
	  	'/assets/images/icons/skills/sass.svg',
	  	'/assets/images/icons/skills/vuejs.svg',
	  	'/assets/images/icons/skills/prestashop.svg',
	  	'/assets/images/icons/skills/primevue.svg',
	  	'/assets/images/icons/skills/shopify.svg',
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
	  	'/assets/images/projects/airquality.webp',
	  	'/assets/images/projects/nikom.webp',
	  	'/assets/images/projects/examiz.webp',
	  	'/assets/images/projects/mascaro.webp',
	  	'/assets/images/projects/prettyballerinas.webp',
	  	'/assets/images/projects/niota.webp',
	  	'/assets/images/projects/tsd.webp',
	  	'/assets/images/projects/trendseam.webp',
	  	'/assets/images/projects/trivial.webp',
	  	'/assets/images/popup/airquality.webp',
	  	'/assets/images/popup/aleabet.webp',
	  	'/assets/images/popup/aleabetlist.webp',
	  	'/assets/images/popup/b2b.webp',
	  	'/assets/images/popup/bplace.webp',
	  	'/assets/images/popup/chatty.webp',
	  	'/assets/images/popup/dynamiclayout.webp',
	  	'/assets/images/popup/einfo.webp',
	  	'/assets/images/popup/jatheon.webp',
	  	'/assets/images/popup/keno.webp',
	  	'/assets/images/popup/mondrian.webp',
	  	'/assets/images/popup/nikom.webp',
	  	'/assets/images/popup/oldportfolio.webp',
	  	'/assets/images/popup/oomovers.webp',
	  	'/assets/images/popup/rhmzrs.webp',
	  	'/assets/images/popup/stealio.webp',
	  	'/assets/images/popup/examiz.webp',
	  	'/assets/images/popup/mascaro.webp',
	  	'/assets/images/popup/prettyballerinas.webp',
	  	'/assets/images/popup/niota.webp',
	  	'/assets/images/popup/tsd.webp',
	  	'/assets/images/popup/trendseam.webp',
	  	'/assets/images/popup/trivial.webp',
	  	'/assets/images/main-projects/examiz.webp',
	  	'/assets/images/main-projects/thefruitsofthevillage.webp',
	  	'/assets/images/main-projects/prettyballerinas.webp',
	  	'/assets/images/main-projects/betting-panel.webp',
	  	'/assets/images/main-projects/tsd.webp',
	  	'/assets/images/main-projects/trenseam.webp',
	  	'/assets/images/main-projects/trivial.webp',
	  	'/assets/images/main-projects/niota.webp',
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
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].map(f => '.' + f); //Add dot before image extension

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

					console.log('Network fetch: ', url);

					if (newReq.ok) cache.put(event.request, newReq.clone());

					return newReq;
				}).catch(() => offlineAssets(url));
			})
		})
	);
});
