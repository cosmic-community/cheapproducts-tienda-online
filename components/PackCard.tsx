import { Pack } from '@/types'
import Link from 'next/link'

interface PackCardProps {
  pack: Pack
}

export default function PackCard({ pack }: PackCardProps) {
  const imagenUrl = pack.metadata?.imagen_pack?.imgix_url
  const ahorro = pack.metadata?.ahorro || 0
  const precioIndividual = pack.metadata?.precio_individual_total || 0
  const precioPack = pack.metadata?.precio_pack || 0
  const porcentajeAhorro = precioIndividual > 0 
    ? Math.round((ahorro / precioIndividual) * 100)
    : 0

  return (
    <Link href={`/packs/${pack.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative aspect-video overflow-hidden">
          {imagenUrl && (
            <img
              src={`${imagenUrl}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={pack.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {pack.metadata?.oferta_especial && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              🔥 OFERTA ESPECIAL
            </div>
          )}
          
          {porcentajeAhorro > 0 && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
              AHORRA {porcentajeAhorro}%
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">
            {pack.title}
          </h3>
          
          <div 
            className="text-sm text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: pack.metadata?.descripcion || '' }}
          />
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Productos incluidos:</span>
              <span className="font-semibold text-gray-900">
                {pack.metadata?.productos_incluidos?.length || 0}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Precio individual:</span>
              <span className="text-gray-500 line-through">
                €{precioIndividual.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-600 block mb-1">Precio del pack</span>
                <span className="text-3xl font-bold text-secondary">
                  €{precioPack.toFixed(2)}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-sm text-gray-600 block mb-1">Ahorras</span>
                <span className="text-2xl font-bold text-green-600">
                  €{ahorro.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          {pack.metadata?.stock_pack && pack.metadata.stock_pack > 0 ? (
            <div className="mt-4 text-center">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✅ Disponible ({pack.metadata.stock_pack} unidades)
              </span>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">
                ❌ Agotado
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}