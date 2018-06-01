@extends ('show.dicom.viewer')
@section('Main Body')
<script>

$( document ).ready(function() {
    var app = new dwv.App();
	app.init({"containerDivId": "dwv"});
	app.loadURLs(["/storage/images/DCM_images/CT-MONO2-16-ankle"]);
})

//try 2
$( document ).ready(function() {

	app.init({"containerDivId": "dwv"});

	myapp.loadURLs(["/storage/images/DCM_images/CT-MONO2-16-ankle"]);
})
</script>
@endsection

//try 3
<script>
	dwv.gui.setup();
	var myapp = new dwv.App();
    // initialise the application
    var options = {
        "containerDivId": "dwv",
        "fitToWindow": true,
        "filters": ["Threshold", "Sharpen", "Sobel"],
    };

    // myapp.init(options);
    // myapp.loadURLs(["/storage/images/DCM_images/CT-MONO2-16-ankle"]);
    
</script>