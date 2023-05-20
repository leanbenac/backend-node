class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Id autoincrementable
  }

  addProduct(product) {
 // Validar que todos los campos sean obligatorios
 if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
  console.error('Todos los campos son obligatorios');
  return;
}

    // Valide que el código del producto no esté repetido con operador ternario
    const codeExists = this.products.some((p) => p.code === product.code);
    codeExists
      ? console.error("El código de producto ya existe")
      : (product.id = this.nextId++); // Asignar id autoincrementable y agregar el producto al arreglo

    !codeExists && this.products.push(product);
}

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Not found");
    }
  }
  
}

const manager = new ProductManager();

// Agrego algunos productos al arreglo
manager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 10,
  thumbnail: "/path/to/image1.png",
  code: "ABC123",
  stock: 5,
});
manager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 20,
  thumbnail: "/path/to/image2.png",
  code: "DEF456",
  stock: 10,
});


// Imprime el arreglo de productos
console.log(manager.getProducts());

// // Imprime el producto con id 2
// console.log(manager.getProductById(2));

// // Intenta obtener un producto que no existe
// console.log(manager.getProductById(3)); // Output: "Not found"
