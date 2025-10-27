'use client'

import { Producto } from '@/types'
import { useState } from 'react'

interface ProductGalleryProps {
  producto: Producto
}

export default function ProductGallery({ producto }: ProductGalleryProps) {
  const imagenPrincipal = producto.metadata?.imagen_principal?.imgix_url
  const galeria = producto.metadata?.galeria || []
  const todasImagenes = imagenPrincipal ? [{ imgix_url: imagenPrincipal }, ...galeria] : galeria
  
  const [imagenActual, setImagenActual] = useState(0)

  if (todasImagenes.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No hay imágenes disponibles</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={`${todasImagenes[imagenActual].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={producto.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {todasImagenes.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {todasImagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setImagenActual(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                index === imagenActual ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${imagen.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={`${producto.title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}