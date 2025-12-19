import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "AGENT") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
