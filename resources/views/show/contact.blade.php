@extends ('layout.masterlayout')

@section ('Main Body') 
<div class = "container">
	<h3>Contact Us</h3>
</div>
	{!! Form::open(['action' => 'ContactUsController@store', 'method' => 'POST','enctype'=>'multipart/form-data']) !!}	
		{{csrf_field()}}
	    <div class="form-group">
	    	{{Form::label('name','Your Name')}}
	    	{{Form::text('name', '', ['class'=>'form-control','placeholder'=>''])}}
	    </div>
	    <div class="form-group">
	    	{{Form::label('email','Your Email')}}
	    	{{Form::text('email', '', ['class'=>'form-control','placeholder'=>''])}}
	    </div>
	   <div class="form-group">
	    	{{Form::label('subject','Subject')}}
	    	{{Form::text('subject', '', ['class'=>'form-control','placeholder'=>''])}}
	    </div>
	    <div class="form-group">
	    	{{Form::label('message','Your message')}}
	    	{{Form::textarea('message', '', ['class'=>'form-control','placeholder'=>''])}}
	    </div>
	    {{Form::submit('Submit', ['class'=>'btn btn-primary'])}}
	{!! Form::close() !!}

@endsection