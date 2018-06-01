@extends('layouts.app')

@section('content')
<div class = 'blog-header'>
	<h1>Posts</h1>
</div>
<h5><a href="/posts/create" class = "btn btn-default">Make a new post</a></h5>
	@if(count($posts)>0)
		@foreach ($posts as $post)
			<div class ="well">
				<div class='row'>
					<div class='col-md-4 col-sm-4'>
						<img style="width:100%" src="/storage/images/{{$post->image}}">
					</div>
					<div class="col-md-8 col-sm-8">
						<h4><a href="/posts/{{$post->id}}">{{$post->title}}</a></h4>
						<small>Written on {{$post->created_at}} by {{$post->user->name}}</small>
					</div>
				</div>
			</div>
		@endforeach
		{{$posts->links()}}
	@else
		<div class="blog-post-title">
			<h4>No posts found</h4>
		</div>
	@endif

@endsection
