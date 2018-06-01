@extends('layouts.app')
@section('content')
<div class = 'blog-header'>
	<h1>{{__('States') }}</h1>
</div>
<h5><a href="/dwviewer/create"  target="_blank" class = "btn btn-default">{{__('Access Viewer')}} </a></h5>
	@if(count($states)>0)
		@foreach ($states as $state)
			<div class = "well">
				<div class = "row">
					<div class = 'col-md-8 col-sm-4'>
						<img width="200" src="storage/images/state_thumbnails/{{$state->image}}">
					</div>
					<div class="col-md-8 col-sm-8">
						<h4><a href="/dwviewer/{{$state->id}}">{{$state->title}}</a></h4>
						 <small>{{$state->created_at}}{{__('by')}} {{$state->user->name}}</small>
					</div>	
				</div>
			</div>
		@endforeach
		{{$states->links()}}
	@else
		<div class="blog-post-title">
			<h4>{{__('No states found')}}</h4>
		</div>
	@endif
@endsection