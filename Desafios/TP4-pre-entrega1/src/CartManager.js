import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.nextId = 1; // Id autoincrementable
    (async () => {
      await this.loadCarts();
    })();
  }

  async loadCarts() {
    try {
      const fileExists = fs.existsSync(this.path);
      if (fileExists) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
        const lastCart = this.carts[this.carts.length - 1];
        this.nextId = lastCart ? lastCart.id + 1 : 1;
      } else {
        console.log(
          "El archivo no existe. Se creará uno nuevo al guardar el carrito."
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveCarts() {
    try {
      const data = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      console.log(error);
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

const manager = new CartManager("./cart.json");

// Crear un nuevo carrito
manager.createCart();
