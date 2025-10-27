// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Categoria interface
export interface Categoria extends CosmicObject {
  type: 'categorias';
  metadata: {
    nombre: string;
    descripcion?: string;
    imagen_categoria?: {
      url: string;
      imgix_url: string;
    };
    color_tema?: string;
    orden?: number;
  };
}

// Proveedor interface
export interface Proveedor extends CosmicObject {
  type: 'proveedores';
  metadata: {
    nombre_proveedor: string;
    descripcion?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    banner?: {
      url: string;
      imgix_url: string;
    };
    pais?: string;
    tiempo_envio?: string;
    rating?: {
      key: string;
      value: string;
    };
    email?: string;
    whatsapp?: string;
    verificado?: boolean;
  };
}

// Producto interface
export interface Producto extends CosmicObject {
  type: 'productos';
  metadata: {
    nombre: string;
    descripcion_corta: string;
    descripcion_completa?: string;
    imagen_principal: {
      url: string;
      imgix_url: string;
    };
    galeria?: Array<{
      url: string;
      imgix_url: string;
    }>;
    sku: string;
    precio_regular: number;
    precio_oferta?: number;
    stock: number;
    categoria: Categoria | string;
    proveedor?: Proveedor | string;
    tallas?: string[];
    colores?: string;
    especificaciones?: Record<string, any>;
    etiqueta?: {
      key: string;
      value: string;
    };
    destacado?: boolean;
    disponible?: boolean;
    peso?: number;
  };
}

// Pack interface
export interface Pack extends CosmicObject {
  type: 'packs';
  metadata: {
    nombre_pack: string;
    descripcion: string;
    imagen_pack: {
      url: string;
      imgix_url: string;
    };
    productos_incluidos: Producto[];
    precio_pack: number;
    precio_individual_total: number;
    ahorro: number;
    stock_pack: number;
    categoria?: Categoria | string;
    oferta_especial?: boolean;
    fecha_expiracion?: string;
  };
}

// Resena interface
export interface Resena extends CosmicObject {
  type: 'resenas';
  metadata: {
    nombre_cliente: string;
    producto: Producto;
    calificacion: {
      key: string;
      value: string;
    };
    comentario: string;
    fecha: string;
    verificada?: boolean;
    fotos?: Array<{
      url: string;
      imgix_url: string;
    }> | null;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProducto(obj: CosmicObject): obj is Producto {
  return obj.type === 'productos';
}

export function isPack(obj: CosmicObject): obj is Pack {
  return obj.type === 'packs';
}

export function isCategoria(obj: CosmicObject): obj is Categoria {
  return obj.type === 'categorias';
}

export function isProveedor(obj: CosmicObject): obj is Proveedor {
  return obj.type === 'proveedores';
}

export function isResena(obj: CosmicObject): obj is Resena {
  return obj.type === 'resenas';
}