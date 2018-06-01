<!DOCTYPE html>
{{-- for load state --}}
<html>

<head>
<title>FITPU Healthcare- A medical imaging analytics startup</title>
<meta charset="UTF-8">
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="theme-color" content="#f8f9fa"/>
<link type="text/css" rel="stylesheet" href="{{URL::asset('css/kdy-css/style.css')}}">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<link type="text/css" rel="stylesheet" href="{{URL::asset('css/kdy-css/jquery-ui-1.12.1.min.css')}}"/>
<style type="text/css" >.ui-widget-content { background-color: #666; background-image: url();}</style>

<!-- Third party (dwv) -->
<script src="{{asset('js/dicom_lib/i18next.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/i18nextXHRBackend.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/i18nextBrowserLanguageDetector.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/jszip.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/konva.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/magic-wand-min.js')}}" type="text/javascript"></script>

<!-- Third party (viewer) -->
<script src="{{asset('js/dicom_lib/jquery.min.js')}}" type="text/javascript"></script>
<script src="{{asset('kdy-ext/ext/jquery-ui/jquery-ui-1.12.1.min.js')}}" type="text/javascript"></script>
<script src="{{asset('kdy-ext/ext/flot/jquery.flot.min.js')}}" type="text/javascript"></script>
<!-- decoders -->
<script src="{{asset('js/dicom_lib/decoders/jpx.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/decoders/util.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/decoders/arithmetic_decoder.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/decoders/jpg.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/decoders/lossless-min.js')}}" type="text/javascript"></script>
<!-- dwv -->
<!--dwv.min.js altered and renamed as newdwv.min.js-->
<script src="{{asset('js/dicom_lib/newdwv.min.js')}}" type="text/javascript"></script>
<!-- Launch the app -->
<script src="{{asset('js/dicom_lib/dcm_src/appgui.js')}}" type="text/javascript"></script>
<script src="{{asset('js/dicom_lib/dcm_src/applauncher.js')}}" type="text/javascript"></script> 
</head>
<body>
<script type="text/javascript">
//function to be loaded after app initialization
//get state info from database
var imagePath = '{{$imageDetails->filepath}}'

function kdyLastLoad(){
    function kdyLoadImage(callback){
        //load dicom image from storage
        myapp.loadURLs([imagePath]);
        if (callback){
            callback();
        }
    };
    function kdyState(){
        //preparing state data 
        function kdyLoadState(callback){
            state = new dwv.State(self);
            stateStringKdy = JSON.stringify(stateKdy);
            stateData = state.fromJSON(stateStringKdy);
            callback()
        };
        //applying state data
        function kdyApplyState(){
            //function to wait for ViewController to be initialised
            function kdyWait(){
                if (myapp.getViewController()){
                    state.apply(myapp,stateData);
                }else{
                    setTimeout(kdyWait,1000);
                }
            }
            kdyWait();
        }
        kdyLoadState(kdyApplyState);
    }
    if (stateKdy){
        kdyLoadImage(kdyState);
    }else{
        kdyLoadImage();
        console.log('image only loaded');
    }
}
</script>


<!-- DWV -->
<div id="dwv">

<div id="pageHeader">

<!-- Title -->
<h1>DWV <span class="dwv-version"></span></h1>

<!-- Toolbar -->
<div class="toolbar"></div>

</div><!-- /pageHeader -->

<div id="pageMain">

<!-- Open file -->
<div class="openData" title="File">
<div class="loaderlist"></div>
<div id="progressbar"></div>
</div>

<!-- Toolbox -->
<div class="toolList" title="Toolbox"></div>

<!-- History -->
<div class="history" title="History"></div>

<!-- Tags -->
<div class="tags" title="Tags"></div>

<!-- DrawList -->
<div class="drawList" title="Draw list"></div>

<!-- Help -->
<div class="help" title="Help"></div>

<!-- Layer Container -->
<div class="layerDialog" title="Image">
<div class="dropBox"></div>
<div class="layerContainer">
<canvas class="imageLayer">Only for HTML5 compatible browsers...</canvas>
<div class="drawDiv"></div>
<div class="infoLayer">
<div class="infotl"></div>
<div class="infotc"></div>
<div class="infotr"></div>
<div class="infocl"></div>
<div class="infocr"></div>
<div class="infobl"></div>
<div class="infobc"></div>
<div class="infobr" style="bottom: 64px;"></div>
<div class="plot"></div>
</div><!-- /infoLayer -->
</div><!-- /layerContainer -->
</div><!-- /layerDialog -->



</div><!-- /pageMain -->

</div><!-- /dwv -->

</body>
</html>
