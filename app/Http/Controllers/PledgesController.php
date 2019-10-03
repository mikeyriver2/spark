<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pledge;

class PledgesController extends Controller
{
    public function index (Request $request){
        $pledges = Pledge::where('user_id',$request->user()->id)->with('project')->get();
        return $pledges;
    }

    public function store(Request $request){
        $pledge = Pledge::create([
            'amount'    => $request->amount,
            'user_id'   => $request->user()->id,
            'project_id' => $request->project["id"]
        ]);   
        
        return $pledge;
    }
}
