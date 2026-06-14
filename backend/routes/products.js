import express from "express";
import { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } from "../controllers/products.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", addProduct);
productsRouter.get("/:id", getProductById);
productsRouter.patch("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);


export default productsRouter;