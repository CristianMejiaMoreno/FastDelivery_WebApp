<?php

namespace App\Http\Controllers;

use App\Models\Ventas;
use Illuminate\Http\Request;
use App\services\VentaService;
use Inertia\Inertia;

class VentasController extends Controller
{

    protected $ventasService;

    public function __construct(VentaService $ventasService) {
        $this->ventasService = $ventasService;
    }

    public function list(Request $request){
        $page = $request->input('page');
        $q = $request->input('q');

        $ventas = $this->ventasService->getVentas($q);

        return response()->json($ventas, 200);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ventas/index');
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
    public function show(Ventas $ventas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ventas $ventas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ventas $ventas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ventas $ventas)
    {
        //
    }
}
