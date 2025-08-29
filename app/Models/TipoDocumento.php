<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'nombre'];

    public function repartidor()
    {
        return $this->hasMany(Repartidores::class, 'tipoDocumentoId');
    }
}
