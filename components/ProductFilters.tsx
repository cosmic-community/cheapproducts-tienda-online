'use client'

import { Categoria } from '@/types'
import { useState } from 'react'

interface ProductFiltersProps {
  categorias: Categoria[]
}

export default function ProductFilters({ categorias }: ProductFiltersProps) {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('all')

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Todas las categorías</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.slug}>
                {categoria.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ordenar por
          </label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más Nuevos</option>
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Filtrar
          </button>
        </div>
      </div>
    </div>
  )
}