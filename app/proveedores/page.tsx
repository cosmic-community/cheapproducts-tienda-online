import { getProveedores } from '@/lib/cosmic'
import { Proveedor } from '@/types'
import ProveedorCard from '@/components/ProveedorCard'

export const metadata = {
  title: 'Proveedores - CheapProducts',
  description: 'Conoce a nuestros proveedores verificados de China',
}

export default async function ProveedoresPage() {
  const proveedores = await getProveedores() as Proveedor[]

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Proveedores
          </h1>
          <p className="text-lg text-gray-600">
            Trabajamos con los mejores proveedores verificados de China
          </p>
        </div>

        {proveedores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No hay proveedores disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proveedores.map((proveedor) => (
              <ProveedorCard key={proveedor.id} proveedor={proveedor} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}