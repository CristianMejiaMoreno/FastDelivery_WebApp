<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repartidores extends Model
{
    use HasFactory;

    protected $fillable=[
        'nombre',
        'apellido',
        'tipoDocumentoId',
        'numero_documento',
        'telefono',
        'email'
    ];

    public function tipo_documento()
    {
        return $this->belongsTo (TipoDocumento::class);
    }
}
