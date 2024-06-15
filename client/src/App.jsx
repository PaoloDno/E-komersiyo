import React from "react";

import CheckOutPage from "./Pages/CheckOutPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import ProductListingPage from "./Pages/ProductListingPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";
import Homepage from "./Pages/Homepage";
import LandingPage from "./Pages/LandingPage";
import DashboardPage from "./Pages/DashboardPage";
import DashboardAdmin from "./Pages/DashboardAdmin";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HeaderNav from './components/Header';

function App() {

  return(
    <>
    <Router>
      <HeaderNav />
      <div className="container w-full px-6">
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
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App;