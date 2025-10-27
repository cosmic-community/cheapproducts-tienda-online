import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all productos with depth for related objects
export async function getProductos() {
  try {
    const response = await cosmic.objects
      .find({ type: 'productos' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch featured productos
export async function getProductosDestacados() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'productos',
        'metadata.destacado': true 
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch single producto by slug
export async function getProductoBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'productos',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch all packs with depth
export async function getPacks() {
  try {
    const response = await cosmic.objects
      .find({ type: 'packs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch single pack by slug
export async function getPackBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'packs',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch all categorias
export async function getCategorias() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categorias' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    // Sort by orden if available
    const categorias = response.objects.sort((a: any, b: any) => {
      const ordenA = a.metadata?.orden || 999;
      const ordenB = b.metadata?.orden || 999;
      return ordenA - ordenB;
    });
    
    return categorias;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch single categoria by slug
export async function getCategoriaBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'categorias',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch all proveedores
export async function getProveedores() {
  try {
    const response = await cosmic.objects
      .find({ type: 'proveedores' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

// Fetch single proveedor by slug
export async function getProveedorBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'proveedores',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Fetch resenas for a product
export async function getResenasByProducto(productoId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'resenas',
        'metadata.producto': productoId
      })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    // Sort by fecha descending
    const resenas = response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.fecha || '').getTime();
      const dateB = new Date(b.metadata?.fecha || '').getTime();
      return dateB - dateA;
    });
    
    return resenas;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}