<?php

namespace App\Services;

use App\Models\TipoDocumento;

class TipoDocumentoService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getTipoDocumento()
    {
        $tipoDocumento = TipoDocumento::all();

        return $tipoDocumento;
    }
}
