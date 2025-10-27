# 🛍️ CheapProducts - Tienda Online de Productos Baratos

![App Preview](https://imgix.cosmicjs.com/9951d0a0-b38a-11f0-a02c-cb6cf59b3d56-photo-1590658268037-6bf12165a8df-1761606833645.jpg?w=1200&h=300&fit=crop&auto=format,compress)

Una plataforma completa de comercio electrónico que ofrece productos baratos de proveedores chinos con una experiencia de compra optimizada, packs especiales y sistema de reseñas.

## ✨ Features

- 🛒 **Catálogo Completo** - Navegación por productos con filtros avanzados
- 📦 **Packs Especiales** - Bundles de productos con descuentos combinados
- ⭐ **Sistema de Reseñas** - Valoraciones verificadas con fotos de clientes
- 🏭 **Perfiles de Proveedores** - Información detallada de cada proveedor
- 🔍 **Búsqueda Avanzada** - Filtrado por categoría, precio, y disponibilidad
- 📱 **Responsive Design** - Experiencia optimizada para móvil y desktop
- 🎨 **Diseño Moderno** - Interfaz limpia con colores vibrantes
- 💰 **Indicadores de Ahorro** - Visualización clara de descuentos y ofertas

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68fffb6e271316ad9f4b64b5&clone_repository=68fffe33271316ad9f4b6521)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Crea una pagina web detallada al 100% y con varios sitios para muchos productos diferentes, diferentes tipos de productos diferentes estilos para cada uno y demas, esta orientada en packs de productos y productos unitarios de proveedores chinos con ropa barata. vaper, etc... todo barato"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Server Components** - Optimized data fetching
- **Bun** - Fast package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with the bucket configured

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=cheap-products-production
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with category and supplier info
const { objects: productos } = await cosmic.objects
  .find({ type: 'productos' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured products
const { objects: destacados } = await cosmic.objects
  .find({ 
    type: 'productos',
    'metadata.destacado': true 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetching Packs

```typescript
// Get all packs with included products
const { objects: packs } = await cosmic.objects
  .find({ type: 'packs' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get special offer packs
const { objects: ofertas } = await cosmic.objects
  .find({ 
    type: 'packs',
    'metadata.oferta_especial': true 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetching Reviews

```typescript
// Get verified reviews for a product
const { objects: resenas } = await cosmic.objects
  .find({ 
    type: 'resenas',
    'metadata.producto': productId,
    'metadata.verificada': true
  })
  .props(['id', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application fully leverages your Cosmic bucket structure:

### Content Types Used

- **Productos** - Individual products with images, pricing, and specifications
- **Packs** - Product bundles with automatic savings calculation
- **Categorías** - Hierarchical organization with custom theme colors
- **Proveedores** - Supplier profiles with ratings and shipping info
- **Reseñas** - Customer reviews with star ratings and photo galleries

### Key Features

- Dynamic routing for products, packs, categories, and suppliers
- Automatic image optimization using imgix URLs
- Real-time stock and availability indicators
- Connected objects via depth parameter for efficient queries
- Type-safe interfaces matching your content model

## 🚀 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Netlify

1. Connect your repository
2. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Environment Variables

Make sure to set these in your deployment platform:

```env
COSMIC_BUCKET_SLUG=cheap-products-production
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📝 License

MIT

<!-- README_END -->