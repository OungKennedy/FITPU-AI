<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\ContactUs;

use Mail;
class ContactUsController extends Controller


{
	    /**
     * Display a listing of the resource.
     *
     * 
     */
    public function index()
    {
        return view('show.contact');
    }


     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\eRquest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name'=>'required',
            'email'=>'required',
            'subject'=>'required',
            'message'=>'required',
        ]);
        //Mail message
        $data = array(
            'name'=>$request->name,
            'email'=>$request->email,
            'subject'=>$request->subject,
            'bodyMessage'=>$request->message
        );
        Mail::send('emails.contactEmail', $data, function($message) use ($data){
            $message->from($data['email']);
            $message->to('oungkennedy@gmail.com');
            $message->subject($data['subject']);
        });
        /*
       //Create Message
        $contact_message = new ContactUs;
        $contact_message->name=$request->input('name');
        $contact_message->email=$request->input('email');
        $contact_message->subject=$request->input('subject');
        $contact_message->message=$request->input('message');
        $contact_message->save();
        */


        return redirect('/contact')->with('success','Message Sent');

    }

}
