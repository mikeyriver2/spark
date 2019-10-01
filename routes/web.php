<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::post('login-user','AuthController@login');
Route::post('register-user','AuthController@register');

Route::middleware('auth:web','logUserAction')->group(function(){
    Route::get('check-user','AuthController@checkUserLoggedIn');
    Route::get('logout','AuthController@clearSession');
    
    Route::prefix('dashboard')->group(function(){
        
    });
});

Route::get('/', function () {
    return view('app');
});

Route::get('{any}', function () {
    return view('app');
});

Route::post('pledge','PledgesController@store');
Route::get('/home', 'HomeController@index')->name('home');
