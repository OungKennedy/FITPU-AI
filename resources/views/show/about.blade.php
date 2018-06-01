@extends('layouts.app')
@section('content')

	<h2> {{ __('About FITPU') }}</h2>
<hr>
	<div class='container-fluid'>
	<pp>	{!! __('about.About Body')!!}</pp>
		</div>


		<h2>Meet the team</h2>

<div class=' container-fluid' style="margin: 2% 10%">

		<div class="row">

<div class="row">
  <div class="col-xs-6 col-md-4">
    <a href="#" class="thumbnail">
      <img src="storage/images/pp3.png" alt="mr.bean" style="width:50%;">
    </a>
      <div class="container-fluid">
        <h4>Dr.HOU Zujun</h4>
        <p class="title">CEO &amp; Founder</p>
        <p>{{ __('about.Company Leadership Body')}}</p>
        <p>example@example.com</p>
      </div>
  </div>


  <div class="col-xs-6 col-md-4">
    <a href="#" class="thumbnail">
      <img src="storage/images/pp3.png" alt="mr.bean" style="width:50%;">
    </a>
      <div class="container-fluid">
        <h4>Dr.KOH Tong San </h4>
        <p class="title">Co-founder &amp; Technical Advisor</p>
        <p>Associate Professor. Centre for Quantitative Medicine. Duke-NUS Medical School. National University of Singapore </p>
        <p>example@example.com</p>
      </div>
  </div>

    <div class="col-xs-6 col-md-4">
    <a href="#" class="thumbnail">
      <img src="storage/images/pp3.png" alt="mr.bean" style="width:50%;">
    </a>
      <div class="container-fluid">
        <h4>Mr.ZHENG Zehui</h4>
        <p class="title">Business Partner</p>
        <p>CEO, XXX company</p>
        <p>example@example.com</p>

      </div>
  </div>
</div>

</div>
</div>

@endsection

