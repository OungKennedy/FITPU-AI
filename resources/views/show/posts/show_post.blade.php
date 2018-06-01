@extends ('layout.masterlayout')
@section ('Main Body')
	<h5><a href="/posts" class = "btn btn-default">Back to posts</a></h5>
	<h3>{{$post->title}}</h3>
	<img style="width:100%" src="/storage/images/{{$post->image}}">
	<br><br>
	<div class="blog-post">
		<p>
			{!!$post->body!!}</div>
		</p>
	<div class="blog-footer">
		<hr>
			<small>Written on: {{$post->created_at}} by {{$post->user->name}}</small>
		<hr>
		<!--disable guests from del and editing posts-->
		@if(!Auth::guest())
			<!--let users del and edit only their own post-->
			@if(Auth::user()->id==$post->user_id)
				<a href='/posts/{{$post->id}}/edit' class='btn btn-default'>Edit</a>
				{!!Form::open(['action'=>['PostsController@destroy', $post->id], 'method'=>'POST', 'class'=>'pull-right'])!!}
					{{Form::hidden('_method','DELETE')}}
					{{Form::submit('Delete',['class'=>'btn btn-danger'])}}
				{!!Form::close()!!}
			@endif
		@endif

	</div>

@endsection