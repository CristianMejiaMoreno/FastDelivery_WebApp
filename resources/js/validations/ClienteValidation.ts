import { Cliente } from "@/interfaces/Cliente";

export function validateCliente(form: Partial<Cliente>)
{

    const errors: Record<string, string> = {};

    if(!form.email)
    {
        console.log("a1")
        errors.email = "El cliente debe de tener un email"
    }

    if(!form.numero_documento)
    {        console.log("a2")

        errors.numero_documento = "Debe de ingresar el numero de documento"
    }


    if(!form.nombre_cliente)
    {
                console.log("a3")

        errors.nombre_cliente = "Debe de ingresar el nombre del cliente"
    }
    else if(form.nombre_cliente.charAt(0) != form.nombre_cliente.charAt(0).toUpperCase())
    {
                console.log("a4")

        errors.nombre_cliente = "El nombre del cliente debe de empezar con una mayuscula"
    }

    if(!form.telefono)
    {
        console.log("a5")

        errors.telefono = "Debe de ingresar el numero de telefono del cliente"
    }

    if(!form.tipodocumento_id)
    {
                console.log("a6")

        errors.tipodocumento_id = "Debe de seleccionar un tipo de documento"
    }

    return errors;
}
