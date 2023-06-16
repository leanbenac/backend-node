import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1; // Id autoincrementable
    (async () => {
      await this.loadProducts();
    })();
  }

  async loadProducts() {
    try {
      const fileExists = fs.existsSync(this.path);
      if (fileExists) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
        const lastProduct = this.products[this.products.length - 1];
        this.nextId = lastProduct ? lastProduct.id + 1 : 1;
      } else {
        console.log(
          "El archivo no existe. Se creará uno nuevo al guardar los productos."
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    // Validacion
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock ||
      !product.category ||
      !product.status
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    // Valide para que el product no esté repetido
    const codeExists = this.products.some((p) => p.code === product.code);
    if (codeExists) {
      throw new Error("El código de producto ya existe");
    }

    // id autoincrementable
    product.id = this.nextId++;
    this.products.push(product);
    await this.saveProducts();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.products[productIndex] = updatedProduct;
      await this.saveProducts();
      return this.products[productIndex];
    } else {
      throw new Error("El producto no existe");
    }
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      await this.saveProducts();
      return this.products[productIndex];
    } else {
      throw new Error("Producto no encontrado");
    }
  }
}
