<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Repartidores extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'nombre',
        'apellido',
        'tipoDocumentoId',
        'numero_documento',
        'telefono',
        'email',
        'porcentaje_repartidor',
        'porcentaje_marca',
        'password',
    ];

    public function tipo_documento()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipodocumento_id');
    }

    public function pedido()
    {
        return $this->hasMany(Pedido::class, 'repartidor_id');
    }
}
