export interface Venta{
    id:number;
    pedidoId:number;
    monto:number;
    metodo_pago:string;
    estado:string;
    fecha_pago:Date;
    observacion:string;
}