import { Categoria } from '@/types'
import Link from 'next/link'

interface CategoryCardProps {
  categoria: Categoria
}

export default function CategoryCard({ categoria }: CategoryCardProps) {
  const imagenUrl = categoria.metadata?.imagen_categoria?.imgix_url
  const colorTema = categoria.metadata?.color_tema || '#2563eb'

  return (
    <Link href={`/categorias/${categoria.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          {imagenUrl && (
            <img
              src={`${imagenUrl}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={categoria.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ backgroundColor: `${colorTema}20` }}
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {categoria.title}
            </h3>
            {categoria.metadata?.descripcion && (
              <p className="text-white/90 text-sm line-clamp-2">
                {categoria.metadata.descripcion}
              </p>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 group-hover:bg-gray-100 transition-colors">
          <div className="flex items-center justify-between">
            <span 
              className="text-sm font-semibold"
              style={{ color: colorTema }}
            >
              Ver productos
            </span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              style={{ color: colorTema }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}