import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleDollarSign } from 'lucide-react'
import React from 'react'

export function ZonaForm(){
  return (
    <Card>
        <CardHeader>
            <CardTitle>
                Holaaa
            </CardTitle>
            <CardDescription>
                Esta locura
            </CardDescription>
        </CardHeader>

        <CardContent>
            <form>
                <div className='max-w-3xl gap-6 mt-2'>
                    <div className='space-y-2'>
                        <Label htmlFor="nombre" className='flex items-center gap-2 text-sm font-medium'>
                        <CircleDollarSign className="h-4 w-4 text-purple-600" />
                            Nombre
                        </Label>
                        <Input className='h-14 text-lg px-4 w-full' type="text" id="nombre" placeholder="Ingresa el nombre de la empresa" />
                    </div>
                </div>
                <div className='max-w-3xl gap-6 mt-2'>
                    <div className='space-y-2'>
                        <Label htmlFor='precio' className='flex items-center gap-2 text-sm font-medium'>
                           <CircleDollarSign className='text-pink-900' />
                            Precio
                        </Label>
                        <Input className='h-14 text-lg px-4 w-full' type='precio' id='precio' placeholder='Ingresa el precio'/>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-6">
                    <Button type="button" variant="outline" className="h-11 px-8 bg-transparent">
                    Cancelar
                    </Button>
                    <Button type="submit" className="h-11 px-8 bg-blue-600 hover:bg-blue-700">
                        Crear Zona
                    </Button>
                </div>
            </form>
        </CardContent>
    </Card>
  )
}
