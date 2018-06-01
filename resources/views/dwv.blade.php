<!DOCTYPE html>

<html>

<head>
<title>DCM Web Viewer</title>
<meta charset="UTF-8">
<meta name="theme-color" content="#f8f9fa"/>
<link type="text/css" rel="stylesheet" href="css/styler.css">
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30="crossorigin="anonymous"></script>

<link type="text/css" rel="stylesheet" href="{{URL::asset('css/jquery-ui-1.12.1.min.css')}}"/>
<style type="text/css" >.ui-widget-content { background-color: #666; background-image: url();}</style>

<!-- Third party (dwv) -->
<script src="{{asset('js/i18next.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/i18nextXHRBackend.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/i18nextBrowserLanguageDetector.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/jszip.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/konva.min.js')}}" type="text/javascript"></script>
<script src="{{asset('js/magic-wand-min.js')}}" type="text/javascript"></script>

<!-- Third party (viewer) -->
<script src="{{asset('js/jquery.min.js')}}" type="text/javascript"></script>
<script src="{{asset('/ext/jquery-ui/jquery-ui-1.12.1.min.js')}}" type="text/javascript"></script>
<script src="{{asset('ext/flot/jquery.flot.min.js')}}" type="text/javascript"></script>
<!-- decoders -->
<script src="{{asset('js/decoders/jpx.js')}}" type="text/javascript"></script>
<script src="{{asset('js/decoders/util.js')}}" type="text/javascript"></script>
<script src="{{asset('js/decoders/arithmetic_decoder.js')}}" type="text/javascript"></script>
<script src="{{asset('js/decoders/jpg.js')}}" type="text/javascript"></script>
<script src="{{asset('js/decoders/lossless-min.js')}}" type="text/javascript"></script>
<!-- dwv -->
<script src="{{asset('js/test.min.js')}}" type="text/javascript"></script>
<!-- Launch the app -->
<script src="{{asset('dwv/src/appgui.js')}}" type="text/javascript"></script>
<script src="{{asset('dwv/src/applauncher.js')}}" type="text/javascript"></script> 


<body>

<!-- DWV -->
<div id="dwv">

<div id="pageHeader">

<!-- Title -->
<h1>DWV <span class="dwv-version"></span></h1>

<!-- Toolbar -->
<div class="toolbar"></div>
$.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
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
