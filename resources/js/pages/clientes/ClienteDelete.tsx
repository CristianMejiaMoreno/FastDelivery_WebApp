import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ClienteDeleteModalProps } from '@/interfaces/Cliente'
import React from 'react'





export function ClienteDelete({open, onClose, data}: ClienteDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    ¿Estas seguro de borrar el registro de {data?.nombre_cliente}?
                </DialogTitle>
                <DialogDescription>
                    This action cannot be undone. Are you sure you want to permanently
                    delete this file from our servers?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button className='bg-red-700 hover:bg-red-600' onClick={onClose}>
                    Cerrar
                </Button>
                <Button>Prueba</Button>
            </DialogFooter>


        </DialogContent>
    </Dialog>
  )
}
