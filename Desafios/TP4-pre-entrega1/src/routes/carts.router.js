import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager();

// Obtener todos los carritos
cartRouter.get("/", (req, res) => {
  const carts = cartManager.getCarts();
  res.json(carts);
});

// Obtener un carrito por su ID
cartRouter.get("/:cid", (req, res) => {
  const { cid } = req.params;

  try {
    const cart = cartManager.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Crear un nuevo carrito
cartRouter.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

// Agregar un producto a un carrito
cartRouter.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = cartManager.addProductToCart(cid, pid, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Eliminar un carrito por su ID
cartRouter.delete("/:cid", (req, res) => {
  const { cid } = req.params;

  try {
    cartManager.deleteCartById(cid);
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

export default cartRouter;
