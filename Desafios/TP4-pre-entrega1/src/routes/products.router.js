import express from 'express';
import ProductManager from '../ProductManager.js';

const productRouter = express.Router();
const productManager = new ProductManager();

// Listar todos los productos
productRouter.get('/', (req, res) => {
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
productRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;

  try {
    const product = productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
productRouter.post('/', (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  try {
    const newProduct = productManager.addProduct(title, description, code, price, stock, category, thumbnails);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el producto' });
  }
});

// Actualizar un producto por su ID
productRouter.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, stock, category, thumbnails } = req.body;

  try {
    const updatedProduct = productManager.updateProduct(pid, title, description, code, price, stock, category, thumbnails);
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Eliminar un producto por su ID
productRouter.delete('/:pid', (req, res) => {
  const { pid } = req.params;

  try {
    productManager.deleteProduct(pid);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

export default productRouter;
