import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { ZonaModalProps } from '@/interfaces/Zona'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { ZonaForm } from './ZonaForm'

export function ZonaModal({open, onClose}:ZonaModalProps){
  return (
    <Dialog open={open} onOpenChange={onClose}>
       <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Prueba
                </DialogTitle>
            </DialogHeader>

            <ZonaForm />
       </DialogContent>
    </Dialog>
  )
}
