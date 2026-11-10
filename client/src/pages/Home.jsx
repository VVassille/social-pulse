import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import styles from "./Home.module.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await API.get("/posts");
      setPosts(response.data);
    } catch (err) {
      setError("Failed to load posts");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await API.post("/posts", { text });
      setPosts([response.data, ...posts]);
      setText("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.homeContainer}>
      <nav>
        <h2>Social Pulse Feed</h2>
        {user && <span>Welcome, {user.username}!</span>}
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div className={styles.feedContent}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleCreatePost} className={styles.postForm}>
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            required
          />
          <button type="submit">Post</button>
        </form>

        <div className={styles.postsList}>
          {posts.length === 0 ? (
            <p>No posts yet. Be the first to share something!</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <strong>{post.username}</strong>
                  <span className={styles.postDate}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={styles.postText}>{post.text}</p>

                {user && post.user === user._id && (
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
