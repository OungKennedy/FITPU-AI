/**
 * Application launcher.
 */

// start app function
function startApp(callback) {
    // gui setup
    dwv.gui.setup();

    // main application
    myapp = new dwv.App();
    // initialise the application
    var options = {
        "containerDivId": "dwv",
        "fitToWindow": true,
        "gui": ["tool", "load", "help", "undo", "version", "tags", "drawList"],
        "loaders": ["File", "Url"],
        "tools": ["Scroll", "WindowLevel", "ZoomAndPan", "Draw", "Livewire", "Filter", "Floodfill"],
        "filters": ["Threshold", "Sharpen", "Sobel"],
        "shapes": ["Arrow", "Ruler", "Protractor", "Rectangle", "Roi", "Ellipse", "FreeHand"],
        "isMobile": false,
        "helpResourcesPath": "/css/kdy-css/images/help"
    };
    myapp.init(options);
    try{
        myapp.loadURLs([imageLocation]);
    }catch(err){}
    if ( dwv.browser.hasInputDirectory() ) {
        options.loaders.splice(1, 0, "Folder");
    }
    if (callback){
        callback();
    }
    // help
    // TODO Seems accordion only works when at end...
    $("#accordion").accordion({ collapsible: "true", active: "false", heightStyle: "content" });
}

// Image decoders (for web workers)
dwv.image.decoderScripts = {
    "jpeg2000": "js/dicom_lib/decoders/decode-jpeg2000.js",
    "jpeg-lossless": "/js/dicom_lib/decoders/decode-jpegloss.js",
    "jpeg-baseline": "/js/dicom_lib/decoders/decode-jpegbaseline.js"
};

// status flags
var domContentLoaded = false;
var i18nInitialised = false;
// launch when both DOM and i18n are ready
function launchApp() {
    if ( domContentLoaded && i18nInitialised ) {
        try{
            startApp(kdyLastLoad);
            console.log('path1 taken. loastload run');
        }catch(err){
            startApp();
            console.log('path2 taken. lastload not run');
        }
        console.log('launchApp here');
    }
}

// i18n ready?
dwv.i18nOnInitialised( function () {
    //call next once the overlays are loaded
    var onLoaded = function (data) {
        dwv.gui.info.overlayMaps = data;
        i18nInitialised = true;
        launchApp();
    };
    // load overlay map info
    $.getJSON( dwv.i18nGetLocalePath("overlays.json"), onLoaded )
    .fail( function () {
        console.log("Using fallback overlays.");
        $.getJSON( dwv.i18nGetFallbackLocalePath("overlays.json"), onLoaded );
    });
});

// check browser support
dwv.browser.check();
// initialise i18n
dwv.i18nInitialise("auto", "/kdy-dwv/");

// initialise service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
            //Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            //registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// DOM ready?
$(document).ready( function() {
    domContentLoaded = true;
    launchApp();
    console.log('launched');


});