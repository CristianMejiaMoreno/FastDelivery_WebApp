<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo_pedido',
        'cliente_id',
        'repartidor_id',
        'zona_id',
        'precio',
        'fecha_pedido',
        'fecha_entrega',
        'estado',
        'porcentaje_marca',
        'porcentaje_mensajero',
        'recaudo_mensajero',
        'recaudo_empresa',
        'total_mensajero',
        'observacion',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function repartidor()
    {
        return  $this->belongsTo(Repartidores::class, 'repartidor_id');
    }

    public function zona()
    {
        return $this->belongsTo(Zona::class, 'zona_id');
    }
}
