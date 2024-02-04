<?php

use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('video', VideoController::class)->middleware(['auth', 'check-role']);
Route::get('test', function () {
    return 'auth';
})->middleware('auth');
