@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <form action="/uploadfile" method="post" enctype="multipart/form-data">

            {!! csrf_field() !!}

            <div class="form-group">
                <label for="exampleInputFile">DICOM {{ __('Image') }}</label>
                <input type="file" class="form-control-file" name="dicom">
            </div>
            <button type="submit" class="btn-primary">{{ __('User Submit') }}</button>
        </form>
    </div>
</div>
@endsection
