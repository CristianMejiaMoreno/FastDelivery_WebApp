import { Pedido } from "@/interfaces/Pedido";

export const validatePedido = (form : Omit<Pedido, "id">)=>{
    const errors: Record<string, string> = {};

    if(!form.codigo_pedido.trim())
    {
        errors.codigo_pedido= "El codigo del pedido es obligatorio"
    }

    if (form.precio <= 0) {
        errors.precio = "El precio debe ser mayor a cero"
    }

    if ( form.cliente_id == undefined ||form.cliente_id < 0) {
        errors.cliente_id = "Debe seleccionar un cliente"
    }

    if(form.repartidor_id == undefined || form.repartidor_id < 0)
    {
        errors.repartidor_id = "Debe de seleccionar un repartidor"
    }

    if(form.zona_id == undefined || form.zona_id < 0)
    {
        errors.zona_id = "Debe de seleccionar una zona"
    }

    if(!form.fecha_entrega)
    {
        errors.fecha_entrega = "Debe de seleccionar una fecha"
    }

    if(!form.fecha_pedido)
    {
        errors.fecha_pedido = "Debe de seleccionar una fecha para el pedido"
    }

    if(!form.estado)
    {
        errors.estado = "Debe de seleccionar un estado"
    }

    if(form.porcentaje_marca <= 0)
    {
        errors.porcentaje_marca = "El porcentaje debe de ser un valor mayor a cero"
    }

    if(form.porcentaje_mensajero <= 0)
    {
        errors.porcentaje_mensajero = "El porcentaje debe de ser un valor mayor a cero"
    }

    if(!form.observacion)
    {
        errors.observacion = 'Debe de ingresar alguna observacion';
    }

    return errors
}
