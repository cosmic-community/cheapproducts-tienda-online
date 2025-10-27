// app/packs/[slug]/page.tsx
import { getPackBySlug } from '@/lib/cosmic'
import { Pack } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PackPage({ params }: PageProps) {
  const { slug } = await params
  
  const pack = await getPackBySlug(slug) as Pack | null
  
  if (!pack) {
    notFound()
  }

  const productosIncluidos = pack.metadata?.productos_incluidos || []
  const ahorro = pack.metadata?.ahorro || 0
  const precioIndividual = pack.metadata?.precio_individual_total || 0
  const precioPack = pack.metadata?.precio_pack || 0
  const porcentajeAhorro = precioIndividual > 0 
    ? Math.round((ahorro / precioIndividual) * 100)
    : 0

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pack Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              {pack.metadata?.imagen_pack && (
                <img
                  src={`${pack.metadata.imagen_pack.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                  alt={pack.title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {pack.metadata?.oferta_especial && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg">
                  🔥 OFERTA ESPECIAL
                </div>
              )}
              
              {porcentajeAhorro > 0 && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg text-2xl font-bold shadow-lg">
                  AHORRA {porcentajeAhorro}%
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {pack.title}
                </h1>
                
                <div 
                  className="text-gray-600 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: pack.metadata?.descripcion || '' }}
                />
              </div>

              <div className="border-t border-b py-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Productos incluidos:</span>
                  <span className="font-bold text-gray-900">
                    {productosIncluidos.length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Precio comprando por separado:</span>
                  <span className="text-gray-500 line-through text-lg">
                    €{precioIndividual.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xl">
                  <span className="font-bold text-gray-900">Precio del pack:</span>
                  <span className="font-bold text-secondary text-3xl">
                    €{precioPack.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xl">
                  <span className="font-bold text-gray-900">Total ahorro:</span>
                  <span className="font-bold text-green-600 text-3xl">
                    €{ahorro.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                {pack.metadata?.stock_pack && pack.metadata.stock_pack > 0 ? (
                  <button className="w-full py-4 bg-secondary text-white rounded-lg font-bold text-lg hover:bg-pink-600 transition-colors">
                    Comprar Pack Ahora
                  </button>
                ) : (
                  <button disabled className="w-full py-4 bg-gray-300 text-gray-500 rounded-lg font-bold text-lg cursor-not-allowed">
                    Pack Agotado
                  </button>
                )}
                
                {pack.metadata?.stock_pack && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    {pack.metadata.stock_pack} packs disponibles
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Productos Incluidos */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Productos Incluidos en Este Pack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosIncluidos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}