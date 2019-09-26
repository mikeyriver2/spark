<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Record;
use \App\Patient;

class RecordController extends Controller
{
    public function index(Request $request){
        $records = Record::select(
                'records.id',
                'records.created_at',
                \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
            )
            ->join('patients','patients.id','patient_id')->get();
        return $records;
    }

    public function store(Request $request){
        $record = Record::create([
            'patient_id' => $request->patient["id"],
            'weight' => $request->weight,
            'temperature' => $request->temperature,
            'diagnosis' => $request->diagnosis,
            'prescription' => $request->prescription,
            'type' => "General Consultation"
        ]);

        return response()->json([
            'record' => $record
        ]);
    }
}
