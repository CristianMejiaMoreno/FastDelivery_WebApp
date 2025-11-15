<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Auditoria extends Model
{
    protected $fillable =[
        'modelo',
        'accion',
        'actor',
        'valores_anteriores',
        'valores_nuevos'
    ];
}
