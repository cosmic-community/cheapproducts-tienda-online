import { getProductosDestacados, getPacks, getCategorias } from '@/lib/cosmic'
import { Producto, Pack, Categoria } from '@/types'
import ProductCard from '@/components/ProductCard'
import PackCard from '@/components/PackCard'
import CategoryCard from '@/components/CategoryCard'
import Hero from '@/components/Hero'

export default async function Home() {
  const [productos, packs, categorias] = await Promise.all([
    getProductosDestacados(),
    getPacks(),
    getCategorias(),
  ])

  const productosDestacados = productos as Producto[]
  const packsEspeciales = packs as Pack[]
  const categoriasData = categorias as Categoria[]

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra exactamente lo que buscas en nuestras categorías especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriasData.map((categoria) => (
              <CategoryCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600">
              Los productos más populares y mejor valorados de nuestra tienda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosDestacados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/productos"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todos los Productos
            </a>
          </div>
        </div>
      </section>

      {/* Packs Section */}
      {packsEspeciales.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Packs Especiales
              </h2>
              <p className="text-lg text-gray-600">
                Ahorra más comprando nuestros packs con descuentos combinados
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packsEspeciales.map((pack) => (
                <PackCard key={pack.id} pack={pack} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="/packs"
                className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Ver Todos los Packs
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Envío Internacional</h3>
              <p className="text-gray-600">
                Enviamos a todo el mundo desde China con seguimiento completo
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Mejores Precios</h3>
              <p className="text-gray-600">
                Compramos directamente de fábrica para ofrecerte los mejores precios
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Calidad Verificada</h3>
              <p className="text-gray-600">
                Trabajamos solo con proveedores verificados y de confianza
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}