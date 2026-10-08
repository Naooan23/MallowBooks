import { Navigate } from "react-router-dom";
import type { ProtectedRuleProps } from "./ServicesTypes";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, onlyAdmin }: ProtectedRuleProps) {
  const { user } = useAuth();

  if (!user) { return <Navigate to="/login" />; }
  if (onlyAdmin && user.rol !== "admin") { return <Navigate to="/dashboard" />; }

  return children;
}