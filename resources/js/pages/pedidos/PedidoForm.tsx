import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Pedido, PedidoFormProps } from '@/interfaces/Pedido'
import { Button } from '@/components/ui/button'
import { Banknote, Calendar1Icon, Coins, HandCoins, Info, Map, Notebook, Percent, Truck, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import {Calendar} from '@/components/ui/calendar'
import {Popover} from '@/components/ui/popover'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from "date-fns"
import { Textarea } from "@/components/ui/textarea"
import {ClienteOption } from '@/interfaces/Cliente'
import ClienteSelect from '@/pages/selects/ClienteSelect'
import RepartidorSelect from '@/pages/selects/RepartidorSelect'
import { RepartidorOption } from '@/interfaces/Repartidor'
import { ZonaOption } from '@/interfaces/Zona'
import ZonaSelect from '../selects/ZonaSelect'
import { validatePedido } from '@/validations/PedidoValidation'
import { getColorEstado } from '@/helpers/getEstadoColor'
import { actualizarPedido, crearPedido } from '@/api/Pedido'
import { toast } from "sonner"

export default function PedidoForm({onClose, initialData}: PedidoFormProps){

    const [form, setForm] = useState<Omit<Pedido, "id">>({
        codigo_pedido: initialData?.codigo_pedido || "",
        cliente_id: initialData?.cliente_id || null,
        repartidor_id: initialData?.repartidor_id || null,
        zona_id: initialData?.zona_id || null,
        precio: initialData?.precio || 0,
        fecha_pedido: initialData?.fecha_pedido ? new Date(initialData.fecha_pedido): new Date(),
        fecha_entrega: initialData?.fecha_entrega ? new Date(initialData.fecha_entrega): new Date(),
        estado: initialData?.estado || '',
        porcentaje_marca: initialData?.porcentaje_marca || 10,
        porcentaje_mensajero: initialData?.porcentaje_mensajero || 10,
        recaudo_empresa: initialData?.recaudo_empresa || 0,
        recaudo_mensajero: initialData?.recaudo_mensajero || 0,
        total_mensajero: initialData?.total_mensajero || 0,
        observacion: initialData?.observacion || ''
    });

    const [fechaPedido] = useState<Date | undefined>(new Date());;
    const [fechaEntrega] = useState<Date | undefined>(new Date());

    const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteOption | null>(null);
    const [repartidorSeleccionado, setRepartidorSeleccionado] = useState<RepartidorOption | null>(null);
    const [zonaSeleccionado, setZonaSeleccionado] = useState<ZonaOption | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [valorBaseMensajero, setValorBaseMensajero] = useState(form.total_mensajero); // Valor inicial
    const [valorAdicional, setValorAdicional] = useState(0);

    useEffect(()=>{

        if (initialData) {
            const fechaPedidoLocal = initialData.fecha_pedido
                ? new Date(initialData.fecha_pedido + "T00:00:00") // Asegura que se interprete como local
                : new Date();

            const fechaEntregaLocal = initialData.fecha_entrega
                ? new Date(initialData.fecha_entrega + "T00:00:00") // Asegura que se interprete como local
                : new Date();

            setForm((prev) => ({
                ...prev,
                fecha_pedido: fechaPedidoLocal,
                fecha_entrega: fechaEntregaLocal,
            }));
        }

        if(initialData?.cliente_id && initialData.cliente){
            const clienteOption: ClienteOption ={
                value: initialData.cliente_id,
                label: String(initialData.cliente.nombre_cliente)
            }

            setClienteSeleccionado(clienteOption)
            setForm(prev=> ({...prev, cliente_id: clienteOption.value}))
        }

        if(initialData?.repartidor_id && initialData.repartidor){
            const repartidorOption : RepartidorOption = {
                value: initialData.repartidor_id,
                label: initialData.repartidor.nombre +''+ initialData.repartidor.apellido,
                porcentaje_marca: initialData.repartidor.porcentaje_marca,
                porcentaje_repartidor: initialData.repartidor.porcentaje_repartidor
            }

            setRepartidorSeleccionado(repartidorOption)
            setForm(prev => ({...prev, repartidor_id: repartidorOption.value}))
        }

        if(initialData?.zona_id && initialData.zona){
            const zonaOption: ZonaOption = {
                value: initialData.zona_id,
                label: initialData.zona.nombre,
                precio: initialData.zona.precio_sugerido
            }

            setZonaSeleccionado(zonaOption)
            setForm(prev=> ({...prev, zona_id: zonaOption.value}))
        }

    }, [initialData]);


    const handleSubmit = async (e: React.FormEvent) => {
        toast("Event has been created.")

        e.preventDefault()

        const validationErrors = validatePedido(form)
        setErrors(validationErrors)

        console.log('cliente id', clienteSeleccionado?.value)

        if (Object.keys(validationErrors).length > 0) {
            console.log("errores", validationErrors)
            return
        }

        try{
            //para editar
            if(initialData){
                const updatePedido = {
                    ...form,
                    cliente_id: clienteSeleccionado?.value || null,
                    repartidor_id: repartidorSeleccionado?.value || null,
                    zona_id: zonaSeleccionado?.value || null
                }

                await actualizarPedido(initialData.id, updatePedido);
            }else{
                const newPedido = {
                    ...form,
                    cliente_id: clienteSeleccionado?.value || null,
                    repartidor_id: repartidorSeleccionado?.value || null,
                    zona_id: zonaSeleccionado?.value || null
                }
                await crearPedido(newPedido)
            }

            onClose();
        }catch(error){
            console.error("Error al guardar el pedido", error);
        }

    }


    return (
    <Card>
        <CardHeader>
            <CardTitle>
                {initialData ? `Pedido ${initialData.codigo_pedido}` : ""}
            </CardTitle>
            <CardDescription>
                {initialData && (
                    <p className={`text-sm ${getColorEstado(initialData.estado)}`}>
                        Estado del pedido:  {initialData.estado.toUpperCase()}
                    </p>
                )}
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4 text-blue-800" />
                            Cliente
                        </Label>
                            <ClienteSelect
                                value={clienteSeleccionado}
                                onChange={(option: ClienteOption | null) => {
                                    setClienteSeleccionado(option);
                                    setForm((prev) => ({ ...prev, cliente_id: option?.value ?? null }));
                                }}
                            />
                            {clienteSeleccionado && (
                                <div className="text-sm text-muted-foreground mb-2 mt-2">
                                Cliente seleccionado: {clienteSeleccionado.label}
                                </div>
                            )}
                            {errors.cliente_id && (
                                <p className="text-red-500 text-sm">{errors.cliente_id}</p>
                            )}
                    </div>

                    <div className='space-y-2'>
                        <Label className='flex items-center gap-2 text-sm font-medium'>
                            <Truck className='h-4 w-4 text-pink-900'/>
                            Repartidor
                        </Label>
                            <RepartidorSelect
                                value={repartidorSeleccionado}
                                onChange={(option: RepartidorOption | null)=>{
                                    console.log(option)
                                    setRepartidorSeleccionado(option)
                                    setForm((prev)=> ({...prev,
                                        repartidor_id: option?.value ?? 1,
                                        porcentaje_marca: option?.porcentaje_marca ?? 1,
                                        porcentaje_mensajero: option?.porcentaje_repartidor ?? 1
                                    }))
                                }}
                            />

                        {repartidorSeleccionado && (
                            <div className='text-sm text-muted-foreground mb-2 mt-2'>
                                Repartidor seleccionado: {repartidorSeleccionado.label}
                            </div>
                        )}
                        {errors.repartidor_id && (
                            <p className="text-red-500 text-sm">{errors.repartidor_id}</p>
                        )}
                    </div>
                </div>

                <div className='max-w-3xl mt-2'>
                    <div className='space-y-2'>
                        <Label className='flex items-start justify-start gap-2 font-medium'>
                            <Map className='h-4 w-4 text-purple-900' />
                            Zona
                        </Label>
                        <ZonaSelect
                            value={zonaSeleccionado}
                            onChange={(option:ZonaOption | null) => {
                                console.log(option)
                                setZonaSeleccionado(option)
                                setForm((prev)=>({...prev,
                                    zona_id: option?.value ?? 1,
                                    precio: option ? Number(option.precio) : 0,
                                    total_mensajero: option ? Number(option.precio) : 0
                                }))
                                setValorBaseMensajero(option?.precio ?? 0)
                                console.log("prueba", valorBaseMensajero)
                            }}
                        />

                        {zonaSeleccionado && (
                            <div className='text-sm text-muted-foreground mb-2 mt-2'>
                                Zona seleccionado: {zonaSeleccionado.label}
                            </div>
                        )}
                        {errors.zona_id && (
                            <p className="text-red-500 text-sm">{errors.zona_id}</p>
                        )}
                    </div>
                </div>

                <div className='max-w-3xl mt-2'>
                    <div className='space-y-2'>
                        <Label className='flex items-start justify-start gap-2 font-medium'>
                            <Banknote className='h-4 w-4 text-amber-300' />
                            Precio
                        </Label>
                        <Input
                            readOnly
                            value={
                                new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits:0
                                }).format(form.precio)
                            }
                            className='h-10 text-sm px-4 w-full'
                            placeholder='Ingresa el precio'
                            onChange={(e)=>{
                                const nuevoPrecio = parseFloat(e.target.value) || 0;
                                setForm((prev)=>({
                                    ...prev,
                                    precio: nuevoPrecio,
                                    total_mensajero: prev.total_mensajero + nuevoPrecio
                                }))
                            }}
                        />
                        {errors.precio && (
                            <p className="text-red-500 text-sm">{errors.precio}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {/* Fecha Pedido */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                        <Calendar1Icon className="h-4 w-4 text-blue-700" />
                        Fecha pedido
                        </Label>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            data-empty={!form.fecha_pedido}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                            {fechaPedido ? format(form.fecha_pedido, "PPP") : <span>Selecciona una fecha</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar required={false}
                            mode="single"
                            selected={form.fecha_pedido}
                            onSelect={(date)=> setForm((prev)=>({...prev, fecha_pedido: date || new Date()}))}
                            initialFocus
                        />
                        </PopoverContent>
                        </Popover>
                        {errors.fecha_pedido &&(
                            <p className='text-red-500 text-sm'>{errors.fecha_pedido}</p>
                        )}
                    </div>

                    {/* Fecha Entrega */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                        <Calendar1Icon className="h-4 w-4 text-green-700" />
                        Fecha entrega
                        </Label>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            data-empty={!form.fecha_entrega}
                            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                            >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                                {fechaEntrega ? (
                                format(form.fecha_entrega, "PPP")
                                ) : (
                                <span>Selecciona una fecha</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                required={false}
                                mode="single"
                                selected={form.fecha_entrega}
                                onSelect={(date)=> setForm((prev)=>({...prev,  fecha_entrega: date || new Date()}))}
                                initialFocus
                             />
                        </PopoverContent>
                        </Popover>
                        {errors.fecha_entrega &&(
                            <p className='text-red-500 text-sm'>{errors.fecha_entrega}</p>
                        )}
                    </div>
                </div>

                <div className='max-w-3xl mt-2'>
                    <div className='space-y-2'>
                        <Label className='flex items-start justify-start gap-2 font-medium'>
                            <Info className='h-4 w-4 text-red-600' />
                            Estado
                        </Label>
                        <Select defaultValue='pendiente'>
                            <SelectTrigger>
                                <SelectValue placeholder='Seleccione un estado' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='pendiente'><p className='text-yellow-600'>Pendiente</p></SelectItem>
                                <SelectItem value='asignado'><p className='text-purple-600'>Asignado</p></SelectItem>
                                <SelectItem value='en camino'><p className='text-blue-600'>En camino</p></SelectItem>
                                <SelectItem value='cancelado'><p className='text-red-600'>Cancelado</p></SelectItem>
                                <SelectItem value='entregado'><p className='text-green-600'>Entregado</p></SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && (
                            <p className='text-red-500 text-sm'>{errors.estado}</p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <Label className='flex items-center gap-2 text-sm font-medium'>
                            <Percent className='h-4 w-4 text-teal-400'/>
                            Porcentaje Marca
                        </Label>
                        <Input readOnly value={form.porcentaje_marca} placeholder='Ingrese un porcentaje'/>
                        {errors.porcentaje_marca && (
                            <p className='text-red-500 text-sm'>{errors.porcentaje_marca}</p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label className='flex items-center gap-2 text-sm font-medium'>
                            <Percent className='h-4 w-4 text-lime-400'/>
                            Porcentaje Mensajero
                        </Label>
                        <Input readOnly value={form.porcentaje_mensajero} placeholder='Ingrese un porcentaje'/>
                        {errors.porcentaje_mensajero &&(
                            <p className='text-red-500 text-sm'>{errors.porcentaje_mensajero}</p>
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-2'>
                    <div className='space-y-2'>
                        <Label className='flex items-center gap-2 text-sm font-medium'>
                            <HandCoins className='h-4 w-4 text-amber-800'/>
                            Recaudo Mensajero
                        </Label>
                        <Input
                            value={form.recaudo_mensajero}
                            onChange={(e) => {
                                const valor = e.target.value.replace(/[^\d]/g, '');
                                const nuevoValorAdicional = parseFloat(valor) || 0;
                                const total = nuevoValorAdicional + valorBaseMensajero + (form.recaudo_empresa || 0);


                                setValorAdicional(nuevoValorAdicional);
                                setForm({...form, recaudo_mensajero: Number(valor), total_mensajero: total});

                                console.log(total, "valor total");
                            }}
                            placeholder='Ingrese un valor de recaudo'
                        />
                        <p className='text-sm text-muted-foreground'>
                            {
                                new Intl.NumberFormat("es-CO",{
                                    style:"currency",
                                    currency:"COP",
                                    minimumFractionDigits:0
                                }).format(form.recaudo_mensajero || 0)
                            }
                        </p>
                        {errors.recaudo_mensajero && (
                            <p className='text-red-500 text-sm'>{errors.recaudo_mensajero}</p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label className='flex items-center gap-2 text-sm font-medium'>
                            <HandCoins className='h-4 w-4 text-fuchsia-400'/>
                            Recaudo Empresa
                        </Label>
                        <Input
                            type='number'
                            value={form.recaudo_empresa || ''}
                            onChange={(e) => {
                                const valor = parseFloat(e.target.value) || 0;
                                const total = valor + valorAdicional + valorBaseMensajero;
                                setForm((prev) => ({
                                    ...prev,
                                    recaudo_empresa: valor,
                                    total_mensajero: total
                                }));

                                console.log({
                                    'Recaudo Empresa': valor,
                                    'Valor Adicional': valorAdicional,
                                    'Valor Base': valorBaseMensajero,
                                    'Total': valor + valorAdicional + valorBaseMensajero
                                });
                            }}
                            placeholder="Ingrese un valor"
                        />
                        <p className='text-sm text-muted-foreground'>
                            {
                                new Intl.NumberFormat("es-CO", {
                                    style:"currency",
                                    currency: "COP",
                                    minimumFractionDigits:0
                                }).format(form.recaudo_empresa)
                            }
                        </p>
                        {errors.recaudo_empresa && (
                            <p className='text-red-500 text-sm'>{errors.recaudo_empresa}</p>
                        )}
                    </div>
                </div>

                <div className='max-w-3xl mt-2'>
                    <Label className='flex items-center gap-2 text-sm font-medium'>
                        <Notebook className='h-4 w-4' />
                        Observaciones
                    </Label>
                    <Textarea
                        onChange={(e)=>{
                            console.log(e.target.value)
                        }}
                        placeholder='Ingresa una observacion'
                    />
                </div>

                <div className='max-w-3xl mt-4'>
                    <Label className='flex items-center justify-center text-xl'>
                        <Coins className='h-8 w-8'/>
                        Total Mensajero
                    </Label>
                    <Input
                        readOnly
                        value={
                            new Intl.NumberFormat("es-CO", {
                                style: "currency",
                                currency:"COP",
                                minimumFractionDigits: 0
                            }).format(form.total_mensajero)
                        }
                        className='h-12 px-4 text-lg font-medium'
                        placeholder='Ingrese un total'
                    />
                    {errors.total_mensajero && (
                        <p className='text-red-500 text-sm'>{errors.total_mensajero}</p>
                    )}
                </div>

                <div className=' flex mt-2 gap-6 justify-center'>
                    <Button type='submit'>
                        prueba
                    </Button>
                    <Button onClick={onClose}>
                        Cerrar
                    </Button>
                </div>

            </form>



        </CardContent>
    </Card>
  )
}

