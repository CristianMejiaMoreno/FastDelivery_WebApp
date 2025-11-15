<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ClienteService;
use Exception;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    protected $clienteService;

    public function __construct(ClienteService $clienteService) {
        $this->clienteService = $clienteService;
    }

    public function verificarCliente(int $numDocumento)
    {
        try{

            $cliente = $this->clienteService->getClienteByNumDocumento($numDocumento);

            if(!$cliente)
            {
                return response()->json([
                    'error'=>'No existe registros con el numero de documento enviado'
                ], 404);
            }

            return response($cliente, 200);

        }catch(Exception $e){
            return response()->json([
                'error'=>'Ha ocurrido un error desconocido, Comunicate con un administrador'
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
