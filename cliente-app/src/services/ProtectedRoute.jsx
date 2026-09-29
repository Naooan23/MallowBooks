import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
export default function ProtectedRoute({ children, onlyAdmin }) {
  const { user } = useAuth();

  if (!user) { return <Navigate to="/login" />; }
  if (onlyAdmin && user.rol !== "admin") { return <Navigate to="/dashboard" />; }

  return children;
}