import React, {useEffect, useState } from 'react'
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import PedidoModal from './PedidoModal';
import PedidoDelete from './PedidoDelete';
import { Pedido } from '@/interfaces/Pedido';
import { getPedidos } from '@/api/Pedido';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Pencil, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Pedidos', href: '/pedidos' },
];


export default function Index(){

    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(15);
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [seletedPedido, setSelectedPedido] = useState<Pedido | null>(null)
    const [contador, setContador] = useState(0);

    const fetchPedidos = async (page: number =1, q: string = '')=>{
        setLoading(true);
        try{
            const data = await getPedidos(page, q);
            setPedidos(data.data);
            setTotalRows(data.total);
            setPerPage(data.per_page);
        }catch(error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPedidos();
    }, []);


    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "pendiente":
            return "bg-orange-500 text-white hover:bg-orange-600";
            case "entregado":
            return "bg-green-500 text-white hover:bg-green-600";
            case "cancelado":
            return "bg-red-500 text-white hover:bg-red-600";
            default:
            return "bg-gray-500 text-white hover:bg-gray-600";
        }
    };


    const columns : TableColumn<Pedido>[] = [
        {name: 'ID', selector: row => row.id, sortable: true, omit: true},
        {name: 'Codigo Pedido', selector: row => row.codigo_pedido, sortable: true},
        {name: 'Cliente', selector: row => row.cliente.nombre_cliente, sortable: true},
        {name: 'Repartidor', selector: row=> `${row.repartidor.nombre} ${row.repartidor.apellido}`, sortable: true},
        {name: 'Zona', selector: row => row.zona.nombre, sortable: true},
        {
            name: 'Precio',
            selector: (row) =>
                new Intl.NumberFormat("es-CO", {
                    style:"currency",
                    currency: "COP",
                    minimumFractionDigits:0
                }).format(row.precio),
            sortable: true},
        {
            name: 'Fecha Pedido',
            selector: (row) => {
            if (!row.fecha_pedido) return "—";
            return new Date(row.fecha_pedido).toLocaleDateString();
            },
            sortable: true
        },
        {
            name: 'Fecha Entrega',
            selector: (row) => {
            if (!row.fecha_pedido) return "—";
            return new Date(row.fecha_entrega).toLocaleDateString();
            },
            sortable: true},
        {
            name: 'Estado',
            cell: (row) => (
                <Button
                 className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(row.estado)}`}>
                    {row.estado}
                </Button>
            ),
            ignoreRowClick: true,
            sortable:false
        },
        {name: 'Porcentaje Marca', selector: row=>`${row.porcentaje_marca}%`, sortable: true},
        {name: 'Porcentaje Mensajero', selector: row=>`${row.porcentaje_mensajero}%`, sortable:true},
        {
            name: 'Recaudo Mensajero',
            selector: (row)=>
                new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits:0
                }).format(row.recaudo_mensajero),
            sortable:true},
        {name:
            'Recaudo Empresa',
            selector: (row) =>
                new Intl.NumberFormat("es-CO",{
                    style:"currency",
                    currency: "COP",
                    minimumFractionDigits:0
                }).format(row.recaudo_empresa)
            ,
            sortable: true
        },
        {name: 'Observacion', selector: row=> row.observacion, sortable: false},
        {
            name: 'Total Mensajero',
            selector: (row)=>
                new Intl.NumberFormat("es-CO",{
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits:0
                }).format(row.total_mensajero),
            sortable: true
        },
        {
            name: 'Acciones',
            cell: (row)=> (
                <div className='flex gap-2'>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={()=>handleEdit(row)}
                    >
                        <Pencil className='h-4 w-4' />
                    </Button>

                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={()=>handleDelete()}
                    >
                        <Trash2 className='h-4 w-4' />
                    </Button>

                </div>
            )
        }
    ]

    const handleCreate = ()=>{
        setSelectedPedido(null)
        setOpenModal(true);
    }

    const handleDelete = () =>{
        setOpenDelete(true);
    }

    const handleEdit = (pedido: Pedido) => {
        setSelectedPedido(pedido)
        setOpenModal(true)
        console.log('este es el pedido', pedido)
    }

    const SumaContador = () =>{
        setContador(contador +1);
        console.log(contador);
    }



  return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Pedidos" />
            <div className="my-6 mx-6 p-6 bg-white rounded-xl shadow">

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-x-2'>

                    <div className='flex justify-center items-center space-x-2 gap-7'>
                    <Button onClick={()=>handleCreate()}>prueba create</Button>
                    <Button onClick={()=>handleDelete()}>prueba delete</Button>
                    <Button onClick={()=>SumaContador()}>prueba contador</Button>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    data={pedidos}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationPerPage={perPage}
                    onChangePage={(page)=> fetchPedidos(page)}
                    highlightOnHover
                />

            </div>


            <PedidoModal
                open={openModal}
                onClose={()=>setOpenModal(false)}
                initialData={seletedPedido}
             />

             <PedidoDelete
                open={openDelete}
                onClose={()=>setOpenDelete(false)}
             />

        </AppLayout>
  )
}
