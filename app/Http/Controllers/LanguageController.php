<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller{
	//stores key value pair into session
	public function setLocale(Request $request){
		if ($request->input('locale') != \App::getLocale()){
			\Session::put('locale', $request->input('locale'));
		}
		return \Redirect::back();

	}
}