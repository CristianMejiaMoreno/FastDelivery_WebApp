<?php

namespace App\Http\Controllers;

use App\Models\Zona;
use App\Services\ZonaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ZonaController extends Controller
{

    protected $zonaService;

    public function __construct(ZonaService $zonaService) {
        $this->zonaService = $zonaService; 
    }
    

    public function list()
    {
        $zona = $this->zonaService->getZonas();

        return response($zona, 200);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('zonas/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
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
    public function show(Zona $Zona)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Zona $Zona)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zona $Zona)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zona $Zona)
    {
        //
    }
}
