"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import RepartidorForm from "./RepartidorForm";
import { Repartidor } from "@/interfaces/Repartidor"

interface RepartidorModalProps {
  open: boolean
  onClose: () => void
  initialData?: Repartidor | null
}

export function RepartidorModal({ open, onClose, initialData }: RepartidorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Repartidor" : "Crear Repartidor"}
          </DialogTitle>
        </DialogHeader>

        <RepartidorForm initialData={initialData} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  )
}
