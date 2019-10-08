<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pledge;

class PledgesController extends Controller
{
    public function index (Request $request){
        $pledges = Pledge::where('user_id',$request->user()->id)->whereHas('project',function($query){
            $query->where('deleted_at',null); //query pledges whose projects have not been soft deleted
        })->with('project')->get();
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

    public function edit(Request $request){
        $pledge = Pledge::find($request->id);
        $pledge->amount = $request->amount;
        $pledge->save();
        return $pledge;
    }

    public function destory(Request $request){
        $pledge = Pledge::find($request->id);
        $pledge->delete();
        return $pledge;
    }
}
