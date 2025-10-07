import React, { useState } from 'react'
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Ventas', href: '/ventas' },
];

// dataseed
const allEvents = [
  { title: "Venta Norte - Cliente A", date: "2025-09-20", zona: "Norte" },
  { title: "Venta Norte - Cliente B", date: "2025-09-21", zona: "Norte" },
  { title: "Venta Sur - Cliente C", date: "2025-09-22", zona: "Sur" },
  { title: "Venta Sur - Cliente D", date: "2025-09-23", zona: "Sur" },
  { title: "Venta Centro - Cliente E", date: "2025-09-24", zona: "Centro" },
  { title: "Venta Centro - Cliente F", date: "2025-09-25", zona: "Centro" },
];

// funcion para filtrar eventos
function getEventosFiltrados(zonaActiva: string | null, eventos: any[]) {
  if (zonaActiva) {
    return eventos.filter(e => e.zona === zonaActiva);
  }
  return eventos;
}

export default function Index() {
  const [zonaActiva, setZonaActiva] = useState<string | null>(null);

  // funcion en lugar del ternario
  const eventosFiltrados = getEventosFiltrados(zonaActiva, allEvents);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ventas" />
      <div className='my-6 mx-6 p-6 bg-white rounded-xl shadow'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

            {/**izquierda */}
          <div className="p-4 border rounded-lg">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={eventosFiltrados}
            />
          </div>

          {/* derecha */}
          <div className="p-4 border rounded-lg">
            <h2 className="text-lg font-bold mb-2">Zonas de Ventas</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="norte">
                <AccordionTrigger onClick={() => setZonaActiva("Norte")}>
                  📊 Ventas del Norte
                </AccordionTrigger>
                <AccordionContent>
                  Solo se mostrarán ventas de la zona **Norte**.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="sur">
                <AccordionTrigger onClick={() => setZonaActiva("Sur")}>
                  📊 Ventas del Sur
                </AccordionTrigger>
                <AccordionContent>
                  Solo se mostrarán ventas de la zona **Sur**.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="centro">
                <AccordionTrigger onClick={() => setZonaActiva("Centro")}>
                  📊 Ventas del Centro
                </AccordionTrigger>
                <AccordionContent>
                  Solo se mostrarán ventas de la zona **Centro**.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* reset */}
            <button
              onClick={() => setZonaActiva(null)}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Mostrar todas las zonas
            </button>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}
