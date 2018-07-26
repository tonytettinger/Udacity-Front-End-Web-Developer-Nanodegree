const cacheName = "rest1";
const filesToCache = ['http://localhost:8000/',
    '/css/styles.css', '/js/dbhelper.js', 'js/main.js', '/js/restaurant_info.js', '/index.html', '/restaurant.html', 'data/restaurants.json'
];

self.addEventListener("install", function (event) {
    // Perform install steps
    console.log("[Serviceworker] Install");
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('rest1').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => {
                        // Offline fallback image
                        if (event.request.url.match(/jpg70/gi)) {
                            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><title id="offline-title">You are Offline</title><path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" /><text fill="rgba(0,0,0,0.33)" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" text-anchor="middle" x="200" y="113" dominant-baseline="central">offline</text></svg>', {
                                headers: {
                                    'Content-Type': 'image/svg+xml'
                                }
                            });
                        }
                    });
            });
        })
    );
});