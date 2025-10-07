import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ZonaModal } from './ZonaModal';
import { ZonaDelete } from './ZonaDelete';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Zonas', href: '/zonas' },
];


export default function Index() {
    const [contador, setContador] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleCreate = ()=>{
        setOpenModal(true)
    }

    const handleDelete = () =>{
        setOpenDelete(true);
        console.log('esta locuraaa')
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Zonas" />

        <div className="my-6 mx-6 p-6 bg-white rounded-xl shadow">
            {contador}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-x-2'>
                <div className="flex items-center justify-between mb-4">
                    <Button onClick={()=>setContador(contador+1)}>contador</Button>
                    <Button onClick={()=>handleCreate()}>Crear Zona Original</Button>
                    <Button size="sm" className='bg-red-400 hover:bg-red-800' onClick={()=>handleDelete()}>
                        Eliminar Zona
                    </Button>
                </div>
            </div>
            <p className="text-gray-700">Aquí irá la tabla de zonas.</p>
        </div>

        <ZonaModal
            open={openModal}
            onClose={()=>setOpenModal(false)}
            />

        <ZonaDelete
            open={openDelete}
            onClose={()=>setOpenDelete(false)}
            />


    </AppLayout>
  );
}
