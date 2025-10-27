import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold text-primary">CheapProducts</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/productos" className="text-gray-700 hover:text-primary transition-colors">
              Productos
            </Link>
            <Link href="/packs" className="text-gray-700 hover:text-primary transition-colors">
              Packs
            </Link>
            <Link href="/categorias" className="text-gray-700 hover:text-primary transition-colors">
              Categorías
            </Link>
            <Link href="/proveedores" className="text-gray-700 hover:text-primary transition-colors">
              Proveedores
            </Link>
          </nav>
          
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}