<?php

use App\Http\Controllers\Api\ClienteController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RepartidorController;
use App\Http\Controllers\RepartidoresController;

Route::prefix('repartidor')->group(function () {
    Route::post('/login', [RepartidorController::class, 'login']);

    Route::middleware(['auth:repartidor'])->group(function () {
        Route::get('list', [RepartidoresController::class, 'list']);
        Route::get('prueba', [RepartidorController::class, 'show']);
        Route::get('pedidosMes', [RepartidorController::class, 'pedidoMes']);
    });
});

Route::prefix('cliente')->group(function(){
    Route::get('/verificar/{numeroDocumento}', [ClienteController::class, 'verificarCliente']);
});
