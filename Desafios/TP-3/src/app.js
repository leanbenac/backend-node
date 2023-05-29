import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const manager = new ProductManager('./', 'products.json');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  const { limit } = req.query;
  const products = manager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, Number(limit));
    res.json(limitedProducts);
  } else {
    res.json(products);
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  
  try {
    const product = manager.getProductById(Number(pid));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening ${PORT}...`);
});



