const cacheName = "restaurantreviewv1";
const filesToCache = ["/"];

self.addEventListener("install", function (event) {
    // Perform install steps
    console.log("[Serviceworker] Install");
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[ServiceWorker] Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;

    // ...

    // Cache first, fall back to network or offline image
    event.respondWith(
        caches.match(request)
        .then(response => {
            return response || fetch(request)
                .then(response => {
                    // ...
                    return response;
                })
                .catch(() => {
                    // Offline fallback image
                    if (request.url.match(/jpg70/gi)) {
                        return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><title id="offline-title">Offline</title><path fill="rgba(145,145,145,0.5)" d="M0 0h400v225H0z" /><text fill="rgba(0,0,0,0.33)" font-family="Helvetica Neue,Arial,sans-serif" font-size="27" text-anchor="middle" x="200" y="113" dominant-baseline="central">offline</text></svg>', {
                            headers: {
                                'Content-Type': 'image/svg+xml'
                            }
                        });
                    }
                });
        })
    );
});