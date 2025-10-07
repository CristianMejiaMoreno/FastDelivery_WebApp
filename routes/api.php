<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RepartidorController;
use App\Http\Controllers\RepartidoresController;

Route::prefix('repartidor')->group(function () {
    Route::post('/login', [RepartidorController::class, 'login']);

    Route::middleware(['auth:repartidor'])->group(function () {
        Route::get('list', [RepartidoresController::class, 'list']);
    });
});
