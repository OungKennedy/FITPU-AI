@extends('layouts.app')
@section('content')
    <ul>  
        <li><a href="{{ url('/userprofile') }}">{{ __('User Profile') }}</a></li>
        <li><a href="{{ url('/uploadfile') }}">{{ __('Upload Image File') }}</a></li>
        <li><a href="{{ url('/uploadlist') }}">{{ __('List Uploaded Files') }}</a></li>
        <li><a href="{{ url('/tus-js') }}">{{ __('tus upload') }}</a></li>
        <li><a href="{{ url('/posts') }}">{{ __('Posts') }}</a></li>
        <li><a href = "/dwviewer">{{__('DICOM Viewer')}}</a></li>
        <!-- <li><a href="{{ url('/todolist') }}">{{ __('To do list') }}</a></li> -->
        <li><a href="{{ url('/test') }}">{{ __('Test Everything') }}</a></li>
    </ul>
@endsection

@section('content_more')
                
         @if (session('status'))
              <div class="alert alert-success">
                  {{ session('status') }}
              </div>
         @endif 
             <!--  $email = auth()->user()->email-->
         @if (Auth::check())
             {{ auth()->user()->name }},
         @endif
             Welcome to DICOM File Uploading Web Portal!
                
@endsection
