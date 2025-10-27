import { Resena } from '@/types'

interface ReviewsListProps {
  resenas: Resena[]
}

export default function ReviewsList({ resenas }: ReviewsListProps) {
  const calcularPromedioEstrellas = () => {
    if (resenas.length === 0) return 0
    const total = resenas.reduce((sum, resena) => {
      const rating = parseInt(resena.metadata?.calificacion?.key || '0')
      return sum + rating
    }, 0)
    return (total / resenas.length).toFixed(1)
  }

  const renderEstrellas = (rating: string) => {
    const numero = parseInt(rating)
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= numero ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Opiniones de Clientes</h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{calcularPromedioEstrellas()}</div>
            <div className="flex text-yellow-400 mt-2">
              {renderEstrellas(Math.round(parseFloat(calcularPromedioEstrellas())).toString())}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {resenas.length} {resenas.length === 1 ? 'opinión' : 'opiniones'}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {resenas.map((resena) => (
          <div key={resena.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-bold text-gray-900 mb-1">
                  {resena.metadata?.nombre_cliente}
                </div>
                {renderEstrellas(resena.metadata?.calificacion?.key || '0')}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(resena.metadata?.fecha || '').toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {resena.metadata?.verificada && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-3">
                ✅ Compra verificada
              </div>
            )}
            
            <p className="text-gray-700 mb-4">
              {resena.metadata?.comentario}
            </p>
            
            {resena.metadata?.fotos && resena.metadata.fotos.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {resena.metadata.fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={`${foto.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={`Foto ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}