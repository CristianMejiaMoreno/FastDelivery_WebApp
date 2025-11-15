import { TipoDocumento } from "@/interfaces/TipoDocumento";

const BASE_URL = '/tipoDocumento';

export async function getTipoDocumento(): Promise<TipoDocumento[]>{
    const res = await fetch(`${BASE_URL}/list`);
    if(!res.ok) throw new Error("Error al tratar de obtener los tipos de documentos");
    const result = await res.json()
    return result.data;
}
