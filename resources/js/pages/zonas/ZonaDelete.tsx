import { Button } from '@/components/ui/button'
import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ZonaDeleteModal } from '@/interfaces/Zona'
import React from 'react'

export function ZonaDelete({open, onClose}:ZonaDeleteModal) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Holaa
                </DialogTitle>
                <DialogDescription>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis nulla repudiandae aperiam quod debitis pariatur, ab sequi id, laborum aspernatur temporibus eligendi? Exercitationem neque est placeat tenetur assumenda aliquam soluta.
                </DialogDescription>
            </DialogHeader>

            <Button>Crearr prueba</Button>

        </DialogContent>
    </Dialog>
  )
}

