import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const manager = new ProductManager();

const productRouter = express.Router();
const cartRouter = express.Router();


// Listar todos los productos
productRouter.get('/', (req, res) => {
  const { limit } = req.query;
  const products = manager.getProducts();

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
    const product = manager.getProductById(Number(pid));
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Rutas de carritos
cartRouter.get('/', (req, res) => {
    // Lógica para obtener todos los carritos
    res.json({ message: 'Obtener todos los carritos' });
  });
  
  cartRouter.get('/:cid', (req, res) => {
    const { cid } = req.params;
  
    try {
      // Lógica para obtener el carrito con el ID proporcionado
      res.json({ message: `Obtener carrito con ID ${cid}` });
    } catch (error) {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });

// Montar enrutadores
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});



