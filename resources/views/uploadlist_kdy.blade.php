@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <h1>{{ __('List Uploaded Files') }}</h1>
            @if(count($upload_lists) > 0)
                <ul>
                    @foreach($upload_lists as $upload)
                        <li>{{ __('File Name') }}: <a href="/dwviewer/{{$upload->id}} target="_blank">{{$upload->filename}}</a>
                            {{ __('Upload Time') }}: {{ $upload->created_at }}</li>
                    @endforeach
                </ul>
            @else
                <h2>no upload file yet !</h2>
            @endif            
        </div>
    </div>
@endsection
