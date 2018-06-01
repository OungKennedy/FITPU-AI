        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('mydate').innerHTML = h + ":" + m + ":" + s;
            var t = setTimeout(startTime, 500);
			// base function to get elements

        }
        function checkTime(i) {
            if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
            return i;
        }
		function startTime2() {
			//document.getElementById('mydate2');
			dwv.gui.getElement = dwv.gui.base.getElement;
			dwv.gui.displayProgress = function (percent) {};

			// create the dwv app
			var app = new dwv.App();
			// initialise with the id of the container div
			app.init({
				"containerDivId": "dwv"
			});
			// load dicom data
			app.loadURLs(["http://localhost/FITPU/DWV/viewers/static/data/1.dcm"]);

		}