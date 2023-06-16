import express from "express";
import ProductManager from "../ProductManager.js";

const productRouter = express.Router();
const productManager = new ProductManager("../products.json");

// Listar todos los productos
productRouter.get("/", (req, res) => {
  const { limit } = req.query;
  const products = productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, Number(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// Obtener un producto por su ID
productRouter.get("/:pid", (req, res) => {
  const { pid } = req.params;
  try {
    const product = productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
productRouter.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;

  const product = {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails: thumbnails ? thumbnails : [],
    status: true,
  };

  try {
    const newProduct = await productManager.addProduct(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Error al agregar el producto" });
  }
});

// Actualizar un producto por su ID
productRouter.put("/:pid", async (req, res) => {
  const { pid } = parseInt(req.params);
  try {
    const updatedProduct = await productManager.updateProduct(pid, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" })
  }
});

// Eliminar un producto por su ID
productRouter.delete("/:pid", async (req, res) => {
  const { pid } = parseInt(req.params.pid);

  try {
    await productManager.deleteProduct(pid);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

export default productRouter;
