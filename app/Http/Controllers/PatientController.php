<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Patient;

class PatientController extends Controller
{
    public function index(Request $request){
        $patients = Patient::all();
        return response()->json([
            'patients' => $patients,
        ]);
    }

    public function store(Request $request){
        $patient = Patient::create([
            'first_name' => $request->firstName,
            'middle_name'=> $request->middleName,
            'last_name' => $request->lastName,
            'home_address' => $request->address,
            'phone_number' => $request->phoneNumber,
            'email' => $request->email
        ]);
        
        return response()->json([
            'patient' => $patient,
        ]);
    }
}
