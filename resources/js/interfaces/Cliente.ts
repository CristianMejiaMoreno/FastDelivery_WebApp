export interface Cliente{
    id:number;
    nombre_cliente:number;
    tipodocumento_id:number;
    numero_documento:number;
    telefono:string;
    email:string;
}

export interface ClienteModalProps{
      open: boolean
      onClose: () => void
      initialData?: Cliente | null
}

export interface ClienteDeleteModalProps{
    onClose: ()=> void,
    open: boolean
}

export interface ClienteFormProps {
  initialData?: Cliente | null
  onSubmit: (data: Omit<Cliente, "id">) => void
  onCancel: () => void
}

export interface ClienteOption{
    value: number;
    label: string;
}
