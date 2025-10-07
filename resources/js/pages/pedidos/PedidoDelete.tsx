import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { PedidoDeleteProps } from '@/interfaces/Pedido'
import { DialogDescription } from '@radix-ui/react-dialog'
import React from 'react'

export default function PedidoDelete({open, onClose}: PedidoDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Prueba Delete
                </DialogTitle>
                <DialogDescription>
                    lorem
                </DialogDescription>
            </DialogHeader>

                <Button onClick={onClose}>
                    Cancelar
                </Button>
        </DialogContent>
    </Dialog>
  )
}
