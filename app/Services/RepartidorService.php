<?php

namespace App\Services;

use App\Models\Pedido;
use App\Models\Repartidores;
use Illuminate\Support\Facades\Hash;
use App\Services\PedidoService;
use Log;

class RepartidorService
{

    protected $pedidoService;

    /**
     * Create a new class instance.
     */
    public function __construct(PedidoService $pedidoService)
    {
        $this->pedidoService = $pedidoService;
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

    public function getPedidoByRepartidor($repartidorId)
    {

        $pedido = Pedido::query()->join('repartidores',
        'pedidos.repartidor_id', '=', 'repartidores.id')
        ->select('pedidos.*')
        ->where('pedidos.repartidor_id', $repartidorId)
        ->get();

        $total =  Pedido::query()->where('repartidor_id', $repartidorId)
        ->sum('total_mensajero');

        return [$pedido, $total];
    }

    public function getPedidosMensual($repartidorId, $mes, $anio)
    {
        $query = Pedido::query()
            ->where('repartidor_id', $repartidorId)
            ->whereMonth('fecha_entrega', $mes)
            ->whereYear('fecha_entrega', $anio);

        Log::info('Consulta SQL generada: ' . $query->toSql());
        Log::info('Bindings: ' . json_encode($query->getBindings()));

        $pedidos = $query->get();

        return $pedidos;
    }

    public function getPedidosSemanal($repartidorId, $inicioSemana, $finSemana, $estado)
    {
        $query = Pedido::query()
                ->where('repartidor_id', $repartidorId)
                ->whereBetween('fecha_pedido', [$inicioSemana, $finSemana]);

        if(!$estado)
        {
            $query->where('estado', $estado);
        }

        return $query->get();
    }

    public function getPedidosDia($repartidorId, $dia, $estado)
    {
        $query = Pedido::query()
                ->where('repartidor_id', $repartidorId)
                ->whereDate('fecha_pedido', $dia);
        
        if($estado)
        {
            $query->where('estado', $estado);
        }

        return $query->get();
    }

    public function getPedidobyId($codigoPedido, $repartidorId)
    {
        $pedido = Pedido::query();

        $pedido = $pedido->join('repartidores',
        'pedidos.repartidor_id', '=', 'repartidores.id')
        ->select('pedidos.*')
        ->where('pedidos.repartidor_id', $repartidorId)
        ->where('pedidos.codigo_pedido', $codigoPedido)
        ->first();

        return $pedido;
 
    }

    public function getPedidosDisponibles()
    {  
        $pedido = Pedido::query();

        $pedidos = $pedido->where('estado', '=', 'disponible')->get();

        return $pedidos;

    }

}
