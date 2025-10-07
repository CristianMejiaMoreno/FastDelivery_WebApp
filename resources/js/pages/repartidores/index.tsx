import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Repartidor } from '@/interfaces/Repartidor';
import { getRepartidores } from '@/api/Repartidor';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { RepartidorModal } from './RepartidorModal';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Repartidores', href: '/repartidores' },
];

export default function Index() {
  const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);
  const [search, setSearch] = useState('');

  const fetchRepartidores = async (page: number = 1, q: string = '') => {
    setLoading(true);
    try {
      const data = await getRepartidores(page, q);
      setRepartidores(data.data);
      setTotalRows(data.total);
      setPerPage(data.per_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepartidores();
  }, []);

  const columns: TableColumn<Repartidor>[] = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Apellido', selector: row => row.apellido, sortable: true },
    {name: 'Tipo Documento', selector: row => row.tipo_documento.nombre, sortable:true},
    {name : 'Numero Documento', selector: row => row.numero_documento, sortable: true},
    { name: 'Teléfono', selector: row => row.telefono },
    { name: 'Email', selector: row => row.email },
    {
      name: 'Acciones',
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
              onClick={() => handleEdit(row)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => console.log("Eliminar", row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const [openModal, setOpenModal] = useState(false)
  const [selectedRepartidor, setSelectedRepartidor] = useState<Repartidor | null>(null)

  // abrir para crear
  const handleCreate = () => {
  setSelectedRepartidor(null)
  setOpenModal(true)
  }

  // abrir para editar
  const handleEdit = (repartidor: Repartidor) => {
  setSelectedRepartidor(repartidor)
  setOpenModal(true)
  }


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Repartidores" />

      <div className="my-6 mx-6 p-6 bg-white rounded-xl shadow">

        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={handleCreate}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Crear Repartidor
          </Button>

          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchRepartidores(1, search);
            }}
            className="border rounded-lg px-3 py-2 w-64"
          />
        </div>

        <DataTable
          columns={columns}
          data={repartidores}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={(page) => fetchRepartidores(page, search)}
          highlightOnHover
        />

        <RepartidorModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          initialData={selectedRepartidor}
        />
      </div>
    </AppLayout>
  );
}
