<?php

use Illuminate\Support\Facades\Broadcast;

// Broadcast::routes(['middleware' => ['auth']]);

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

// // Canal donde todos los autenticados pueden entrar:
// // Broadcast::channel('pedidos-disponibles', function ($user) {
// //     return $user !== null;
// // });

// // Canal privado por usuario, ejemplo:
// Broadcast::channel('pedidos.{repartidorId}', function ($user, $repartidorId) {
//     return (int) $user->id === (int) $repartidorId;
// });
