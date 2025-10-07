<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrearRepartidor;
use App\Http\Requests\EditarRepartidor;
use App\Models\Repartidores;
use App\Services\RepartidorService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RepartidoresController extends Controller
{

    protected $repartidorService;

    public function __construct(RepartidorService $repartidorService) {
        $this->repartidorService = $repartidorService;
    }

    /**
     * Display a listing of the resource.
     */

    public function list(Request $request)
    {
        $page = $request->input('page', 1);
        $q    = $request->input('q', null);

        $repartidores = $this->repartidorService->getRepartidores($q);

        return response()->json($repartidores, 200);
    }


    public function index()
    {
        return Inertia::render('repartidores/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CrearRepartidor $request)
    {
        try
        {
            $repartidor = $this->repartidorService->createRepartidor($request->validated());

            return response()->json($repartidor, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "Error al crear cliente"=>$e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try
        {
            $repartidor = $this->repartidorService->getRepartidorById($id);

            return response()->json($repartidor, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "Cliente no encontrado"=>$e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditarRepartidor $request, int $id)
    {
        try{
            $repartidor = $this->repartidorService->updateRepartidor($request->validated(), $id);

            return response()->json($repartidor, 200);

        }catch(Exception $e)
        {
            return response()->json([
                "Error al tratar de actualizar el cliente"=>$e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try{
            $repartidor = $this->repartidorService->deleteRepartidor($id);

            return response()->json(true, 200);

        }catch(Exception $e){

            return response()->json(false, 500);
        }
    }
}
