<?php

/**
 * Created by PhpStorm.
 * User: dj
 * Date: 22/2/18
 * Time: 3:49 PM
 */

namespace App\Http\Controllers;

use App\fileupload as file_upload;
use Illuminate\Http\Request;
//use App\Http\Requests;
//use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UploadFileController extends Controller {
    
    //protected $request;

    public function __construct()
    //public function __construct(Request $request)
    {
        $this->middleware('auth');
        //$this->$request = $request;
    }
    
    public function index(){
        return view('uploadfile');
    }

    public function displayimage($filename) {
        echo $request->filename . " " , $request->filepath;
        //return view('displayimage');

    }

    public function retrieve_uploads(Request $request) {
        $upload_lists = DB::table('fileupload')->orderBy('id', 'desc')
            ->where('user_id', auth()->user()->id)->get();
        return view('uploadlist_kdy', compact('upload_lists'));
    }

    public function showUploadFile(Request $request) {

        //if (!$this->$request->hasFile('dicom'))
        if ($request->hasFile('dicom'))
        {
            $ip_addr = $request->ip();

            $file = $request->dicom;
            $fileName = $file->getClientOriginalName();
            $fileExt = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $file->getRealPath();
            $fileMimeType = $file->getMimeType();

/*
            //Display File Name
            echo 'File Name: '.$file->getClientOriginalName();
            echo '<br>';

            //Display File Real Path
            echo 'File Real Path: '.$file->getRealPath();
            echo '<br>';

            //Display File Size
            echo 'File Size: '.$file->getSize();
            echo '<br>';

            //Display File Mime Type
            echo 'File Mime Type: '.$file->getMimeType();
*/          

            //Move Uploaded File auth()->user()->id
            $destinationPath = "uploads/" . auth()->user()->id . "/";
            if(!is_dir($destinationPath)) {
                mkdir($destinationPath);
            }
            $newfile = $destinationPath . $file->getClientOriginalName();
            if(file_exists($newfile)) {
                $newfilename = date('Y-m-d H:i:s') . "_" . $ip_addr . "-" 
                    . $file->getClientOriginalName();
            } else {
                $newfilename = $file->getClientOriginalName();
            }
            $file->move($destinationPath, $newfilename);

            //echo 'File Destination Path: '.$destinationPath;
            $data['user_id'] = auth()->user()->id;
            $data['filename'] = $newfilename;
            $data['filetype'] = $fileMimeType;
            $data['filesize'] = $fileSize;
            $data['filepath'] = $destinationPath;
            //echo gettype($data);

            //$link = tap(new App\Link($data))->save();
            $fileupload = tap(new file_upload($data))->save();

            return view('showUploadFile')
                ->with('fileName', $fileName)
                ->with('fileExt', $fileExt)
                ->with('fileSize', $fileSize)
                ->with('fileMimeType', $fileMimeType)
                ->with('fileLocation', $destinationPath);

        } else {

            //echo 'Image File is NULL';
            $fileName = "nullNULL";
            return view('showUploadFile')
                ->with('fileName', $fileName);
        }
    }
}