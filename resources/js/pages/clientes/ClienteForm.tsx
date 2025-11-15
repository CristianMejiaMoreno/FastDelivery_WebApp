import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import React, { useEffect, useState } from 'react'
import { Cliente, ClienteFormProps } from '@/interfaces/Cliente'
import { getTipoDocumento } from '@/api/TipoDocumento'
import { TipoDocumento } from '@/interfaces/TipoDocumento'
import { getLabelTipoDocumento } from '@/helpers/getLabelDocumento'
import { validateCliente } from '@/validations/ClienteValidation'
import { toast } from 'sonner'
import { actualizarCliente, crearCliente } from '@/api/Cliente'

export function ClienteForm({onClose, initialData, onSuccess}: ClienteFormProps){

    const [form, setForm]= useState<Partial<Cliente>>({
        id: initialData?.id || 0,
        nombre_cliente: initialData?.nombre_cliente || "",
        tipodocumento_id: initialData?.tipodocumento_id || 0,
        numero_documento: initialData?.numero_documento || "",
        telefono: initialData?.telefono || "",
        email: initialData?.email || ""
    })

    const [documentos, setDocumentos]= useState<TipoDocumento[]>([]);

    useEffect(()=>{
        const fetchDocumentos = async () =>{
            try{
                const data = await getTipoDocumento();
                setDocumentos(data)
            }catch(error)
            {
                console.error(error);
                return [];
            }
        };
        fetchDocumentos();
    }, [])

    const [tipo, setTipo] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e:React.FormEvent)=>{


        // toast("Prueba" )
        e.preventDefault()

        const validationErrors = validateCliente(form);
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0)
        {
            console.log("errores", validationErrors)
            return
        }

        try{
            if(initialData)
            {
                const updateCliente = {
                    ...form,
                }
                await actualizarCliente(updateCliente, Number(form.id));
                toast("El cliente ha sido actualizado exitosamente");
            }else if(!initialData)
            {
                const newCliente = {
                    ...form
                }
                await crearCliente(newCliente);
                toast("El cliente ha sido creado con exito");
            }
            onSuccess?.()
            onClose()
        }catch(error)
        {
            console.error(`Error al tratar de
                ${initialData ? "Editar" : "Crear"} un usuario,
                error: `, error );

            toast(`Error al tratar de ${initialData ? "Editar" : "Crear"} un usuario`)
        }


        console.log("prueba pasada");
        // onClose()
    }



  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-2xl font-bold text-center flex items-center justify-center gap-2'>
                <UserCheck className='text-blue-600'/>
                {initialData ? "Editar Cliente" : "Crear Cliente"}
            </CardTitle>
            {/* <CardDescription>

            </CardDescription> */}
        </CardHeader>

        <CardContent>
            <form onSubmit={handleSubmit}>
                <div>
                    {form.id && <input type="hidden" id='id_cliente' value={form.id} />}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className='space-y-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Building2 className="h-4 w-4 text-blue-600" />
                            Nombre de la empresa
                        </Label>
                        <Input
                            value={form.nombre_cliente}
                            onChange={(e)=>{
                                const nombre_cliente = e.target.value;
                                setForm((prev) => ({...prev, nombre_cliente : nombre_cliente}))
                            }}
                            className='h-11'
                            id="nombre_cliente"
                            placeholder="Ingresa el nombre de la empresa"
                        />
                        {errors.nombre_cliente && (
                            <p className='text-red-500 text-sm'>{errors.nombre_cliente}</p>
                        )}
                    </div>

                <div className='space-y-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <FileText className='h-4 w-4 text-orange-600' />
                            Tipo de Documento
                        </Label>
                        <Select
                        value={form.tipodocumento_id?.toString()}

                        onValueChange={
                            (value)=>{

                            setTipo(value)
                            setForm((prev)=>({...prev, tipodocumento_id: Number(value)}))
                            console.log("valor",value)

                        }}>
                            <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                documentos.map((doc) => (
                                    <SelectItem key={doc.id} value={doc.id.toString()}>
                                        {doc.nombre}
                                    </SelectItem>
                                ))
                                }
                            </SelectContent>
                        </Select>
                        {errors.tipodocumento_id && (
                            <p className='text-red-500 text-sm'>{errors.tipodocumento_id}</p>
                        )}
                    </div>
                </div>

                <div className='max-w-3xl gap-6'>
                    <div className='space-y-2'>
                        <Label htmlFor="tipoDocumento" className='flex items-center gap-2 text-sm font-medium'>
                        <IdCard className="h-4 w-4 text-purple-600" />
                            {
                                getLabelTipoDocumento(Number(tipo))
                            }
                        </Label>
                        <Input
                            value={form.numero_documento}
                            onChange={(e)=>{
                                const numeroIdentidad = e.target.value
                                setForm((prev)=>({...prev, numero_documento: numeroIdentidad}))
                                console.log(numeroIdentidad)
                            }}
                            className='h-14 text-lg px-4 w-full'
                            type="text"
                            id="tipoDocumento"
                            placeholder="Ingresa el nombre de la empresa"
                        />
                        {errors.numero_documento && (
                            <p className='text-red-500 text-sm'>{errors.numero_documento}</p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2 mt-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Phone className="h-4 w-4 text-green-600" />
                            Telefono
                        </Label>
                        <Input
                            value={form.telefono}
                            onChange={(e)=>{
                                const telefono = e.target.value;
                                setForm((prev) => ({...prev, telefono: telefono}))
                                console.log(telefono)
                            }}
                            className='h-11'
                            type="text" id="email"
                            placeholder="Ingresa el telefono"
                        />
                        {errors.telefono && (
                            <p className='text-red-500 text-sm'>{errors.telefono}</p>
                        )}
                    </div>


                    <div className='space-y-2 mt-2'>
                        <Label htmlFor="email" className='flex items-center gap-2 text-sm font-medium'>
                        <Mail className="h-4 w-4 text-pink-600" />
                            Email
                        </Label>
                        <Input
                            value={form.email}
                            onChange={(e)=>{
                                const email = e.target.value
                                setForm((prev)=>({...prev, email: email}))
                                console.log(email)
                            }}
                            className='h-11'
                            type="text"
                            id="email"
                            placeholder="Ingresa el email"
                        />
                        {errors.email && (
                            <p className='text-red-500 text-sm'>{errors.email}</p>
                        )}
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-6">
                    <Button onClick={onClose} type="button" variant="outline" className="h-11 px-8 bg-transparent">
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

