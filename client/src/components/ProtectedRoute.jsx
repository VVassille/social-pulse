import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");

  // If user is not authenticated, redirect to login page with English log or message concept if needed
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
