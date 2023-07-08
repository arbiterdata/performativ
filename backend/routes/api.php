<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PeopleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/people', 'App\Http\Controllers\PeopleController@index')->name('people.index');
Route::post('/people', [PeopleController::class, 'store'])->name('people.store');
Route::delete('/people/{id}', 'App\Http\Controllers\PeopleController@destroy')->name('people.destroy');
Route::put('/people/{id}', 'App\Http\Controllers\PeopleController@update')->name('people.update');


// Route::resource('people', 'PeopleController');