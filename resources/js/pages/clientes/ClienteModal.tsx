import {DialogHeader } from '@/components/ui/dialog'
import { ClienteModalProps } from '@/interfaces/Cliente'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { ClienteForm } from './ClienteForm'

export function ClienteModal({open, onClose}:ClienteModalProps){

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Crear cliente
                </DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>

            <ClienteForm />


        </DialogContent>
    </Dialog>
  )

}
