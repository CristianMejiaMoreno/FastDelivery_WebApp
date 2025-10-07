export interface Zona{
    id:number;
    nombre:string;
    precio_sugerido:number;
}

export interface ZonaModalProps{
    open: boolean;
    onClose: ()=>void;
    initialData?: Zona | null
}

export interface ZonaDeleteModal{
    open:boolean;
    onClose: ()=>void;
}

export interface ZonaOption
{
    value : number;
    label: string;
    precio: number;
}

