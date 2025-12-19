import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/user";
import CreateEditQuotationAdmin from "./pages/quotation/CreateQuotationAdmin";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

const userRole = "SUPER_ADMIN"; // TEMP, replace with JWT later

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />

      {/* AGENT DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard onLogout={() => localStorage.removeItem("token")} />
          </PrivateRoute>
        }
      />

      {/* ADMIN DASHBOARD */}
      {userRole === "SUPER_ADMIN" && (
        <>
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/quotation/create"
            element={
              <PrivateRoute>
                <CreateEditQuotationAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/quotation/edit/:id"
            element={
              <PrivateRoute>
                <CreateEditQuotationAdmin />
              </PrivateRoute>
            }
          />
        </>
      )}

      {/* 404 */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
