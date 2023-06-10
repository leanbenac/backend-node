import express from "express";
import ProductManager from "./ProductManager.js";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";

const app = express();
const manager = new ProductManager();

// Enrutadores
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
