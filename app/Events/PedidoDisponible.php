<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Support\Facades\Log;

class PedidoDisponible implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets;

    public $pedido;

    public function __construct($pedido)
    {
        Log::info('🔥 Constructor PedidoDisponible llamado', [
            'pedido' => $pedido,
            'tipo' => gettype($pedido)
        ]);
        
        $this->pedido = $pedido;
    }

    public function broadcastOn(): array
    {
        Log::info('📡 broadcastOn() ejecutado');
        
        return [
            new Channel('pedidos-disponibles'),
        ];
    }

    public function broadcastAs(): string
    {
        Log::info('🎯 broadcastAs() ejecutado');
        return 'pedido.nuevo';
    }

    public function broadcastWith(): array
    {
        Log::info('📦 broadcastWith() ejecutado', ['data' => $this->pedido]);
        
        return [
            'pedido' => $this->pedido,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}