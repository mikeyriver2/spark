<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->all();
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'company_id' => 1
        ]);
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Authentication passed...
            return $request->user();
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
