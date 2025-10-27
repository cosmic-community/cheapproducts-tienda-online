import { getCategorias } from '@/lib/cosmic'
import { Categoria } from '@/types'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Categorías - CheapProducts',
  description: 'Explora nuestras categorías de productos',
}

export default async function CategoriasPage() {
  const categorias = await getCategorias() as Categoria[]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Todas las Categorías
          </h1>
          <p className="text-lg text-gray-600">
            Explora nuestras categorías especializadas para encontrar exactamente lo que buscas
          </p>
        </div>

        {categorias.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay categorías disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CategoryCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}