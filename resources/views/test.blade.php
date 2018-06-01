@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <!-- div class="panel-heading ">User Profile</div -->
                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                        <br/><br/><br/>
                    @endif

                    <!--  $email = auth()->user()->email-->
                    @if (Auth::check())
                        Test Value Passing: <input type="text" name="param1" value="Hello PHP!"><br>
                        <h2>Test Page!</h2>
                        {{ phpinfo() }}
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
