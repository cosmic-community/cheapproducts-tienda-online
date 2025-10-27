import { getPacks } from '@/lib/cosmic'
import { Pack } from '@/types'
import PackCard from '@/components/PackCard'

export const metadata = {
  title: 'Packs Especiales - CheapProducts',
  description: 'Ahorra más con nuestros packs especiales de productos',
}

export default async function PacksPage() {
  const packs = await getPacks() as Pack[]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Packs Especiales
          </h1>
          <p className="text-lg text-gray-600">
            Combina productos y ahorra. Los mejores packs con descuentos exclusivos
          </p>
        </div>

        {packs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay packs disponibles en este momento</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}