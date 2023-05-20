const fs = require('fs');

// Definición de la clase ProductManager
class ProductManager {
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
      const data = fs.readFileSync(filePath, 'utf-8');
      this.products = JSON.parse(data);
      const lastProduct = this.products[this.products.length - 1];
      this.nextId = lastProduct ? lastProduct.id + 1 : 1;
      console.log('Productos cargados exitosamente');
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

// Crea una instancia de la clase ProductManager
const manager = new ProductManager('./', 'products.json');

// Agrega productos de ejemplo
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

