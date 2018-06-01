<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;

class HomeController extends Controller
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
        $is_admin = \DB::table('admin')->where('user_id', '=', auth()->user()->id)->get();
        if (count($is_admin)) {
            return view('admin');
        } else {
            return view('home');
        }
    }

    public function todolist(Request $request)
    {
        //dd( $request->all());  // you should see all of your ajax passed values
        return view('todolist');
    }

    public function fileUpload(Request $request)
    {
        $this->validate($request, [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        
        $image = $request->file('image');

        $input['imagename'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('/images');

        $image->move($destinationPath, $input['imagename']);

        $this->postImage->add($input);

        return back()->with('success','Image Upload successful');
    }
}
