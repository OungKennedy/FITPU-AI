<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    // Table name
    protected $table = 'states';
    // Primary Key
    public $primaryKey = 'id';
    // Timestamps 
    public $timestamps = true;
	//Assigning ownership of state to user
    public function user(){
    	return $this->belongsTo('App\User');
    }
}
