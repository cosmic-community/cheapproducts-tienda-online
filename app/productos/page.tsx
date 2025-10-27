import { getProductos, getCategorias } from '@/lib/cosmic'
import { Producto, Categoria } from '@/types'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'

export const metadata = {
  title: 'Productos - CheapProducts',
  description: 'Explora nuestro catálogo completo de productos baratos de calidad',
}

export default async function ProductosPage() {
  const [productos, categorias] = await Promise.all([
    getProductos(),
    getCategorias(),
  ])

  const productosData = productos as Producto[]
  const categoriasData = categorias as Categoria[]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todos los Productos
          </h1>
          <p className="text-lg text-gray-600">
            Descubre nuestra selección completa de productos con los mejores precios
          </p>
        </div>

        <div className="mb-8">
          <ProductFilters categorias={categoriasData} />
        </div>

        {productosData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No se encontraron productos</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosData.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Mostrando {productosData.length} productos
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}