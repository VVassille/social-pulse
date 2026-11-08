import express from "express";
import {
  getPosts,
  createPost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all posts (public) & POST a new post (protected)
router.route("/").get(getPosts).post(protect, createPost);

// DELETE a post by ID (protected)
router.route("/:id").delete(protect, deletePost);

export default router;
