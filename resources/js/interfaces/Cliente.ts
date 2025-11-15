import { TipoDocumento } from "./TipoDocumento";

export interface Cliente{
    id?:number | null;
    nombre_cliente:string;
    tipodocumento_id:number;
    tipo_documento: TipoDocumento;
    numero_documento:string;
    telefono:string;
    email:string;
}

export interface ClienteModalProps{
      open: boolean
      onClose: () => void
      initialData?: Cliente | null,
      onSuccess?: ()=>void
}

export interface ClienteDeleteModalProps{
    onClose: ()=> void,
    open: boolean,
    data: Cliente | null
}

export interface ClienteFormProps {
  initialData?: Cliente | null
  onSubmit?: (data: Omit<Cliente, "id">) => void
  onClose: () => void
  onSuccess?: ()=>void
}

export interface ClienteOption{
    value: number;
    label: string;
}
