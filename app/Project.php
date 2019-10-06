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

    public function getBannerAttribute($value){
        if($value == ""){
            return "uploads/banners/defaultBanner.png";
        }else{
            return $value;
        }
    }

    public function getGoalAmountAttribute($value){
        return number_format($value);
    }

    public function setGoalAmountAttribute($value)
    {
        $this->attributes['goal_amount'] = str_replace( ',', '', $value);
    }
}
