// list of assets to cache on install
// cache each restaurant detail page as well
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          '/restaurant.html',
          '/css/styles.css',
          '/js/*',
          '/js/dbhelper.js',
          '/js/register_sw.js',
          '/js/main.js',
          '/js/restaurant_info.js',
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});
// intercept all requests
// either return cached asset or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    // Add cache.put to cache images on each fetch
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      if (event.request.url.includes('.jpg')) {
        return caches.match('/img/fixed/offline_img1.png');
      }
      return new Response('Not connected to the internet', {
        status: 404,
        statusText: "Not connected to the internet"
      });
    })
  );
});

// delete old/unused static caches
self.addEventListener('activate', event => {
  event.waitUntil(
    // caches.delete('-restaurant-static-001')
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-static-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


// var staticCacheName = 'restaurant-cache-1';

// var urlToCache = [
//           '/',
//           '/index.html',
//           '/restaurant.html',
//           '/css/styles.css',
//           '/data/restaurants.json',
//           '/img/1.jpg',
//           '/img/2.jpg',
//           '/img/3.jpg',
//           '/img/4.jpg',
//           '/img/5.jpg',
//           '/img/6.jpg',
//           '/img/7.jpg',
//           '/img/8.jpg',
//           '/img/9.jpg',
//           '/img/10.jpg',
//           '/js/*',
//           '/js/dbhelper.js',
//           '/js/register_sw.js',
//           '/js/main.js',
//           '/js/restaurant_info.js',
//     ];

// self.addEventListener('install', (event) => {

//   event.waitUntil(
//     // Add cache.put to cache images on each fetch
//     caches.open(staticCacheName).then( (cache) => {
//       console.log(cache);
//       return cache.addAll(urlToCache);
  
//     }).catch(error => {
//       console.log(error);
//       });
//   );
// });

// // delete old/unused static caches
// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.filter((cacheName) => {
//           return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
//         }).map((cacheName) => {
//           return caches.delete(cacheName);
//         })
//       );
//     })
//   );
// });

//   self.addEventListener('fetch', event => {
//     evevnt.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   });



















