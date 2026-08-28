import { useState } from "react"
import { MSG2MatrixExplorer } from "./matrix/MSG2MatrixExplorer"
import { ServiceItem } from "../types"

export function ServicesCatalog({ onOpenBooking }: { onOpenBooking?: (serviceId?: string) => void }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MSG2MatrixExplorer 
          onSelectService={(service) => setSelectedService(service)}
          onOpenBooking={onOpenBooking}
        />
      </div>
    </section>
  )
}

