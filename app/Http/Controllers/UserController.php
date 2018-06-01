<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function retrieve_last_update()
    {
        $exists = DB::table('user_profile')->orderBy('updated_at', 'desc')
        	->where('user_id', auth()->user()->id)->first();
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
        return view('userprofile')
                ->with('title', $title)
                ->with('name', $name)
                ->with('hospital', $hospital)
                ->with('address', $address)
                ->with('remark', $remark);
    }
}
