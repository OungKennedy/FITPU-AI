<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = [
        'title',
        'user_id',
        'name',
        'hospital',
        'address',
        'remark'
    ]; 

    //$data = $request->validate([
    //    'title' => 'required|max:255',
    //    'url' => 'required|url|max:255',
    //    'description' => 'required|max:255',
    //]);

    //$link = new \App\Link;
    //$link->title = $data['title'];
    //$link->url = $data['url'];
    //$link->description = $data['description'];

    // Save the model
    //$link->save();
}
