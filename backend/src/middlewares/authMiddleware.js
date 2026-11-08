import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (split 'Bearer <token>')
      token = req.headers.authorization.split(" ")[1];

      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database based on id in token, exclude password
      req.user = await User.findById(decoded.id).select("-password");

      // Proceed to the next middleware or controller
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
