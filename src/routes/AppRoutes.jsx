import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/public/Login";
import Home from "../pages/public/Home";
import SignUp from "../pages/public/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import PageNotFound from "../pages/public/PageNotFound";
import InvoicePreview from "../components/InvoicePreview";
import Invoice from "../components/Invoice";

function AppRoutes() {
  return (
    <Routes>
      {/* Layout routes */}{" "}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/preview" element={<InvoicePreview />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/dashbord"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
