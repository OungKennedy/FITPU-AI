@extends ('layout.masterlayout')
@section ('Main Body')
	<h5><a href="/posts" class = "btn btn-default">Back to posts</a></h5>
	<div class = 'blog-header'>
		<h1>Edit Post</h1>
	</div>
	{!! Form::open(['action' => ['PostsController@update', $post->id ], 'method' => 'POST','enctype'=>'multipart/form-data']) !!}
	    <div class="form-group">
	    	{{Form::label('title','Title')}}
	    	{{Form::text('title', $post->title, ['class'=>'form-control','placeholder'=>'Title'])}}
	    </div>
	    <div class="form-group">
	    	{{Form::label('body','Body')}}
	    	{{Form::textarea('body', $post->body, ['id'=>'article-ckeditor','class'=>'form-control ckeditor','placeholder'=>'Post content'])}}
	    <div class="form-group">
	    	{{Form::file('image')}}
	    </div>
	    </div>
	    {{Form::hidden('_method','PUT')}}
	    {{Form::submit('Submit', ['class'=>'btn btn-primary'])}}
	{!! Form::close() !!}

@endsection