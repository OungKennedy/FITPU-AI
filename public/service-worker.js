/* global self, caches, Promise */

// https://developers.google.com/web/fundamentals/primers/service-workers/
// chrome: chrome://inspect/#service-workers

var CACHE_NAME = 'dwv-jqui-cache-v1';
var urlsToCache = [
    // css
    '/css/kdy-css/style.css',
    // js
    '/js/dicom_lib/dcm_src/applauncher.js',
    '/js/dicom_lib/dcm_src/appgui.js',
    // images
    'kdy-dwv/icons/dwv-16.png',
    'kdy-dwv/icons/dwv-32.png',
    'kdy-dwv/icons/dwv-64.png',
    'kdy-dwv/icons/dwv-128.png',
    'kdy-dwv/icons/dwv-256.png',
    'css/kdy-css/images/help/click.png',
    'css/kdy-css/images/help/double_click.png',
    'css/kdy-css/images/help/mouse_drag.png',
    'css/kdy-css/images/help/mouse_wheel.png',
    // translations
    '/kdy-dwv/locales/de/translation.json',
    '/kdy-dwv/locales/en/translation.json',
    '/kdy-dwv/locales/es/translation.json',
    '/kdy-dwv/locales/fr/translation.json',
    '/kdy-dwv/locales/it/translation.json',
    '/kdy-dwv/locales/jp/translation.json',
    '/kdy-dwv/locales/ro/translation.json',
    '/kdy-dwv/locales/ru/translation.json',
    '/kdy-dwv/locales/zh/translation.json',
    // overlays
    '/kdy-dwv/locales/de/overlays.json',
    '/kdy-dwv/locales/en/overlays.json',
    '/kdy-dwv/locales/es/overlays.json',
    '/kdy-dwv/locales/fr/overlays.json',
    '/kdy-dwv/locales/it/overlays.json',
    '/kdy-dwv/locales/jp/overlays.json',
    '/kdy-dwv/locales/ro/overlays.json',
    '/kdy-dwv/locales/ru/overlays.json',
    '/kdy-dwv/locales/zh/overlays.json',

    // third party

    // css
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/jquery-ui-1.12.1.min.css',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_glass_20_555555_1x400.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_glass_40_0078a3_1x400.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_glass_40_ffc73d_1x400.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_gloss-wave_25_333333_500x100.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_highlight-soft_80_eeeeee_1x100.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_inset-soft_25_000000_1x100.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-bg_inset-soft_30_f58400_1x100.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-icons_222222_256x240.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-icons_4b8e0b_256x240.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-icons_a83300_256x240.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-icons_cccccc_256x240.png',
    'kdy-ext/ext/jquery-ui/themes/ui-darkness/images/ui-icons_ffffff_256x240.png',
    // js: dwv
    '/js/dicom_lib/newdwv.min.js',
    '/js/dicom_lib/i18next.min.js',
    '/js/dicom_lib/i18nextXHRBackend.min.js',
    '/js/dicom_lib/i18nextBrowserLanguageDetector.min.js',
    '/js/dicom_lib/jszip.min.js',
    '/js/dicom_lib/konva.min.js',
    '/js/dicom_lib/magic-wand-min.js',
    // js: viewer
    '/js/dicom_lib/jquery.min.js',
    '/kdy-ext/ext/jquery-ui/jquery-ui-1.12.1.min.js',
    '/js/dicom_lib/jquery.flot.min.js',
    // js: decoders
    '/js/dicom_lib/decoders/jpx.js',
    '/js/dicom_lib/decoders/arithmetic_decoder.js',
    '/js/dicom_lib/decoders/decode-jpeg2000.js',
    '/js/dicom_lib/decoders/util.js',
    '/js/dicom_lib/decoders/jpg.js',
    '/js/dicom_lib/decoders/decode-jpegbaseline.js',
    '/js/dicom_lib/decoders/lossless-min.js',
    '/js/dicom_lib/decoders/decode-jpegloss.js'
    ];

// install
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then( function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// fetch
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then( function (response) {
            // Cache hit - return response
            if (response) {
                console.log('Return form cache', event.request.url);
                return response;
            }
            return fetch(event.request);
        })
    );
});

// activate
self.addEventListener('activate', function (event) {

    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Delete cache: '+cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
