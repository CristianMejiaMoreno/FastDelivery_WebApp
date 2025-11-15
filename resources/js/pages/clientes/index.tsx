import { getClientes } from '@/api/Cliente';
import { Cliente } from '@/interfaces/Cliente';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button } from '@/components/ui/button';
import { ClienteModal } from './ClienteModal';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { ClienteDelete } from './ClienteDelete';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Clientes', href: '/clientes' },
];

export default function Index() {

  const[clientes, setClientes] =useState<Cliente[]>([]);
  const[loading, setLoading] = useState(true);
  const[totalRows, setTotalRows] = useState(0);
  const[perPage, setPerPage] = useState(15);
  const[openModal, setOpenModal] = useState(false);
  const[openDelete, setOpenDelete] = useState(false);
  const[selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [deleteCliente, setDeleteCliente] = useState<Cliente | null>(null);
 const [search, setSearch]=useState('');

  const fetchClientes = async(page: number =1, q: string = '') => {
    setLoading(true)
    try{
      const data = await getClientes(page, q);
      setClientes(data.data); //array de registro
      setTotalRows(data.total); //paginacion
      setPerPage(data.per_page); //items por pagina
    }catch (error){
      console.error(error);
    } finally {
       setLoading(false);
    }
  };

  useEffect(()=>{
    fetchClientes(); //carga inicial
  }, []);

  const handleCreate = ()=>{
    setSelectedCliente(null)
    setOpenModal(true)
    console.log('estoy oprimiendo')
  }

  const handleEdit = (cliente:Cliente) => {
    setSelectedCliente(cliente)
    setOpenModal(true)
    console.log(cliente)
  }

  const handleDelete = (cliente:Cliente) => {
     setDeleteCliente(cliente)
     setOpenDelete(true)
     console.log(cliente)
     console.log('jojo', cliente.id)
  }

  const columns: TableColumn<Cliente>[] = [
    {name: 'ID', selector: row => row.id ?? 0, sortable: true},
    {name: 'Nombre', selector: row => row.nombre_cliente, sortable: true},
    {name: 'Tipo Documento', selector: row => row.tipo_documento.nombre, sortable:true},
    {name: 'Numero Documento', selector: row => row.numero_documento, sortable:true},
    {name : 'Numero Documento', selector: row => row.numero_documento, sortable: true},
    {name: 'Teléfono', selector: row => row.telefono, sortable: true},
    {name: 'Email', selector: row => row.email, sortable: true},
    {
        name:'Acciones',
        cell:(row)=> (
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
                    onClick={()=>handleDelete(row)}
                >
                    <Trash2 className='h-4 w-4' />
                </Button>

            </div>
        )
    }
  ];


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Clientes" />

        <div className="my-6 mx-6 p-6 bg-white rounded-xl shadow">

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-x-2'>
                <Button onClick={()=>handleCreate()}>
                <Plus />
                    Crear Cliente
                </Button>

                {/* <Button className='bg-red-500' onClick={()=>handleDelete(1)}>
                <Plus />
                    Eliminar Cliente
                </Button> */}
            </div>





            <DataTable
              columns={columns}
              data={clientes}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              paginationPerPage={perPage}
              onChangePage={(page) => fetchClientes(page)}
              highlightOnHover
            />
        </div>


        <ClienteModal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            initialData={selectedCliente}
            onSuccess={fetchClientes}
        />

        <ClienteDelete
            data={deleteCliente}
            open={openDelete}
            onClose={()=>{setOpenDelete(false)}}
        />

    </AppLayout>
  );
}
