<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TestController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $test_arr = array('item1' => 'Hello World');
        //return view('test.testAjax', $test_arr);
        return view('test.test_ajax');
    }

    public function testAjax() {
        $msg = "This is a simple message.";
        return response()->json(array('msg'=> $msg), 200);
    }
}
