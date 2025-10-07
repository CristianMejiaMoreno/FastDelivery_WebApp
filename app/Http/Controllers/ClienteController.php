<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrearCliente;
use App\Http\Requests\EditarCliente;
use App\Models\Cliente;
use App\Services\ClienteService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class ClienteController extends Controller
{

    protected $clienteService;

    public function __construct(ClienteService $clienteService) {
        $this->clienteService = $clienteService;
    }

    public function list(Request $request)
    {
        $page = $request->input('page', 1);
        $q = $request->input('q', null);


        $clientes = $this->clienteService->getClientes($q);

        return response($clientes, 200);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('clientes/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CrearCliente $request)
    {
        try{

            $cliente = $this->clienteService->createCliente($request->validated());

            return  response($cliente, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "message"=>"Error al tratar de obtener los clientes",
                "Error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try{

            $cliente = $this->clienteService->getClienteById($id);

            return  response($cliente, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "message"=>"Error al obtener el cliente",
                "Error"=>$e->getMessage()
            ],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditarCliente $request, int $id)
    {
        try{

            $cliente = $this->clienteService->updateCliente($request->validated(),$id);

            return  response($cliente, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "message"=>"Error al actualizar el cliente",
                "Error"=>$e->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try{

            $cliente = $this->clienteService->deleteCliente($id);

            return  response(true, 200);

        }catch(Exception $e)
        {
            return response(false, 500);
        }
    }
}
