import { Producto, Categoria } from '@/types'

interface ProductInfoProps {
  producto: Producto
}

export default function ProductInfo({ producto }: ProductInfoProps) {
  const precioOferta = producto.metadata?.precio_oferta
  const precioRegular = producto.metadata?.precio_regular
  const descuento = precioOferta && precioRegular 
    ? Math.round((1 - precioOferta / precioRegular) * 100) 
    : 0
  const stock = producto.metadata?.stock || 0
  const disponible = producto.metadata?.disponible && stock > 0

  return (
    <div className="space-y-6">
      <div>
        {producto.metadata?.etiqueta && (
          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
            {producto.metadata.etiqueta.value}
          </span>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {producto.title}
        </h1>
        {producto.metadata?.categoria && typeof producto.metadata.categoria === 'object' && (
          <a 
            href={`/categorias/${(producto.metadata.categoria as Categoria).slug}`}
            className="text-primary hover:underline"
          >
            {(producto.metadata.categoria as Categoria).title}
          </a>
        )}
      </div>

      <div className="border-t border-b py-6">
        <div className="flex items-end gap-4 mb-2">
          {precioOferta ? (
            <>
              <span className="text-4xl font-bold text-primary">
                €{precioOferta.toFixed(2)}
              </span>
              <span className="text-2xl text-gray-500 line-through mb-1">
                €{precioRegular?.toFixed(2)}
              </span>
              {descuento > 0 && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-1">
                  -{descuento}%
                </span>
              )}
            </>
          ) : (
            <span className="text-4xl font-bold text-gray-900">
              €{precioRegular?.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {disponible ? (
            <span className="text-green-600 font-semibold">✅ En stock ({stock} unidades)</span>
          ) : (
            <span className="text-red-600 font-semibold">❌ Agotado</span>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Descripción</h2>
        <p className="text-gray-600">
          {producto.metadata?.descripcion_corta}
        </p>
      </div>

      {producto.metadata?.descripcion_completa && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Detalles</h2>
          <div 
            className="text-gray-600 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: producto.metadata.descripcion_completa }}
          />
        </div>
      )}

      {producto.metadata?.tallas && producto.metadata.tallas.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Tallas disponibles</h2>
          <div className="flex flex-wrap gap-2">
            {producto.metadata.tallas.map((talla) => (
              <span 
                key={talla}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-primary transition-colors cursor-pointer"
              >
                {talla}
              </span>
            ))}
          </div>
        </div>
      )}

      {producto.metadata?.colores && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Colores disponibles</h2>
          <p className="text-gray-600">{producto.metadata.colores}</p>
        </div>
      )}

      {producto.metadata?.especificaciones && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Especificaciones</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(producto.metadata.especificaciones).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <dt className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</dt>
                <dd className="font-semibold text-gray-900">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="pt-6">
        <button 
          disabled={!disponible}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
            disponible
              ? 'bg-primary text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {disponible ? 'Comprar Ahora' : 'No Disponible'}
        </button>
      </div>
    </div>
  )
}