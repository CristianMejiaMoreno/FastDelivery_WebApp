<?php

namespace App\Services;

use App\Models\Cliente;
class ClienteService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getClientes($q = null)
    {
        $query = Cliente::with("tipo_documento");

        if($q){
            $query->where(function($sub) use ($q){
                $sub->where('nombre_cliente',  'LIKE', "%{$q}%")
                ->orWhere('numero_documento', 'LIKE', "%{$q}%");
            });
        }

        return $query->paginate(15);
    }

    public function getClienteById(int $id)
    {
        $cliente = Cliente::findOrFail($id);

        return $cliente;
    }

    public function createCliente($data)
    {
        $cliente = Cliente::create($data);

        return $cliente;
    }

    public function updateCliente($data, int $id)
    {
        $cliente = Cliente::findOrFail($id);

        $cliente->update($data);

        return $cliente;
    }

    public function deleteCliente(int $id)
    {
        $cliente = Cliente::findOrFail($id);

        $cliente->delete();

        return true;
    }

    public function getClienteByNumDocumento($numDocumento)
    {
        $cliente = Cliente::where('numero_documento', '=', $numDocumento)->first();

        return $cliente;
    }

}
