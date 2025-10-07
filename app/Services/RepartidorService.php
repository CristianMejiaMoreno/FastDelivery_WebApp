<?php

namespace App\Services;

use App\Models\Repartidores;
use Illuminate\Support\Facades\Hash;


class RepartidorService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getRepartidores($q = null)
    {
        $query = Repartidores::with('tipo_documento');

        if ($q) {
            $query->where(function($sub) use ($q) {
                $sub->where('nombre', 'LIKE', "%{$q}%")
                    ->orWhere('apellido', 'LIKE', "%{$q}%")
                    ->orWhere('numero_documento', 'LIKE', "{$q}")
                    ->orWhere('email', 'LIKE', "%{$q}%")
                    ->orWhere('telefono', 'LIKE', "%{$q}%");
            });
        }

        return $query->paginate(15);
    }


    public function getRepartidorById(int $id)
    {
        $repartidor = Repartidores::findOrFail($id);
        return $repartidor;
    }

    public function createRepartidor($data)
    {
        $repartidor = Repartidores::create($data);
        return $repartidor;
    }

    public function updateRepartidor($data, $id)
    {
        $repartidor = Repartidores::findOrFail($id);
        $repartidor->update($data);
        return $repartidor;
    }

    public function deleteRepartidor($id)
    {
        $repartidor = Repartidores::findOrFail($id);
        $repartidor->delete();
        return true;
    }

    public function login($request)
    {
        $usuario = $request->input('usuario');
        $password = $request->input('password');

        $repartidor = Repartidores::where('email', $usuario)
            ->orWhere('numero_documento', $usuario)
            ->first();

        if (! $repartidor || ! Hash::check($password, $repartidor->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        $token = $repartidor->createToken('repartidor-token')->plainTextToken;

        return response()->json([
            'repartidor' => $repartidor,
            'token' => $token
        ]);
    }

}
