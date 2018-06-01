@extends('layouts.app')
@section('content')

	<h5><a href="/posts" class = "btn btn-default">Back to posts</a></h5>
	<div class = 'blog-header'>
		<h1>Create Post</h1>
	</div>
	{!! Form::open(['action' => 'PostsController@store', 'method' => 'POST','enctype'=>'multipart/form-data']) !!}	
	    <div class="form-group">
	    	{{Form::label('title','Title')}}
	    	{{Form::text('title', '', ['class'=>'form-control','placeholder'=>'Title'])}}
	    </div>
	    <div class="form-group">
	    	{{Form::label('body','Body')}}
	    	{{Form::textarea('body', '', ['id'=>'article-ckeditor','class'=>'form-control ckeditor','placeholder'=>'Post content'])}}
	    </div>
	    <div class="form-group">
	    	{{Form::file('image')}}
	    </div>
	    {{Form::submit('Submit', ['class'=>'btn btn-primary'])}}
	{!! Form::close() !!}

@endsection