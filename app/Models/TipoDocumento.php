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
        return $this->hasMany(Repartidores::class, 'tipodocumento_id');
    }

    public function cliente()
    {
        return $this->hasMany(Cliente::class, "tipodocumento_id");
    }
}
