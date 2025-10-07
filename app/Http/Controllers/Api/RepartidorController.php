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
