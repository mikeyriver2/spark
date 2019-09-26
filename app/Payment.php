<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'status',
        'amount',
        'patient_id' 
    ];

    public function patient(){
        return $this->belongsTo('App\Patient');
    }
}
