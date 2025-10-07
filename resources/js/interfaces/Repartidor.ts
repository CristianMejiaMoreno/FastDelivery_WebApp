import { TipoDocumento } from "./TipoDocumento";

export interface Repartidor {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    tipodocumento_id: number;
    tipo_documento: TipoDocumento;
    numero_documento: string;
    password: string;
    porcentaje_marca: number;
    porcentaje_repartidor: number;
}

export interface RepartidorOption {
    value: number;
    label: string;
    porcentaje_marca: number;
    porcentaje_repartidor: number;
}
