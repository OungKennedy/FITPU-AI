@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <h1>{{$name}} {{ __('User Profile') }}</h1>
            <form >
                @if(empty($title))
                <div>
                    <label >{{ __('No profile input') }}!</label>
                </div>
                @else
                <div>
                    <label >{{ __('User Title') }}: </label><label >{{$title}}</label>
                    <label >{{ __('User Company/Hospital') }}: </label><label >{{$hospital}}</label>
                    <label >{{ __('User Address') }}: </label><label >{{$address}}</label>
                </div>
                @endif
            </form>
        </div>
    </div>
@endsection
