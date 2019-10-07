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
Route::get('companies','CompaniesController@index');
Route::get('projects','ProjectsController@index');
Route::middleware('auth:web')->group(function(){
    Route::get('check-user','AuthController@checkUserLoggedIn');
    Route::get('logout','AuthController@clearSession');
    Route::get('pledges','PledgesController@index');
    Route::post('banner_preview', "ProjectsController@previewNewBanner");
    Route::prefix('iLikeToMoveItMoveIt')->group(function(){ //add middleware in the future so only admins can access
        Route::get('companies','ProjectsController@getCompanies');
        Route::post('company','ProjectsController@storeCompany');
        Route::post('delCompany','ProjectsController@destoryCompany');

        Route::prefix('projects')->group(function(){
            Route::post('project','ProjectsController@store');
            Route::post('edit','ProjectsController@edit'); //find fix for PUT
            Route::post('delete','ProjectsController@destroy');
        });
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
