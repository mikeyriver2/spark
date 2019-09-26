<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = [
        'patient_id',
        'weight',
        'temperature',
        'diagnosis',
        'prescription',
        'type'
    ];
}
