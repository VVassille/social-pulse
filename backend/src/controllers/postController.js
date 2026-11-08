import Post from "../models/postModel.js";

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("user", "username avatar");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    if (!req.body.text) {
      return res
        .status(400)
        .json({ message: "Please add text content for the post" });
    }

    const post = await Post.create({
      text: req.body.text,
      user: req.user._id, // Attached by protect middleware
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a post by ID
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the post author
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "User not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
