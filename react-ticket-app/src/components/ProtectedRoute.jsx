import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    // Not logged in — redirect to login page
    return <Navigate to="/login" replace />;
  }
  // Logged in — show the protected content
  return children;
}
