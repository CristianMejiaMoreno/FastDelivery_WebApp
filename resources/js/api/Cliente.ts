import { Cliente } from "@/interfaces/Cliente";

const BASE_URL = '/clientes';

export async function getClientes(page:number =1, q: string = '') {
    const res = await fetch(`${BASE_URL}/list?page=${page}&q=${encodeURIComponent(q)}`);
    if(!res.ok) throw new Error('Error al obtener clientes');
    return res.json();
}

export async function getCliente(id:number):Promise<Cliente> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if(!res.ok) throw new Error('Error al obtener el cliente');
    return res.json();
}

export async function crearCliente(data:Partial<Cliente>):Promise<Cliente>{
    const res = await fetch(BASE_URL,{
        method: "POST",
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    });
    if(!res.ok) throw new Error ('Error al crear el cliente');
    return res.json();
}

export async function actualizarCliente(data: Partial<Cliente>, id: number): Promise<Cliente> {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken || '',
            'Accept': 'application/json'
        },
        credentials: 'include', // Incluye cookies
        body: JSON.stringify(data)
    });

    if(!res.ok) throw new Error('Error al actualizar el cliente');
    return res.json();
}

export async function borrarCliente(id:number):Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE'
    });

    if(!res.ok) throw new Error('Error al tratar de eliminar al Cliente');

    return res.ok;
}
