import { Navigate } from "react-router-dom";
import type { ProtectedRuleProps } from "./ServicesTypes";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, onlyAdmin, onlyEmpleado, }: ProtectedRuleProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (onlyAdmin && user.rol !== "admin") return <Navigate to="/dashboard" />;
  if (onlyEmpleado && user.rol !== "empleado") return <Navigate to="/dashboard" />;

  return children;
}