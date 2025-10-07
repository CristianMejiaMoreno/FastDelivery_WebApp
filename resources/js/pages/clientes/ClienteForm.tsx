import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, UserCheck } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, FileText, IdCard } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function ClienteForm(){
    const [tipo, setTipo] = useState("");



  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-2xl font-bold text-center flex items-center justify-center gap-2'>
                <UserCheck className='text-blue-600'/>
                Crear Cliente
            </CardTitle>
            <CardDescription>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas laudantium in magnam quas alias quia tempora nam illum delectus quod vitae, ipsum modi pariatur illo officia nobis minus, repudiandae corrupti.
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='space-y-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Building2 className="h-4 w-4 text-blue-600" />
                            Nombre de la empresa
                        </Label>
                        <Input className='h-11' type="text" id="email" placeholder="Ingresa el nombre de la empresa" />
                    </div>

                <div className='space-y-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <FileText className='h-4 w-4 text-orange-600' />
                            Tipo de Documento
                        </Label>
                        <Select onValueChange={(value)=>setTipo(value)}>
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
                </div>

                <div className='max-w-3xl gap-6'>
                    <div className='space-y-2'>
                        <Label htmlFor="tipoDocumento" className='flex items-center gap-2 text-sm font-medium'>
                        <IdCard className="h-4 w-4 text-purple-600" />
                            {tipo === "1" && "Número de Cédula de Ciudadanía"}
                            {tipo === "2" && "Número de Pasaporte"}
                            {tipo === "3" && "Número de Cédula de Extranjería"}
                            {!tipo && "Número de documento"}
                        </Label>
                        <Input className='h-14 text-lg px-4 w-full' type="text" id="tipoDocumento" placeholder="Ingresa el nombre de la empresa" />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2 mt-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Phone className="h-4 w-4 text-green-600" />
                            Telefono
                        </Label>
                        <Input className='h-11' type="text" id="email" placeholder="Ingresa el telefono" />
                    </div>


                    <div className='space-y-2 mt-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Mail className="h-4 w-4 text-pink-600" />
                            Email
                        </Label>
                        <Input className='h-11' type="text" id="email" placeholder="Ingresa el email" />
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-6">
                    <Button type="button" variant="outline" className="h-11 px-8 bg-transparent">
                    Cancelar
                    </Button>
                    <Button type="submit" className="h-11 px-8 bg-blue-600 hover:bg-blue-700">
                        Crear Cliente
                    </Button>
                </div>

            </form>
        </CardContent>
    </Card>
  )
}
