import { Producto } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const imagenUrl = producto.metadata?.imagen_principal?.imgix_url || producto.thumbnail
  const precioOferta = producto.metadata?.precio_oferta
  const precioRegular = producto.metadata?.precio_regular
  const etiqueta = producto.metadata?.etiqueta?.value
  const descuento = precioOferta && precioRegular 
    ? Math.round((1 - precioOferta / precioRegular) * 100) 
    : 0

  return (
    <Link href={`/productos/${producto.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-square overflow-hidden">
          {imagenUrl && (
            <img
              src={`${imagenUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={producto.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {etiqueta && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {etiqueta}
            </div>
          )}
          
          {descuento > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{descuento}%
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {producto.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {producto.metadata?.descripcion_corta}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              {precioOferta ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    €{precioOferta.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    €{precioRegular?.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-gray-900">
                  €{precioRegular?.toFixed(2)}
                </span>
              )}
            </div>
            
            {producto.metadata?.stock && producto.metadata.stock > 0 ? (
              <span className="text-xs text-green-600 font-semibold">
                En stock
              </span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">
                Agotado
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}