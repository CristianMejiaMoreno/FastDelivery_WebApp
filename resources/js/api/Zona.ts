import { Zona } from "@/interfaces/Zona";

const BASE_URL = '/zonas'

export async function getZonas(page: Number = 1, q: string = '') {
    const res = await fetch(`${BASE_URL}/list?page=${page}&q=${encodeURIComponent(q)}`);
    if(!res.ok) throw new Error('Error al obtener repartidores');
    return res.json();
}

export async function getZona(id:number): Promise<Zona> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok) throw new Error('Error l obtener la zona');
    return res.json();
}

export async function crearZona(data:Partial<Zona>):Promise<Zona> {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error ('Error al crear la zona');
    return res.json();
}

export async function actualizarZona(id:number, data: Partial<Zona>): Promise<Zona> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-type' : 'application-type'},
        body: JSON.stringify(data)
    });

    if(!res.ok) throw new Error('Error al actualizar la zona');

    return res.json();
}

export async function eliminarZona(id:number): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method:'DELETE'
    });

    if(!res.ok) throw new Error ('Error al eliminar la zona');

    return res.ok;
    
}