<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRepartidor;
use App\Services\RepartidorService;
use Exception;
use Illuminate\Http\Request;

class RepartidorController extends Controller
{

    protected $repartidorService;

    public function __construct(RepartidorService $repartidorService) {
        $this->repartidorService = $repartidorService;
    }

    public function login(LoginRepartidor $request)
    {
        try{
            return $this->repartidorService->login($request);
        }catch(Exception $e)
        {
            return response()->json($e->getMessage(), 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

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
    public function show(Request $request)
    {
        try {
            $repartidor = $request->user();

            if (!$repartidor) {
                return response()->json([
                    'error' => 'No autorizado. Token inválido o expirado.'
                ], 401);
            }

            $pedidos = $this->repartidorService->getPedidoByRepartidor($repartidor->id);

            if(!$pedidos)
            {
                return response()->json([
                    'error'=> 'No se encontraron pedidos para este repartidor'
                ], 404);
            }

            return response()->json($pedidos, 200);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ha ocurrido un error inesperado: ' . $e->getMessage()
            ], 500);
        }
    }

    public function searchPedido(Request $request)
    {
        try
        {

            if(!$request->user())
            {
                return response()->json([
                    'error'=>"No autorizado, vuelve a iniciar session. Token invalido"
                ], 401);
            }

            $codigoPedido = $request->input('codigoPedido');
            $repartidor = $request->user();

            $pedido = $this->repartidorService->getPedidobyId($codigoPedido, $repartidor->id);

            if($pedido->isEmpty())
            {
                return response()->json([
                    "error"=>"No se han encontrado con el codigo enviado para este repartidor"
                ], 404);
            }

            return response()->json([
                "data"=>$pedido
            ], 200);

        }catch(Exception $e)
        {
            return response()->json([
                'error'=>"Error desconozido, consulte al administrador"
            ], 500);
        }
    }
    public function pedidoMes(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json([
                    'error' => 'No autorizado, vuelve a iniciar sesión. Token inválido'
                ], 401);
            }

            $mes = $request->input('mes');
            $anio = $request->input('anio');
            $repartidorId = $request->user()->id;

            if (!$mes || !$anio) {
                return response()->json([
                    'error' => 'Debes enviar el mes y el año para realizar la consulta'
                ], 400);
            }

            $pedidos = $this->repartidorService->getPedidosMensual($repartidorId ,$mes, $anio);

            if ($pedidos->isEmpty()) {
                return response()->json([
                    'error' => 'No se han encontrado registros para las fechas enviadas'
                ], 404);
            }

            return response()->json([
                'data' => $pedidos
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Error desconocido al tratar de obtener los datos: ' . $e->getMessage()
            ], 500);
        }
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
