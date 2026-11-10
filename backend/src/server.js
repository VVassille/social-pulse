import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // 1. Importă pachetul cors
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();

const app = express();

// 2. Activează CORS pentru a permite cererile de la frontend (Vite)
app.use(cors());

app.use(express.json());

// Rutele aplicației
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
