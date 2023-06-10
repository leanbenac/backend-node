import fs from "fs";

export default class ProductManager {
  constructor(path, filename) {
    this.path = path;
    this.filename = filename;
    this.products = [];
    this.nextId = 1; // Id autoincrementable
    this.loadProducts();
  }

  loadProducts() {
    return new Promise((resolve, reject) => {
      try {
        const filePath = `${this.path}/${this.filename}`;
        const fileExists = fs.existsSync(filePath);

        if (fileExists) {
          fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
              reject(err);
            } else {
              this.products = JSON.parse(data);
              const lastProduct = this.products[this.products.length - 1];
              this.nextId = lastProduct ? lastProduct.id + 1 : 1;
              console.log("Productos cargados exitosamente");
              resolve();
            }
          });
        } else {
          console.log(
            "El archivo no existe. Se creará uno nuevo al guardar los productos."
          );
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  saveProducts() {
    return new Promise((resolve, reject) => {
      try {
        const filePath = `${this.path}/${this.filename}`;
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFile(filePath, data, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Productos guardados exitosamente");
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      // Validacion
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        reject(new Error("Todos los campos son obligatorios"));
        return;
      }

      // Valide para que el product no esté repetido
      const codeExists = this.products.some((p) => p.code === product.code);
      if (codeExists) {
        reject(new Error("El código de producto ya existe"));
        return;
      }

      // id autoincrementable
      product.id = this.nextId++;
      this.products.push(product);
      this.saveProducts()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      const product = this.products.find((p) => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    });
  }

  updateProduct(id, updatedFields) {
    return new Promise((resolve, reject) => {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        const updatedProduct = {
          ...this.products[productIndex],
          ...updatedFields,
        };
        this.products[productIndex] = updatedProduct;
        this.saveProducts()
          .then(() => {
            console.log("Producto actualizado exitosamente");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error("Producto no encontrado"));
      }
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const productIndex = this.products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        this.saveProducts()
          .then(() => {
            console.log("Producto eliminado exitosamente");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error("Producto no encontrado"));
      }
    });
  }
}
