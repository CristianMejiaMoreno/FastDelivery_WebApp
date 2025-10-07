"use client"

// src/components/repartidores/RepartidorForm.tsx
import type React from "react"
import { useState } from "react"
import type { Repartidor } from "@/interfaces/Repartidor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Mail, FileText, Hash, UserCheck } from "lucide-react"

interface RepartidorFormProps {
  initialData?: Repartidor | null
  onSubmit: (data: Omit<Repartidor, "id">) => void
  onCancel: () => void
}

export default function RepartidorForm({ initialData, onSubmit, onCancel }: RepartidorFormProps) {
  const [form, setForm] = useState<Omit<Repartidor, "id">>({
    nombre: initialData?.nombre || "",
    apellido: initialData?.apellido || "",
    telefono: initialData?.telefono || "",
    email: initialData?.email || "",
    tipodocumento_id: initialData?.tipodocumento_id || 1,
    numero_documento: initialData?.numero_documento || "",
  })

  const handleChange = (key: keyof Omit<Repartidor, "id">, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <UserCheck className="h-6 w-6 text-blue-600" />
          {initialData ? "Actualizar Repartidor" : "Nuevo Repartidor"}
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          {initialData
            ? "Modifica la información del repartidor"
            : "Completa los datos para registrar un nuevo repartidor"}
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                Nombre
              </Label>
              <Input
                id="nombre"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Ingresa el nombre"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                Apellido
              </Label>
              <Input
                id="apellido"
                value={form.apellido}
                onChange={(e) => handleChange("apellido", e.target.value)}
                placeholder="Ingresa el apellido"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                Teléfono
              </Label>
              <Input
                id="telefono"
                value={form.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                placeholder="Ej: +57 300 123 4567"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-600" />
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="ejemplo@correo.com"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-600" />
                Tipo de Documento
              </Label>
              <Select
                value={String(form.tipodocumento_id)}
                onValueChange={(val) => handleChange("tipodocumento_id", Number.parseInt(val))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="2">Pasaporte</SelectItem>
                  <SelectItem value="3">Cédula de Extranjería</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero_documento" className="text-sm font-medium flex items-center gap-2">
                <Hash className="h-4 w-4 text-red-600" />
                Número de Documento
              </Label>
              <Input
                id="numero_documento"
                value={form.numero_documento}
                onChange={(e) => handleChange("numero_documento", e.target.value)}
                placeholder="Ej: 1234567890"
                className="h-11"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel} className="h-11 px-8 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="h-11 px-8 bg-blue-600 hover:bg-blue-700">
              {initialData ? "Actualizar Repartidor" : "Crear Repartidor"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
