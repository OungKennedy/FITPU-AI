@extends('layouts.app')
@section('content')


<h2>
{{ __('medical_imaging_analytics.Medical Imaging Analytics') }}</h2>

<hr>

<div class="container-fluid">

		<h4>	<span class="label label-primary">MItalytics

		</span></h4>  <pp>{{ __('medical_imaging_analytics.Body 1') }} </pp>	
<div class="jumbotron">
	<h4>  {{ __('medical_imaging_analytics.Main List 1')}}</h4>
	<ul style = 'list-style-type: circle;'>
		<li> {!! __('medical_imaging_analytics.Sub List 1-1', ['New'=>'<strong>New</strong>','新'=>'<strong>新</strong>'])!!}</li>
		<li>{!! __('medical_imaging_analytics.Sub List 1-2',['Comprehensive'=>'<strong>Comprehensive</strong>','全面'=>'<strong>全面</strong>'])!!} </li>
		<li>{!! __('medical_imaging_analytics.Sub List 1-3',['Fast'=>'<strong>Fast</strong>','高效'=>'<strong>高效</strong>'])!!}</li>

	</ul>

	<h4>{{ __('medical_imaging_analytics.Main List 2') }}</h4>
	<ul>
		<li>{{ __('medical_imaging_analytics.Sub List 2-1')}}</li>
		<li>{{ __('medical_imaging_analytics.Sub List 2-2')}}</li>
		<li>{{ __('medical_imaging_analytics.Sub List 2-3')}}</li>
		<li>{{ __('medical_imaging_analytics.Sub List 2-4')}}</li>
	</ul>	
</div>
</div>


@endsection
