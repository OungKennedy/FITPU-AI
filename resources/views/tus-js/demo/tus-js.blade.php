<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Use tus protocol to upload</title>
    <link href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-combined.min.css" rel="stylesheet" />
    <link href="/js/tus-js-lib/demo.css" rel="stylesheet" media="screen" />
  </head>
  <body>
    <div class="container">
      <h1>Big file upload</h1>

      <p>
        We use tus protocol 
        <a href="http://tus.io/demo.html">tus.io</a> to do big file upload.
      </p>

      <div class="alert alert-warining hidden" id="support-alert">
        <b>Warning!</b> Your browser does not seem to support the features necessary to run tus-js-client. The buttons below may work but probably will fail silently.
      </div>

      <br />

      <br />

      <input type="file">

      <br />
      <br />

      <div class="row">
        <div class="span8">
          <div class="progress progress-striped progress-success">
            <div class="bar" style="width: 0%;"></div>
          </div>
        </div>
        <div class="span4">
          <button class="btn stop" id="toggle-btn">start upload</button>
        </div>
      </div>

      <hr />
      <h3>Upload List</h3>
      <p id="upload-list">
      </p>

    </div>
  </body>

  <script src="/js/tus-js-lib/jquery-2.1.4.min.js"></script>
  <script src="/js/tus-js-lib/dist/tus.js"></script>
  <script src="/js/tus-js-lib/demo.js"></script>
</html>
