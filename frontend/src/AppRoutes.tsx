import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/user";
import CreateEditQuotationAdmin from "./pages/quotation/CreateQuotationAdmin";

// PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

// TEMP: Mock user role
const userRole = "SUPER_ADMIN";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Agent Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard onLogout={() => localStorage.removeItem("token")} />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
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

        {/* Fallback */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
