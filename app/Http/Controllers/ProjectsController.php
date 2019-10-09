<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Project;
use Carbon\Carbon;

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

    public function edit(Request $request){
        $bannerIsSet = false;
        if(isset($_FILES['banner']['name'])){
            $bannerIsSet = true;
            $fileName = $_FILES['banner']['name'];
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $banner_stored = Storage::disk('public')->put("uploads/banners/".$fileName."",file_get_contents($request->banner));
        }else{
            $fileName = "";
        }

        if($request->banner == ""){
            $bannerIsSet = false;
        }
        
        $project = Project::find($request->project_id);
        $project->update([
            "title" => $request->title,
            "description" => $request->description,
            "goal_amount" => $request->goal,
            "banner" => $bannerIsSet ? "uploads/banners/".$fileName."" : $project->banner
        ]);

        return $project;
    }

    public function previewNewBanner(Request $request){
        $bannerIsSet = false;
        if(isset($_FILES['banner']['name'])){
            $bannerIsSet = true;
            $fileName = $_FILES['banner']['name'];
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $banner_stored = Storage::disk('public')->put("uploads/banners/".$fileName."",file_get_contents($request->banner));
        }else{
            $fileName = "";
        }

        return response()->json([
            "img_loc" => "uploads/banners/".$fileName.""
        ]);
    }

    public function destroy(Request $request){ //soft_delete only
        $project = Project::find($request->projectId);
        $project->deleted_at = Carbon::now();
        $project->save();
        return "(soft) delete successful";
    }

    public function getCompanies(Request $request){
        $users = \App\User::orderBy('id','desc')->where('type','!=','admin')->get()->load('company');
        $companies = \App\Company::select(
                                'companies.*',
                                \DB::raw('(CASE WHEN users.id IS NULL THEN 1 ELSE 0 END) as deletable')
                            )
                            ->leftjoin('users','users.company_id','=','companies.id')
                            ->groupBy('id')
                            ->get();
        
        return response()->json([
            "users" => $users,
            "companies" => $companies
        ]);
    }

    public function storeCompany(Request $request){
        $company = \App\Company::create([
            "name" => $request->name
        ]);

        return $company;
    }

    public function destoryCompany(Request $request){
        $company = \App\Company::find($request->company_id);
        $company->delete();
        return "Deleted ".$company->name."";
    }
}
