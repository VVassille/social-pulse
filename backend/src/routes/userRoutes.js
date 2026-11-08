import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rute publice pentru utilizatori
router.post("/register", registerUser);
router.post("/login", authUser);

// Rute protejate (necesită token JWT valid)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
