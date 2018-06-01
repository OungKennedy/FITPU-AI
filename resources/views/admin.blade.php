@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <!-- div class="panel-heading ">User Profile</div  -->
                <div class="form-group">
                    <li><a href="{{ url('/showregisteredusers') }}">{{ __('Show Reg Users') }}</a></li>
                    <br/><br/>
                </div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                        <br/><br/><br/>
                    @endif

                    <!--  $email = auth()->user()->email-->
                    @if (Auth::check())
                        {{ auth()->user()->name }},
                    @endif
                    {{ __('admin footer') }}!
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
