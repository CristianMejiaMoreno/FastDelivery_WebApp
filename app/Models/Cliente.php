<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable =[
        'nombre_cliente',
        'tipodocumento_id',
        'numero_documento',
        'telefono',
        'email'
    ];

    public function tipo_documento()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipodocumento_id');
    }
    public function pedido()
    {
        return $this->hasMany(Pedido::class,'cliente_id');
    }
}
