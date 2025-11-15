<?php

namespace App\Http\Controllers;

use App\Services\TipoDocumentoService;
use Illuminate\Http\Request;
use Exception;

class TipoDocumentoController extends Controller
{
    protected $tipoDocumentoService;

    public function __construct(TipoDocumentoService $tipoDocumentoService) {
        $this->tipoDocumentoService = $tipoDocumentoService;
    }

    public function list()
    {
        try{
            $tipoDocumento = $this->tipoDocumentoService->getTipoDocumento();

            return response()->json([
                "data"=> $tipoDocumento
            ]);
        }catch(Exception $e)
        {
            return response()->json([
                "Error al obtener los tipos de documento" => $e->getMessage()
            ], 500);
        }

    }
}
