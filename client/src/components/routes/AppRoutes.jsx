// Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckOutPage from "../../Pages/CheckOutPage";
import ProductDetailPage from "../../Pages/ProductDetailPage";
import ProductListingPage from "../../Pages/ProductListingPage";
import ShoppingCartPage from "../../Pages/ShoppingCartPage";
import LoginPage from "../../Pages/LoginPage";
import SignupPage from "../../Pages/SignUpPage";
import Homepage from "../../Pages/Homepage";
import LandingPage from "../../Pages/LandingPage";
import DashboardPage from "../../Pages/DashboardPage";
import DashboardAdmin from "../../Pages/DashboardAdmin";
import ProfileForm2 from "../profile/profileForm2";
import TokenExpiredForcedLogoutAndThenLoginPage from "../../Pages/TokenExpiredForceLogoutAndThenLoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/product" element={<ProductDetailPage />} />
      <Route path="/carts" element={<ShoppingCartPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/checkOut" element={<CheckOutPage />} />
      <Route path="/profile/*" element={<ProfileForm2 />} />
      <Route path="/expiredToken/*" element={<TokenExpiredForcedLogoutAndThenLoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
