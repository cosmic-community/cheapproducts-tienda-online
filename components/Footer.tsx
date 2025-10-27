export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CheapProducts</h3>
            <p className="text-gray-400">
              Tu tienda online de productos baratos de calidad desde China
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categorías</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/categorias/ropa-de-hombre" className="hover:text-white transition-colors">Ropa de Hombre</a></li>
              <li><a href="/categorias/ropa-de-mujer" className="hover:text-white transition-colors">Ropa de Mujer</a></li>
              <li><a href="/categorias/vaper-y-e-cigarrillos" className="hover:text-white transition-colors">Vaper</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/productos" className="hover:text-white transition-colors">Productos</a></li>
              <li><a href="/packs" className="hover:text-white transition-colors">Packs</a></li>
              <li><a href="/proveedores" className="hover:text-white transition-colors">Proveedores</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p className="text-gray-400">
              Email: info@cheapproducts.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CheapProducts. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}