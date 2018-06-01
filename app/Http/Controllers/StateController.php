<?php

namespace App\Http\Controllers;

use Request;
use Auth;
use Storage;
use App\State;
use App\fileupload;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //only allow signed in users to access viewer page. Redirect guests to login page, with error message
        if (Auth::guest()){
            return redirect('/login')->with('error',__('Users Only'));
        }
        else{
            $states = State::orderBy('created_at','desc')->paginate(5);
            return view('show.state_index')->with('states',$states);
        }
    }


    public function savestate(request $request)
    {
        //storing states in storage
        //create unique filename for states
        $filename = Request::input('statename').'_'.time().'.json';
        //store states in Storage/App
        Storage::put($filename, json_encode(Request::input('statefile')));

        //Storing thumbnail of accompanying dicom file as png file
        if(Request::has('base64data')){
            //create filename 
            $imageName = Request::input('statename').'_'.time().'.png';
            //upload image
            $base64string = Request::input('base64data');
            //convert base64 to binary data
            $image = base64_decode($base64string);
            //set file destination to /storage/app/public/images/state_thumbnails
            $path = public_path()."/storage/images/state_thumbnails/".$imageName;
            //save files
            file_put_contents($path,$image);
        }else{
            //set fallback image
            $imageName = 'noimage.jpg';
        }

        //Create new entry in 'states' database
        $state = new State;
        $state->user_id = auth()->user()->id;
        $state->title = Request::input('statename');
        $state->DCM_state = json_encode(Request::input('statefile'));
        $state->image = $imageName;
        $state->save();
        return redirect('/dwviewer')->with('success',__('state saved'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('show.dicom.viewer_knd');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $imageDetails = fileupload::find($id);
        return view('show.dicom.uploadviewer_knd')->with('imageDetails',$imageDetails);
        // $state = State::find($id);
        // $fileURL = DB::table('fileUpload')->where('')
        // return view('show.dicom.states.show_state')->with('state',$state);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
