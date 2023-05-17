class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1; // Id autoincrementable
  }

  addProduct(product) {
    // Valide los campos con operador nullish
    !product.title ?? console.error('El campo "title" es obligatorio');
    !product.description ?? console.error('El campo "description" es obligatorio');
    !product.price ?? console.error('El campo "price" es obligatorio');
    !product.thumbnail ?? console.error('El campo "thumbnail" es obligatorio');
    !product.code ?? console.error('El campo "code" es obligatorio');
    !product.stock ?? console.error('El campo "stock" es obligatorio');

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
    return product ?? console.error("Not found");
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
