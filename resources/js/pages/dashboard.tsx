import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Repartidor } from '@/interfaces/Repartidor';
import { getRepartidores } from '@/api/Repartidor'; // tu función

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
  const [repartidores, setRepartidores] = useState<Repartidor[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const fetchRepartidores = async (page: number = 1) => {
    setLoading(true);
    try {
      const data = await getRepartidores(page);   // 👈 usamos tu función
      setRepartidores(data.data);                 // array de registros
      setTotalRows(data.total);                   // total para paginación
      setPerPage(data.per_page);                  // items por página
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepartidores(); // carga inicial
  }, []);

  const columns: TableColumn<Repartidor>[] = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Apellido', selector: row => row.apellido, sortable: true },
    { name: 'Teléfono', selector: row => row.telefono },
    { name: 'Email', selector: row => row.email },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="p-4 bg-white rounded-xl shadow">
        <DataTable
          columns={columns}
          data={repartidores}
          progressPending={loading}
          pagination
          paginationServer    // 👈 paginación remota
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangePage={(page) => fetchRepartidores(page)} // 👈 cambio de página
          highlightOnHover
        />
      </div>
    </AppLayout>
  );
}
