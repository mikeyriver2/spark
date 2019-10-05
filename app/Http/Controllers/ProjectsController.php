<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Project;

class ProjectsController extends Controller
{
    public function index(Request $request){
        $projects = Project::all()->load(['pledge' => function($pledge){
            $pledge ->select('companies.name as company_name','users.name as pledger_name','pledges.*')
                    ->join('users','users.id','=','pledges.user_id')
                    ->join('companies','users.company_id','=','companies.id');
           
        }]);
        return $projects;
    }

    public function store(Request $request){
        $bannerIsSet = false;
        if(isset($_FILES['banner']['name'])){
            $bannerIsSet = true;
            $fileName = $_FILES['banner']['name'];
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $banner_stored = Storage::disk('public')->put("uploads/banners/".$fileName."",file_get_contents($request->banner));
        }else{
            $fileName = "";
        }
        
        $project = Project::create([
            "title" => $request->title,
            "description" => $request->description,
            "goal_amount" => $request->goal,
            "banner" => $bannerIsSet ? "uploads/banners/".$fileName."" : ""
        ]);

        return $project;
    }
}
