<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pledge;

class PledgesController extends Controller
{
    public function store(Request $request){
        $pledge = Pledge::create([
            'amount'    => $request->amount,
            'user_id'   => $request->user()->id,
            'project_id' => 1
        ]);   
        
        return $pledge;
    }
}
