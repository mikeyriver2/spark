<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;

class ProjectsController extends Controller
{
    public function index(Request $request){
        $projects = Project::all()->load('pledge');
        return $projects;
    }
}
