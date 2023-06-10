import fs from "fs";

export default class CartManager {
  constructor(path, filename) {
    this.path = path;
    this.filename = filename;
    this.carts = [];
    this.nextId = 1; // Id autoincrementable
    this.loadCarts();
  }

  loadCarts() {
    try {
      const filePath = `${this.path}/${this.filename}`;
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        const data = fs.readFileSync(filePath, "utf-8");
        this.carts = JSON.parse(data);
        const lastCart = this.carts[this.carts.length - 1];
        this.nextId = lastCart ? lastCart.id + 1 : 1;
        console.log("Carritos cargados exitosamente");
      } else {
        console.log(
          "El archivo no existe. Se creará uno nuevo al guardar el carrito."
        );
      }
    } catch (error) {
      console.error("Error al cargar los carritos:", error);
    }
  }

  saveCarts() {
    try {
      const filePath = `${this.path}/${this.filename}`;
      const data = JSON.stringify(this.carts, null, 2);
      fs.writeFileSync(filePath, data);
      console.log("Carritos guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar los carritos:", error);
    }
  }

  createCart() {
    const cart = {
      id: this.nextId++,
      products: [],
    };

    this.carts.push(cart);
    this.saveCarts();
    console.log("Carrito creado exitosamente");
  }

  getCartById(id) {
    const cart = this.carts.find((c) => c.id === id);
    if (cart) {
      return cart;
    } else {
      throw new Error("Carrito no encontrado");
    }
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const existingProduct = cart.products.find((p) => p.id === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    this.saveCarts();
    console.log("Producto agregado al carrito exitosamente");
  }
}

const manager = new CartManager("./", "cart.json");

// Crear un nuevo carrito
manager.createCart();
