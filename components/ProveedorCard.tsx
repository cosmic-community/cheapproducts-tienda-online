import { Proveedor } from '@/types'
import Link from 'next/link'

interface ProveedorCardProps {
  proveedor: Proveedor
}

export default function ProveedorCard({ proveedor }: ProveedorCardProps) {
  const banner = proveedor.metadata?.banner?.imgix_url
  const logo = proveedor.metadata?.logo?.imgix_url || proveedor.thumbnail

  return (
    <Link href={`/proveedores/${proveedor.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        {banner && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${banner}?w=1200&h=400&fit=crop&auto=format,compress`}
              alt={proveedor.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            {logo && (
              <img
                src={`${logo}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={proveedor.title}
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
            )}
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {proveedor.title}
              </h3>
              
              {proveedor.metadata?.verificado && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  ✅ Verificado
                </span>
              )}
            </div>
          </div>
          
          {proveedor.metadata?.descripcion && (
            <div 
              className="text-sm text-gray-600 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: proveedor.metadata.descripcion }}
            />
          )}
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            {proveedor.metadata?.pais && (
              <div>
                <span className="text-gray-600">País:</span>
                <span className="ml-2 font-semibold">{proveedor.metadata.pais}</span>
              </div>
            )}
            
            {proveedor.metadata?.tiempo_envio && (
              <div>
                <span className="text-gray-600">Envío:</span>
                <span className="ml-2 font-semibold">{proveedor.metadata.tiempo_envio}</span>
              </div>
            )}
            
            {proveedor.metadata?.rating && (
              <div className="col-span-2">
                <span className="text-gray-600">Calificación:</span>
                <span className="ml-2 font-semibold">{proveedor.metadata.rating.value}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}