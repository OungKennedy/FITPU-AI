@extends('layouts.app')

@section('content')

<div class="container-fluid">
    <hr>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">{{ __('Edit User Profile') }}</div>
                <div class="panel-body">
                <form class="form-horizontal"  action="/userprofile" method="post">

                @if ($errors->any())
                    info('form submit error')
                    <div class="alert alert-danger" role="alert">
                        Please fix the following errors
                    </div>
                @endif







                {!! csrf_field() !!}
                <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                    <label for="title"  class="col-md-4 control-label">  {{ __('User Title') }}</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="title" name="title" placeholder="Title" value="{{ old('title', $title) }}">
                    @if($errors->has('title'))
                        <span class="help-block"><strong>{{ $errors->first('title') }}</strong></span>
                    @endif
                </div>
                </div>

                <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                    <label for="name"  class="col-md-4 control-label"> {{ __('User Name') }}</label>
                    <div class="col-md-6">
                    <input type="text" class="form-control" id="name" name="name" placeholder="Name" value="{{ old('name', $name) }}">
                    @if($errors->has('name'))
                        <span class="help-block">{{ $errors->first('name') }}</span>
                    @endif
                </div>
                </div>


                <div class="form-group{{ $errors->has('hospital') ? ' has-error' : '' }}">
                    <label for="hospital"  class="col-md-4 control-label">{{ __('User Company/Hospital') }}</label>
                    <div class="col-md-6">
                    <textarea class="form-control" id="hospital" name="hospital" placeholder="Hospital">{{ old('hospital', $hospital) }}</textarea>
                    @if($errors->has('hospital'))
                        <span class="help-block">{{ $errors->first('hospital') }}</span>
                    @endif
                </div>
                </div>

                <div class="form-group{{ $errors->has('address') ? ' has-error' : '' }}">
                    <label for="address"  class="col-md-4 control-label">{{ __('User Address') }}</label>                 
                     <div class="col-md-6">
                    <textarea class="form-control" id="address" name="address" placeholder="Address">{{ old('address', $address) }}</textarea>
                    @if($errors->has('address'))
                        <span class="help-block">{{ $errors->first('address') }}</span>
                    @endif
                </div>
                </div>

                <div class="form-group{{ $errors->has('remark') ? ' has-error' : '' }}">
                    <label for="remark"  class="col-md-4 control-label">{{ __('User Remark') }}</label>                   
                    <div class="col-md-6">
                    <textarea class="form-control" id="remark" name="remark" placeholder="Remark">{{ old('remark', $remark) }}</textarea>
                    @if($errors->has('remark'))
                        <span class="help-block">{{ $errors->first('remark') }}</span>
                    @endif
                </div>
                </div>

                <div class="form-group">
                    <div class="col-md-8 col-md-offset-4">
                    <button type="submit" class="btn btn-primary">
                    {{ __('User Submit') }}
                    </button>
                </div>
                </div>

            </form></div>
        </div></div></div></div>
@endsection
