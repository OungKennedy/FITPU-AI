<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\fileupload as file_upload;


class TusUploadController extends Controller
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
    public function upload_parameters(Request $request)
    {
        //dd( $request->all());  // you should see all of your ajax passed values
        //return response()->json(['success'=>'AJAX.']);
        //info("TusUploadController@upload_parameters " . $request->all());
        //info(json_decode($request->getContent(), true));
        $fileinfo = json_decode($request->getContent(), true);
        //foreach ($arr as $k=>$v){
        //    info($v); // etc.
        //}
        info($fileinfo['filename'] . " " . $fileinfo['filesize'] . " " . $fileinfo['fileid']);

        $data['user_id'] = auth()->user()->id;
        $data['filename'] = $fileinfo['filename'];
        $data['filetype'] = "DICOM";
        $data['filesize'] = $fileinfo['filesize'];
        $data['filepath'] = "uploads/tus_server/tus-node-server/files/" . $fileinfo['fileid'];

        $fileupload = tap(new file_upload($data))->save();

        $msg = "Laravel received TUS parameters";
        return response()->json(array('msg'=> $msg), 200);
    }

}