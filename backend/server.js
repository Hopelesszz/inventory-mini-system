import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase,disconnectFromDatabase } from "./db_config/db.js";
import productsRouter from "./routes/products.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json()); 
app.use(cors());

app.use("/products", productsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectFromDatabase();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectFromDatabase();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectFromDatabase();
    process.exit(0);
  });
});