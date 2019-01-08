//Service Worker

const assetsCacheName = 'v1-assets'; //cache name

//Service worker installing event
self.addEventListener('install', (event) => {

	console.log('Service Worker Installing ', event);

	//worker will skip the waiting step and activate now
	self.skipWaiting();
});

//Service worker activate event
self.addEventListener('activate', (event) => {
	console.log('Service Worker Activate ', event);
});

//Fetch event
self.addEventListener('fetch', event => {

	//Ignore crossdomain requests
	if (!event.request.url.startsWith(self.location.origin)) return;

	//Ignore non-GET requests
	if (event.request.method !== 'GET') return;

	//Ignore browser-sync
	if (event.request.url.indexOf('browser-sync') > -1) return;

	//Prevent index route being cached
	if (event.request.url === (self.location.origin + '/')) return;

	//Prevent index.html being cached
	if (event.request.url.endsWith('index.html')) return;

	console.log('Fetch event ', event);

	//Tell the fetch to respond with this Promise chain
	event.respondWith(

		//Open cache
		caches.open(assetsCacheName).then(cache => {

			//Look for matching request in the cache
			return cache.match(event.request).then(matched => {
				//If a match is found return the cached version first
				if (matched) return matched;

				//Otherwise continue to the network
				//Make the request to the network
				return fetch(event.request).then(response => {
					//Cache the response
					cache.put(event.request, response.clone());

					//Return the original response to the page
					return response;
				});
			});
		})
	);
});