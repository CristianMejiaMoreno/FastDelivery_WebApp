<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CrearCliente extends FormRequest
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
            'nombre_cliente' => 'required|string',
            'tipodocumento_id' => 'required|integer|exists:tipo_documentos,id',
            'numero_documento' => 'sometimes|string',
            'telefono'=>'required|string',
            'email'=>'sometimes|string'
        ];
    }
}
