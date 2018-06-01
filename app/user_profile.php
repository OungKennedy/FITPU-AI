<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_profile extends Model
{
	public $table = "user_profile";
	
    protected $fillable = [
        'title',
        'user_id',
        'name',
        'hospital',
        'address',
        'remark'
    ]; 
}
