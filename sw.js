importScripts('/cache-polyfill.js');
var staticCacheName = 'restaurant-cahce-01';
// var CACHE_NAME = 'my-site-cache-v1';

var urlsToCache = [
                    '/',
                    './restaurant.html',
                    './css/styles.css',
                    './data/restaurants.json',
                    './js/restaurant_info.js',
                    './js/dbhelper.js',
                    './js/main.js',
                    './img/1.jpg',
                    './img/2.jpg',
                    './img/3.jpg',
                    './img/4.jpg',
                    './img/5.jpg',
                    './img/6.jpg',
                    './img/7.jpg',
                    './img/8.jpg',
                    './img/9.jpg',
                    './img/10.jpg',
];

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('staticCacheName').then(function(cache) { //    caches.open(CACHE_NAME)
      return cache.addAll(urlsToCache);
   })
 );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {

  console.log(event.request.url);

    event.respondWith(

      caches.match(event.request).then(function(response) {
          // the || mark is a replacement of an if statment
        return response || fetch(event.request);

      })

    );
});
