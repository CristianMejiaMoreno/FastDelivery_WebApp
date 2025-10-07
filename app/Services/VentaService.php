<?php

namespace App\services;

use App\Models\Ventas;

class VentaService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getVentas($q =null)
    {
        $query = Ventas::query();

        if($q){
            $query->where(function($sub) use ($q){

                $sub->where('estado', 'LIKE', "%{$q}%")
                    ->orWhere('metodo_pago', 'LIKE', "%{$q}%")
                    ->orWhere('fecha_pago', 'LIKE', "%{$q}%");

                if(is_numeric($q))
                {
                    $sub->orWhere('pedido_id', $q);
                }
            });
        }

        return $query->paginate(15);
    }

    public function getVentaById(int $id)
    {
        $ventas = Ventas::findOrFail($id);

        return $ventas;
    }

    public function createVenta($data)
    {
        $venta = Ventas::create($data);

        return $venta;
    }

    public function updateVenta(int $id, $data)
    {
        $venta = Ventas::findOrFail($id);

        $venta->update($data);

        return $venta;
    }

    public function deleteVenta(int $id)
    {
        $venta = Ventas::findOrFail($id);

        $venta->delete();

        return true;
    }
}
