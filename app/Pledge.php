<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pledge extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'project_id'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
