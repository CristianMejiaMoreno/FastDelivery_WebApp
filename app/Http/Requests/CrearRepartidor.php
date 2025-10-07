<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrearRepartidor extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre'=>'required|string|max:200',
            'apellido'=>'required|string|max:200',
            'tipodocumento_id'=>'required|exists:tipo_documentos,id',
            'numero_documento'=>'required|numeric',
            'telefono'=>'required|string',
            'email'=>'required|string',
            'password'=>'required|string',
            'porcentaje_marca'=>'required|integer',
            'porcentaje_repartidor'=>'required|integer'
        ];
    }
}
