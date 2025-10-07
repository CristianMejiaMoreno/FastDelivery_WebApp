import { Cliente } from "./Cliente";
import { Repartidor } from "./Repartidor";
import { Zona } from "./Zona";

export interface Pedido{
    id:number;
    codigo_pedido:string;
    cliente_id:number | null;
    cliente?: Cliente
    repartidor_id:number | null;
    repartidor?: Repartidor
    zona_id:number | null;
    zona?: Zona
    precio:number;
    fecha_pedido:Date;
    fecha_entrega:Date;
    estado:string;
    porcentaje_marca:number;
    porcentaje_mensajero:number;
    recaudo_mensajero: number;
    recaudo_empresa: number;
    total_mensajero: number;
    observacion:string;
}

export interface PedidoModalProps{
    open: boolean;
    onClose: ()=>void;
    initialData?: Pedido | null;
}

export interface PedidoDeleteProps{
    open: boolean;
    onClose: ()=>void;
}

export interface PedidoFormProps{
    onClose: ()=>void;
    initialData? : Pedido | null;
    onSubmit?: (data: Omit<Pedido, "id">) => void

}
