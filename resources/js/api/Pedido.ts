import { Pedido } from "@/interfaces/Pedido";

const BASE_URL = '/pedidos';

export async function getPedidos(page:number =1, q:string = '') {
    const res = await fetch(`${BASE_URL}/list?page=${page}&q=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error('Error al obtener los pedidos');
    return res.json();
}

export async function getPedido(id:number):Promise<Pedido> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok) throw new Error ('Error al obtener el pedido');
    return res.json();
}

export async function crearPedido(data:Partial<Pedido>):Promise<Pedido> {
    const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error ('Error al crear el pedido');
    return res.json();
}

export async function actualizarPedido(id:number, data:Partial<Pedido>):Promise<Pedido> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error (`Error al actualizar el pedido`);
    return res.json();
}

export async function borrarPedido(id:number): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if(!res.ok) throw new Error ('Error al eliminar el pedido');
    return res.ok;
}
