<?php

use App\Http\Controllers\SeatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('seats', [SeatController::class, 'index']);
Route::post('/seats/{seat}/purchase', [SeatController::class, 'purchase']);
Route::post('/seats/{seat}/cancel', [SeatController::class, 'cancel']);
