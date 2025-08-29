import { Repartidor } from "@/interfaces/Repartidor";

const BASE_URL = '/repartidores';

export async function getRepartidores(page: number = 1) {
  const res = await fetch(`/repartidores?page=${page}`);
  if (!res.ok) throw new Error('Error al obtener repartidores');
  return res.json(); 
}


export async function getRepartidor(id:number): Promise<Repartidor> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok) throw new Error('Error al obtener el repartidor');
    return res.json();
}

export async function crearRepartidor(data:Partial<Repartidor>): Promise<Repartidor> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error('Error al crear repartidor');
    return res.json();
}

export async function actualizarRepartidor(id:number, data: Partial<Repartidor>): Promise<Repartidor>{
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(!res.ok) throw new Error('Error al actualizar repartidor');
    return res.json();
}

export async function eliminarRepartidor(id:number): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE'
    });
    
    if(!res.ok) throw new Error('Error al eliminar repartidor');

    return res.ok;
}