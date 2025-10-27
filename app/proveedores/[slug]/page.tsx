// app/proveedores/[slug]/page.tsx
import { getProveedorBySlug, getProductos } from '@/lib/cosmic'
import { Proveedor, Producto } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProveedorPage({ params }: PageProps) {
  const { slug } = await params
  
  const [proveedor, todosProductos] = await Promise.all([
    getProveedorBySlug(slug),
    getProductos(),
  ])
  
  if (!proveedor) {
    notFound()
  }

  const proveedorData = proveedor as Proveedor
  const productosData = todosProductos as Producto[]
  
  // Filter products by supplier
  const productosProveedor = productosData.filter((producto) => {
    if (typeof producto.metadata?.proveedor === 'object') {
      return producto.metadata.proveedor.id === proveedorData.id
    }
    return producto.metadata?.proveedor === proveedorData.id
  })

  const banner = proveedorData.metadata?.banner?.imgix_url
  const logo = proveedorData.metadata?.logo?.imgix_url

  return (
    <div className="py-12 bg-gray-50">
      {/* Proveedor Header */}
      <div className="bg-white shadow-md mb-8">
        {banner && (
          <div className="relative h-64 overflow-hidden">
            <img
              src={`${banner}?w=2400&h=600&fit=crop&auto=format,compress`}
              alt={proveedorData.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-start gap-6 ${banner ? '-mt-16' : 'py-8'} relative z-10`}>
            {logo && (
              <img
                src={`${logo}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={proveedorData.title}
                className="w-32 h-32 rounded-lg object-cover shadow-lg bg-white p-2"
              />
            )}
            
            <div className="flex-1 pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${banner ? 'text-white' : 'text-gray-900'}`}>
                    {proveedorData.title}
                  </h1>
                  {proveedorData.metadata?.verificado && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-500 text-white">
                      ✅ Proveedor Verificado
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Proveedor Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre el Proveedor</h2>
              {proveedorData.metadata?.descripcion && (
                <div 
                  className="text-gray-600 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: proveedorData.metadata.descripcion }}
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información</h3>
              <dl className="space-y-3 text-sm">
                {proveedorData.metadata?.pais && (
                  <div>
                    <dt className="text-gray-600">País de Origen</dt>
                    <dd className="font-semibold text-gray-900">{proveedorData.metadata.pais}</dd>
                  </div>
                )}
                
                {proveedorData.metadata?.tiempo_envio && (
                  <div>
                    <dt className="text-gray-600">Tiempo de Envío</dt>
                    <dd className="font-semibold text-gray-900">{proveedorData.metadata.tiempo_envio}</dd>
                  </div>
                )}
                
                {proveedorData.metadata?.rating && (
                  <div>
                    <dt className="text-gray-600">Calificación</dt>
                    <dd className="font-semibold text-gray-900">{proveedorData.metadata.rating.value}</dd>
                  </div>
                )}
              </dl>
            </div>

            {(proveedorData.metadata?.email || proveedorData.metadata?.whatsapp) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contacto</h3>
                <div className="space-y-3 text-sm">
                  {proveedorData.metadata.email && (
                    <div>
                      <dt className="text-gray-600 mb-1">Email</dt>
                      <dd className="font-semibold text-primary">{proveedorData.metadata.email}</dd>
                    </div>
                  )}
                  
                  {proveedorData.metadata.whatsapp && (
                    <div>
                      <dt className="text-gray-600 mb-1">WhatsApp</dt>
                      <dd className="font-semibold text-green-600">{proveedorData.metadata.whatsapp}</dd>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Productos del Proveedor */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Productos de {proveedorData.title}
          </h2>
          
          {productosProveedor.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Este proveedor no tiene productos disponibles en este momento</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">
                  {productosProveedor.length} {productosProveedor.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosProveedor.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}