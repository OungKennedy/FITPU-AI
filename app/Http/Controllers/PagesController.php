<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    public function index(){
    	return view('show.welcome');
    }
    public function about(){
    	return view('show.about');
    }
    public function imaging_analytics(){
    	return view('show.tech');
    }
    public function contact(){
    	return view('show.contact');
    }
}
