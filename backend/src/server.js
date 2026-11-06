import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Загрузка переменных окружения из .env
dotenv.config();

// Подключение к базе данных MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Позволяет серверу принимать JSON в теле запросов

// Базовый маршрут для проверки работоспособности
app.get("/", (req, res) => {
  res.send("API status: social-pulse server is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
