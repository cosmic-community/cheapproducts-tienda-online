// app/categorias/[slug]/page.tsx
import { getCategoriaBySlug, getProductos } from '@/lib/cosmic'
import { Categoria, Producto } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoriaPage({ params }: PageProps) {
  const { slug } = await params
  
  const [categoria, todosProductos] = await Promise.all([
    getCategoriaBySlug(slug),
    getProductos(),
  ])
  
  if (!categoria) {
    notFound()
  }

  const categoriaData = categoria as Categoria
  const productosData = todosProductos as Producto[]
  
  // Filter products by category
  const productosFiltrados = productosData.filter((producto) => {
    if (typeof producto.metadata?.categoria === 'object') {
      return producto.metadata.categoria.id === categoriaData.id
    }
    return producto.metadata?.categoria === categoriaData.id
  })

  const colorTema = categoriaData.metadata?.color_tema || '#2563eb'

  return (
    <div className="py-12 bg-gray-50">
      {/* Category Header */}
      <div 
        className="relative mb-12"
        style={{ backgroundColor: `${colorTema}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {categoriaData.metadata?.imagen_categoria && (
            <div className="absolute inset-0 opacity-10">
              <img
                src={`${categoriaData.metadata.imagen_categoria.imgix_url}?w=1920&h=400&fit=crop&auto=format,compress`}
                alt={categoriaData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="relative text-center">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: colorTema }}
            >
              {categoriaData.title}
            </h1>
            {categoriaData.metadata?.descripcion && (
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {categoriaData.metadata.descripcion}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay productos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}