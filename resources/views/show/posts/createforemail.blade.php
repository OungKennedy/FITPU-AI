@extends ('layout.masterlayout')
@section ('Main Body')
	<h5><a href="/posts" class = "btn btn-default">Back to posts</a></h5>
		<h1>Create Post</h1>
	</div>
	<form action="{{ route('ContactUsController@post') }}" method = "POST">
		{{ csrf_field() }}
	    <div class="form-group">
			<label name='email'>Email:</label>
			<input id='email' name='email' class='form-control'>
	    </div>

	    <div class="form-group">
	    	<label name='subject'>Subject:</label>
	    	<input id = 'subject' name='subject' class='form-control'>
	    </div>

		<div class="form-group">
	    	<label name='message'>Message:</label>
	    	<input id = 'message' name='message' class='form-control'>
	    </div>


	    <input type='submit' value="Send Message"

@endsection