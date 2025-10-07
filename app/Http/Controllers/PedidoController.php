<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Services\PedidoService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    protected $pedidoService;

    public function __construct(PedidoService $pedidoService) {
        $this->pedidoService = $pedidoService;
    }

    public function list()
    {
        $pedidos = $this->pedidoService->getPedidos();

        return response($pedidos, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pedidos/index');
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
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
