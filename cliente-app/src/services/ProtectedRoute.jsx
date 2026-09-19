// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, onlyAdmin }) {
  const user = useAuth();

  if (onlyAdmin && user?.user?.rol !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  if (!onlyAdmin && user?.user?.rol === "admin") {
    return <Navigate to="/admin" />;
  }

  return children;
}