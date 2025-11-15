import {DialogHeader } from '@/components/ui/dialog'
import { ClienteModalProps } from '@/interfaces/Cliente'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { ClienteForm } from './ClienteForm'

export function ClienteModal({open, onClose, initialData, onSuccess}:ClienteModalProps){

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[700px] max-h-[90vh] flex flex-col'>
            <DialogHeader>
                <DialogTitle>
                    {initialData ? "Editar cliente" : "Crear cliente"}
                </DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>

            <div className="max-h-[90vh] overflow-y-auto p-2">
                <ClienteForm
                    onClose={onClose}
                    initialData={initialData}
                    onSuccess={onSuccess}
                />
            </div>
        </DialogContent>
    </Dialog>
  )

}
