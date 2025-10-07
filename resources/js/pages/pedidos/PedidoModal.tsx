import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { PedidoModalProps } from '@/interfaces/Pedido'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import PedidoForm from './PedidoForm'

export default function PedidoModal({open, onClose, initialData}:PedidoModalProps){
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle>
                    {initialData ? "Editar Pedido" : "Crear Pedido   "}
                </DialogTitle>
            </DialogHeader>

        <div className="max-h-[90vh] overflow-y-auto p-2">
          <PedidoForm
            onClose={onClose}
            initialData={initialData}
          />
        </div>
        </DialogContent>
    </Dialog>
  )
}
