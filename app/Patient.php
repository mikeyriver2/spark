<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'home_address',
        'phone_number',
        'email'
    ];

    protected $appends = [
        'full_name'
    ];

    public function getFullNameAttribute(){
        $first_name = $this->attributes["first_name"];
        $middle_name = $this->attributes["first_name"];
        $last_name = $this->attributes["last_name"];

        return "".$first_name." ".$middle_name." ".$last_name."";
    }

    public function payments(){
        return $this->hasMany('App\Payment');
    }


}
