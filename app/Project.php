<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'pledge_id',
        'title',
        'description'
    ];

    public function pledge(){
        return $this->hasMany('App\Pledge');
    }
}
