<?php

namespace App\Services;

use App\Models\Zona;

class ZonaService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getZonas()
    {
        $zonas = Zona::paginate(15);

        return $zonas;
    }

    public function getZonaById(int $id)
    {
        $zona = Zona::findOrFail($id);

        return $zona;
    }

    public function createZona($data){
        $zona = Zona::create($data);

        return $zona;
    }

    public function updateZona($data, $id)
    {
        $zona = Zona::findOrFail($id);

        $zona->update($data);

        return $zona;
    }

    public function deleteZona(int $id)
    {
        $zona = Zona::findOrFail($id);

        $zona->delete();

        return true;
    }
}
