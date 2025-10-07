<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\RepartidoresController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\ZonaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('repartidores/list', [RepartidoresController::class, 'list'])->name('repartidores.list');
    Route::resource('repartidores', RepartidoresController::class);

    Route::get('zonas/list', [ZonaController::class, 'list'])->name('zona.list');
    Route::resource('zonas', ZonaController::class);

    Route::get('clientes/list', [ClienteController::class, 'list'])->name('clientes.list');
    Route::resource('clientes', ClienteController::class);

    Route::get('pedidos/list', [PedidoController::class, 'list'])->name('pedidos.list');
    Route::resource('pedidos', PedidoController::class);

    Route::get('ventas/list', [VentasController::class, 'list'])->name('ventas.list');
    Route::resource('ventas', VentasController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
