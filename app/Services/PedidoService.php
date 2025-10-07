<?php

namespace App\Services;

use App\Models\Pedido;

class PedidoService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getPedidos($q = null)
    {

        $query = Pedido::with(['cliente', 'repartidor', 'zona']);

        if ($q) {
            $query->where(function($sub) use ($q) {
                $sub->where('codigo_pedido', 'LIKE', "%{$q}%")
                    ->orWhere('fecha_pedido', 'LIKE', "%{$q}%")
                    ->orWhere('fecha_entrega', 'LIKE', "%{$q}%")
                    ->orWhere('estado', 'LIKE', "%{$q}%");

                if (is_numeric($q)) {
                    $sub->orWhere('cliente_id', $q)
                        ->orWhere('repartidor_id', $q)
                        ->orWhere('zona_id', $q);
                }
            });
        }


        return $query->paginate(15);
    }

    public function  getPedidoById(int $id)
    {
        $pedido = Pedido::findOrFail($id);

        return $pedido;
    }

    public function createPedido($data)
    {
        $pedido = Pedido::create($data);

        return $pedido;
    }

    public function updatePedido(int $id, $data)
    {
        $pedido = Pedido::findOrFail($id);

        $pedido->update($data);

        return $pedido;
    }

    public function deletePedido(int $id)
    {
        $pedido = Pedido::findOrFail($id);

        $pedido->delete();

        return true;
    }
}
