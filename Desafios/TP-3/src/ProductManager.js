import fs from 'fs'

export default class ProductManager {
  constructor(path, filename) {
    this.path = path;
    this.filename = filename;
    this.products = [];
    this.nextId = 1; // Id autoincrementable
    this.loadProducts();
  }

loadProducts() {
  try {
    const filePath = `${this.path}/${this.filename}`;
    const fileExists = fs.existsSync(filePath);
    
    if (fileExists) {
      const data = fs.readFileSync(filePath, 'utf-8');
      this.products = JSON.parse(data);
      const lastProduct = this.products[this.products.length - 1];
      this.nextId = lastProduct ? lastProduct.id + 1 : 1;
      console.log('Productos cargados exitosamente');
    } else {
      console.log('El archivo no existe. Se creará uno nuevo al guardar los productos.');
    }
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}


  saveProducts() {
    try {
      const filePath = `${this.path}/${this.filename}`;
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(filePath, data);
      console.log('Productos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los productos:', error);
    }
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Valide que el código del producto no esté repetido con operador ternario
    const codeExists = this.products.some((p) => p.code === product.code);
    if (codeExists) {
      console.error('El código de producto ya existe');
      return;
    }

    // Asignar id autoincrementable
    product.id = this.nextId++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      throw new Error('Producto no encontrado');
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...this.products[productIndex], ...updatedFields };
      this.products[productIndex] = updatedProduct;
      this.saveProducts();
      console.log('Producto actualizado exitosamente');
    } else {
      console.error('Producto no encontrado');
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
      console.log('Producto eliminado exitosamente');
    } else {
      console.error('Producto no encontrado');
    }
  }
}

// Crear una instancia de la clase ProductManager
const manager = new ProductManager('./', 'products.json');

// Verificar getProducts al inicio
console.log('getProducts:', manager.getProducts());

// Agregar un nuevo producto
manager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10,
  thumbnail: '/path/to/image1.png',
  code: 'ABC123',
  stock: 5,
});

manager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 20,
  thumbnail: '/path/to/image2.png',
  code: 'DEF456',
  stock: 10,
});

// Verificar getProducts después de agregar un producto
console.log('getProducts:', manager.getProducts());

// Obtener un producto por su id
try {
  const productId = 1; // Reemplaza con el id correcto si es diferente
  const product = manager.getProductById(productId);
  console.log('getProductById:', product);
} catch (error) {
  console.error(error.message);
}

// Actualizar un producto existente
try {
  const productId = 0; // Reemplaza con el id correcto si es diferente
  manager.updateProduct(productId, { price: 300, description: 'Producto actualizado' });
} catch (error) {
  console.error(error.message);
}

// Eliminar un producto existente
try {
  const productId = 1; // Reemplaza con el id correcto si es diferente
  manager.deleteProduct(productId);
} catch (error) {
  console.error(error.message);
}

