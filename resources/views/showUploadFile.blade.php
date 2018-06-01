
@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            @if($fileName == 'nullNULL')
                <h1>File Upload Error!</h1>
            @else
            
            <h1>File Upload Success!</h1>
            <form >
                @if ($errors->any())
                    info('form submit error')
                    <div class="alert alert-danger" role="alert">
                        Please fix the following errors
                    </div>
                @endif

                {!! csrf_field() !!}
                
                @if(isset($fileName))
                    <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                        <label for="title">File Name:    {{$fileName}}</label> <br/>
                    </div>
                @endif

                @if(isset($fileSize))
                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                        <label for="title">File Size:   {{$fileSize}}</label> <br/>
                    </div>
                @endif

                @if(isset($fileMimeType))
                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                        <label for="title">File Mime Type:   {{$fileMimeType}}</label> <br/>
                    </div>
                @endif

                @if(isset($fileLocation))
                    <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                        <label for="title">File Location:   {{$fileLocation}}</label> <br/>
                    </div>
                @endif
            @endif

            </form>
        </div>
    </div>
@endsection
