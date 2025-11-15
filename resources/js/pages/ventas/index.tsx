"use client"

import { useState, useMemo } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type BreadcrumbItem } from '@/types';
import AppLayout from "@/layouts/app-layout"


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Repartidores', href: '/repartidores' },
];

function generarEventosParaMes(year: number, month: number) {
  // Usar el mes y año como semilla para generar variaciones
  const semilla = (year * 12 + month) % 10
  const factorVariacion = 0.7 + semilla * 0.06 // Factor entre 0.7 y 1.3

  const eventosBase = [
    {
      dia: 5,
      zona: "Norte",
      cliente: "Cliente A",
      montoBase: 15000,
      productos: "Producto X, Producto Y",
      vendedor: "Juan Pérez",
    },
    {
      dia: 8,
      zona: "Norte",
      cliente: "Cliente B",
      montoBase: 8500,
      productos: "Producto Z",
      vendedor: "María García",
    },
    {
      dia: 12,
      zona: "Sur",
      cliente: "Cliente C",
      montoBase: 22000,
      productos: "Producto A, Producto B, Producto C",
      vendedor: "Carlos López",
    },
    {
      dia: 15,
      zona: "Sur",
      cliente: "Cliente D",
      montoBase: 12300,
      productos: "Producto D",
      vendedor: "Ana Martínez",
    },
    {
      dia: 18,
      zona: "Centro",
      cliente: "Cliente E",
      montoBase: 18700,
      productos: "Producto E, Producto F",
      vendedor: "Luis Rodríguez",
    },
    {
      dia: 22,
      zona: "Centro",
      cliente: "Cliente F",
      montoBase: 9200,
      productos: "Producto G",
      vendedor: "Sofia Torres",
    },
    {
      dia: 25,
      zona: "Norte",
      cliente: "Cliente G",
      montoBase: 31500,
      productos: "Producto H, Producto I",
      vendedor: "Juan Pérez",
    },
    {
      dia: 28,
      zona: "Sur",
      cliente: "Cliente H",
      montoBase: 14800,
      productos: "Producto J",
      vendedor: "Carlos López",
    },
  ]

  return eventosBase.map((evento) => {
    const fecha = `${year}-${String(month).padStart(2, "0")}-${String(evento.dia).padStart(2, "0")}`
    // Aplicar variación al monto basada en el mes
    const montoNumerico = Math.round(evento.montoBase * factorVariacion)
    const monto = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(montoNumerico)

    return {
      title: `Venta ${evento.zona} - ${evento.cliente}`,
      date: fecha,
      zona: evento.zona,
      cliente: evento.cliente,
      monto,
      montoNumerico,
      productos: evento.productos,
      vendedor: evento.vendedor,
    }
  })
}

function calcularTotal(eventos: ReturnType<typeof generarEventosParaMes>) {
  return eventos.reduce((sum, e) => sum + e.montoNumerico, 0)
}

function formatearMoneda(monto: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(monto)
}

function getEventosFiltrados(zonaActiva: string | null, eventos: ReturnType<typeof generarEventosParaMes>) {
  if (zonaActiva) {
    return eventos.filter((e) => e.zona === zonaActiva)
  }
  return eventos
}

export default function VentasPage() {
  const [zonaActiva, setZonaActiva] = useState<string | null>(null)
  const [mesActual, setMesActual] = useState(() => {
    const hoy = new Date()
    return { year: hoy.getFullYear(), month: hoy.getMonth() + 1 }
  })

  const allEvents = useMemo(() => {
    console.log("[v0] Generando eventos para:", mesActual)
    return generarEventosParaMes(mesActual.year, mesActual.month)
  }, [mesActual])

  const eventosFiltrados = getEventosFiltrados(zonaActiva, allEvents)

  const handleZonaChange = (zona: string) => {
    setZonaActiva(zonaActiva === zona ? null : zona)
  }

  const getEventosDelDia = (dateStr: string) => {
    return eventosFiltrados.filter((e) => e.date === dateStr)
  }

  const totales = useMemo(() => {
    const norte = calcularTotal(allEvents.filter((e) => e.zona === "Norte"))
    const sur = calcularTotal(allEvents.filter((e) => e.zona === "Sur"))
    const centro = calcularTotal(allEvents.filter((e) => e.zona === "Centro"))
    const general = calcularTotal(allEvents)

    console.log("[v0] Totales recalculados:", { norte, sur, centro, general })

    return {
      norte,
      sur,
      centro,
      general,
    }
  }, [allEvents])

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">Calendario de Ventas</h1>
            {zonaActiva && (
              <Badge variant="secondary" className="text-sm">
                Filtrando: {zonaActiva}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">Visualiza y filtra las ventas por zona geográfica</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 bg-card rounded-lg border shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-card-foreground">Calendario</h2>
              <span className="text-sm text-muted-foreground">
                {eventosFiltrados.length} {eventosFiltrados.length === 1 ? "evento" : "eventos"}
              </span>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={eventosFiltrados}
              locale="es"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth",
              }}
              height="auto"
              eventColor="#3b82f6"
              datesSet={(dateInfo) => {
                const nuevaFecha = dateInfo.view.currentStart
                const year = nuevaFecha.getFullYear()
                const month = nuevaFecha.getMonth() + 1

                console.log("[v0] Mes cambiado a:", { year, month })

                setMesActual((prev) => {
                  if (prev.year !== year || prev.month !== month) {
                    return { year, month }
                  }
                  return prev
                })
              }}
              eventMouseEnter={(info) => {
                const eventos = getEventosDelDia(info.event.startStr)
                if (eventos.length > 0) {
                  const total = calcularTotal(eventos)
                  info.el.style.cursor = "pointer"
                  info.el.title =
                    eventos.map((e) => `${e.cliente} - ${e.monto}`).join("\n") +
                    `\n\nTotal del día: ${formatearMoneda(total)}`
                }
              }}
            />
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Filtrar por Zona</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="norte">
                <AccordionTrigger
                  onClick={() => handleZonaChange("Norte")}
                  className={zonaActiva === "Norte" ? "text-primary" : ""}
                >
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Ventas del Norte</span>
                    {zonaActiva === "Norte" && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Activo
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {allEvents
                      .filter((e) => e.zona === "Norte")
                      .map((evento, idx) => (
                        <Card key={idx} className="border-l-4 border-l-blue-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">{evento.cliente}</CardTitle>
                            <CardDescription className="text-xs">{evento.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monto:</span>
                              <span className="font-semibold text-green-600">{evento.monto}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vendedor:</span>
                              <span className="font-medium">{evento.vendedor}</span>
                            </div>
                            <Separator className="my-2" />
                            <div>
                              <span className="text-muted-foreground">Productos:</span>
                              <p className="text-foreground mt-1">{evento.productos}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                            Total Zona Norte:
                          </span>
                          <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                            {formatearMoneda(totales.norte)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sur">
                <AccordionTrigger
                  onClick={() => handleZonaChange("Sur")}
                  className={zonaActiva === "Sur" ? "text-primary" : ""}
                >
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Ventas del Sur</span>
                    {zonaActiva === "Sur" && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Activo
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {allEvents
                      .filter((e) => e.zona === "Sur")
                      .map((evento, idx) => (
                        <Card key={idx} className="border-l-4 border-l-orange-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">{evento.cliente}</CardTitle>
                            <CardDescription className="text-xs">{evento.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monto:</span>
                              <span className="font-semibold text-green-600">{evento.monto}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vendedor:</span>
                              <span className="font-medium">{evento.vendedor}</span>
                            </div>
                            <Separator className="my-2" />
                            <div>
                              <span className="text-muted-foreground">Productos:</span>
                              <p className="text-foreground mt-1">{evento.productos}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                            Total Zona Sur:
                          </span>
                          <span className="text-lg font-bold text-orange-700 dark:text-orange-300">
                            {formatearMoneda(totales.sur)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="centro">
                <AccordionTrigger
                  onClick={() => handleZonaChange("Centro")}
                  className={zonaActiva === "Centro" ? "text-primary" : ""}
                >
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Ventas del Centro</span>
                    {zonaActiva === "Centro" && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Activo
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 mt-2">
                    {allEvents
                      .filter((e) => e.zona === "Centro")
                      .map((evento, idx) => (
                        <Card key={idx} className="border-l-4 border-l-purple-500">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold">{evento.cliente}</CardTitle>
                            <CardDescription className="text-xs">{evento.date}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monto:</span>
                              <span className="font-semibold text-green-600">{evento.monto}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Vendedor:</span>
                              <span className="font-medium">{evento.vendedor}</span>
                            </div>
                            <Separator className="my-2" />
                            <div>
                              <span className="text-muted-foreground">Productos:</span>
                              <p className="text-foreground mt-1">{evento.productos}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                            Total Zona Centro:
                          </span>
                          <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
                            {formatearMoneda(totales.centro)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {zonaActiva && (
              <Button onClick={() => setZonaActiva(null)} variant="outline" className="w-full mt-4">
                Mostrar todas las zonas
              </Button>
            )}

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-semibold text-card-foreground mb-3">Resumen</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Norte:</span>
                  <div className="text-right">
                    <div className="font-medium">{allEvents.filter((e) => e.zona === "Norte").length} ventas</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">{formatearMoneda(totales.norte)}</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sur:</span>
                  <div className="text-right">
                    <div className="font-medium">{allEvents.filter((e) => e.zona === "Sur").length} ventas</div>
                    <div className="text-xs text-orange-600 dark:text-orange-400">{formatearMoneda(totales.sur)}</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Centro:</span>
                  <div className="text-right">
                    <div className="font-medium">{allEvents.filter((e) => e.zona === "Centro").length} ventas</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">
                      {formatearMoneda(totales.centro)}
                    </div>
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm pt-2 font-semibold">
                  <span>Total General:</span>
                  <div className="text-right">
                    <div>{allEvents.length} ventas</div>
                    <div className="text-base text-green-600 dark:text-green-400">
                      {formatearMoneda(totales.general)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>

  )
}
