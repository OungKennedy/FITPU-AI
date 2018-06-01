<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
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
    public function showusers()
    {
        $users = DB::table('users')->whereNotIn('id', function($q){
            $q->select('user_id')->from('admin');})->get();

        foreach ($users as $user) {
            $profiles['id'] = $user->id;
            $profiles['email'] = $user->email;
            $profiles['email'] = $user->name;
        }
        //$max_id = DB::table('users')->select('id')->orderBy('id')->get();

        //var_dump($max_id);
        return view('showregisteredusers', compact('users'));
    }

    public function retrieve_uploads($user_id) {
        $upload_lists = DB::table('fileupload')->orderBy('id', 'desc')
            ->where('user_id', $user_id)->get();
        return view('uploadlist', compact('upload_lists'));
    }

    public function userprofile($user_id) {

        $exists = DB::table('user_profile')->orderBy('updated_at', 'desc')
            ->where('user_id', $user_id)->first();
        $title = '';
        $name = '';
        $hospital = '';
        $address = '';
        $remark = '';

        if($exists) {
            $title = $exists->title;
            $name = $exists->name;
            $hospital = $exists->hospital;
            $address = $exists->address;
            $remark = $exists->remark;
        }
        return view('userprofile_plain')
                ->with('title', $title)
                ->with('name', $name)
                ->with('hospital', $hospital)
                ->with('address', $address)
                ->with('remark', $remark);

    }
}

 