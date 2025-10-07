"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Package, Truck, DollarSign, MapPin, Clock, Users } from "lucide-react"


import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Inicio', href: '/dashboard' },
];

const dataPedidos = [
  { name: "Pendientes", value: 120, color: "#f59e0b" },
  { name: "En Tránsito", value: 90, color: "#3b82f6" },
  { name: "Entregados", value: 300, color: "#10b981" },
]

const dataRepartidores = [
  { name: "Juan Pérez", pedidos: 85, zona: "El Poblado" },
  { name: "Ana García", pedidos: 120, zona: "Laureles" },
  { name: "Carlos Ruiz", pedidos: 68, zona: "Envigado" },
  { name: "Luisa Torres", pedidos: 95, zona: "Sabaneta" },
  { name: "Miguel Ossa", pedidos: 77, zona: "Bello" },
]

const dataIngresos = [
  { mes: "Ene", ingresos: 45000000, pedidos: 890 },
  { mes: "Feb", ingresos: 52000000, pedidos: 1020 },
  { mes: "Mar", ingresos: 48000000, pedidos: 950 },
  { mes: "Abr", ingresos: 61000000, pedidos: 1180 },
  { mes: "May", ingresos: 58000000, pedidos: 1100 },
  { mes: "Jun", ingresos: 67000000, pedidos: 1290 },
]

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"]


export default function Dashboard() {
  const totalPedidos = dataPedidos.reduce((sum, item) => sum + item.value, 0)
  const ingresosMes = dataIngresos[dataIngresos.length - 1].ingresos
  const totalRepartidores = dataRepartidores.length

  return (
        <AppLayout breadcrumbs={breadcrumbs}>
             <Head title="Inicio" />

           <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fast Delivery</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Soluciones de logística y entrega en el Valle de Aburrá
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Última actualización: {new Date().toLocaleString("es-CO")}
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Sistema Activo
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                <p className="text-3xl font-bold text-gray-900">{totalPedidos.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Repartidores</p>
                <p className="text-3xl font-bold text-gray-900">{totalRepartidores}</p>
                <p className="text-xs text-blue-600 mt-1">Activos en ruta</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Junio</p>
                <p className="text-2xl font-bold text-gray-900">${(ingresosMes / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600 mt-1">+15% vs mayo</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa Entrega</p>
                <p className="text-3xl font-bold text-gray-900">98.5%</p>
                <p className="text-xs text-green-600 mt-1">Excelente servicio</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Estado de Pedidos */}
        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Estado de Pedidos Hoy
            </CardTitle>
            <p className="text-sm text-gray-600">Distribución actual de {totalPedidos} pedidos</p>
          </CardHeader>
          <CardContent className="h-[320px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataPedidos}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {dataPedidos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} pedidos`, "Cantidad"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rendimiento por Repartidor */}
        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Top Repartidores
            </CardTitle>
            <p className="text-sm text-gray-600">Pedidos entregados este mes por zona</p>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataRepartidores} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => [`${value} pedidos`, `${props.payload.zona}`]}
                  labelFormatter={(label) => `Repartidor: ${label}`}
                />
                <Bar dataKey="pedidos" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Pedidos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ingresos Mensuales */}
        <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              Ingresos 2024
            </CardTitle>
            <p className="text-sm text-gray-600">Evolución mensual en millones de pesos</p>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataIngresos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                <Tooltip
                  formatter={(value) => [`$${(value / 1000000).toFixed(1)} millones`, "Ingresos"]}
                  labelFormatter={(label) => `Mes: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Zonas de Cobertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["El Poblado", "Laureles", "Envigado", "Sabaneta", "Bello", "Itagüí"].map((zona, index) => (
                <div key={zona} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">{zona}</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Activa
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Sede Principal</p>
                  <p className="text-sm text-gray-600">Calle 10 #43-15, El Poblado, Medellín</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Centro de Distribución</p>
                  <p className="text-sm text-gray-600">Zona Industrial Itagüí</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Horario de Atención</p>
                  <p className="text-sm text-gray-600">Lunes a Sábado: 6:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
        </AppLayout>

  )
}
