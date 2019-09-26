<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Payment; 
use App\Patient;

class PaymentController extends Controller
{
    public function index (Request $request){
        $payments = Payment::select(
            'payments.id',
            'payments.created_at',
            \DB::raw('CONCAT(patients.first_name, " ",patients.last_name) as full_name')
        )
        ->join('patients','patients.id','patient_id')->get();
        return $payments;
    }

    public function store(Request $request){
        $payment = Payment::create([
            'patient_id' => $request->patient["id"],
            'status' => $request->status,
            'amount' => $request->amount
        ]);

        return response()->json([
            'payment' => $payment
        ]);
    }

    public function quickSearchPatients(Request $request){
        $patients = Patient::where('first_name','LIKE',"%".$request->full_name."%")
                            ->orWhere('last_name','LIKE',"%".$request->full_name."%")->get();
        return $patients;
    }
}
