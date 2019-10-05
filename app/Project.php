<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'pledge_id',
        'title',
        'description',
        'goal_amount',
        'banner'
    ];

    public function pledge(){
        return $this->hasMany('App\Pledge');
    }
}
