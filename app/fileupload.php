<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class fileupload extends Model
{
	public $table = "fileupload";
	
    protected $fillable = [
        'user_id',
        'filename',
        'filetype',
        'filesize',
        'filepath'
    ]; 
}
