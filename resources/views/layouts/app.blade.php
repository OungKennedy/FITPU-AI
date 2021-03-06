<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet"> 
    <style>
    body {color: #000000;}
    pp {font-size: larger; line-height: 1.6; margin-top: 2%;}
    </style>
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->
  


</head>
<body>
<div class="flex-center position-ref full-height">
<!--<div id="app" class="containe-fluid"> -->
    
    @include('layouts.header')

    <div class="container full-height" > <!-- style="min-height: 400px;"> -->
        <div class="container-fluid bg-light" style="margin: 1% ;background-color: white;">
                @yield('content')
        </div>
    </div>

    @include('layouts.footer')
</div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
