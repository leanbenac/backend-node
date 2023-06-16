import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager("../cart.json");

// Obtener todos los carritos
cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});

// Obtener un carrito por su ID
cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// Agregar un producto a un carrito
cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    await cartManager.addProductToCart(cid, pid, quantity);
    res.json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Eliminar un carrito por su ID
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    await cartManager.deleteCartById(cid);
    res.json({ message: "Carrito eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

export default cartRouter;
