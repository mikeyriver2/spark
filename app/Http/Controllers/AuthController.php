<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Company;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->all();
        $user = User::where('email',$data["email"])->exists();
        if($user){
            return response("Email already exists",422);
        }
        $company = Company::where('name',$data["company"])->first();
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'company_id' => $company->id,
            'name'  => $data["name"],
            'secondary_email' => $data["secondaryEmail"]
        ]);
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return $request->user();
        }else{
            return response('Wrong Credentials', 401);
        }    
    }

    public function checkUserLoggedIn(Request $request){
        return $request->user();
    }

    public function clearSession(Request $request){
        Auth::logout();
        \Session::flush();
        return redirect()->away('/');
    }
}
