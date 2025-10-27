// app/productos/[slug]/page.tsx
import { getProductoBySlug, getResenasByProducto } from '@/lib/cosmic'
import { Producto, Resena, Proveedor, Categoria } from '@/types'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import ReviewsList from '@/components/ReviewsList'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params
  
  const producto = await getProductoBySlug(slug) as Producto | null
  
  if (!producto) {
    notFound()
  }

  const resenas = await getResenasByProducto(producto.id) as Resena[]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <ProductGallery producto={producto} />
            <ProductInfo producto={producto} />
          </div>
        </div>

        {/* Proveedor Info */}
        {producto.metadata?.proveedor && typeof producto.metadata.proveedor === 'object' && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Proveedor</h2>
            <div className="flex items-start gap-6">
              {(producto.metadata.proveedor as Proveedor).metadata?.logo && (
                <img
                  src={`${(producto.metadata.proveedor as Proveedor).metadata.logo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                  alt={(producto.metadata.proveedor as Proveedor).title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">
                  {(producto.metadata.proveedor as Proveedor).title}
                </h3>
                {(producto.metadata.proveedor as Proveedor).metadata?.descripcion && (
                  <div 
                    className="text-gray-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: (producto.metadata.proveedor as Proveedor).metadata.descripcion }}
                  />
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {(producto.metadata.proveedor as Proveedor).metadata?.pais && (
                    <div>
                      <span className="text-gray-600">País:</span>
                      <span className="ml-2 font-semibold">{(producto.metadata.proveedor as Proveedor).metadata.pais}</span>
                    </div>
                  )}
                  {(producto.metadata.proveedor as Proveedor).metadata?.tiempo_envio && (
                    <div>
                      <span className="text-gray-600">Envío:</span>
                      <span className="ml-2 font-semibold">{(producto.metadata.proveedor as Proveedor).metadata.tiempo_envio}</span>
                    </div>
                  )}
                  {(producto.metadata.proveedor as Proveedor).metadata?.rating && (
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <span className="ml-2 font-semibold">{(producto.metadata.proveedor as Proveedor).metadata.rating.value}</span>
                    </div>
                  )}
                  {(producto.metadata.proveedor as Proveedor).metadata?.verificado && (
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        ✅ Verificado
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {resenas.length > 0 && (
          <div className="mt-8">
            <ReviewsList resenas={resenas} />
          </div>
        )}
      </div>
    </div>
  )
}