import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import AdminTradeAreas from './pages/admin/AdminTradeAreas';
import AdminBranches from './pages/admin/AdminBranches';
import AdminFilterSettings from './pages/admin/AdminFilterSettings';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminSeo from './pages/admin/AdminSeo';
import AdminInventory from './pages/admin/AdminInventory';
import AdminReports from './pages/admin/AdminReports';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

const App: React.FC = () => {
  return (
    <AppProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen font-sans text-gray-800">
            <Toast />
            <Routes>
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/*" element={<CustomerRoutes />} />
            </Routes>
          </div>
        </HashRouter>
      </CartProvider>
    </AppProvider>
  );
};

const CustomerRoutes = () => (
  <>
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:category" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={
          <ProtectedRoute role="customer">
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute role="customer">
            <OrderHistoryPage />
          </ProtectedRoute>
        } />
         <Route path="/wishlist" element={
          <ProtectedRoute role="customer">
            <WishlistPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
  </>
);

const AdminRoutes = () => (
  <Routes>
    <Route path="/login" element={<AdminLoginPage />} />
    <Route path="/*" element={
      <ProtectedRoute role="admin">
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/inventory" element={<AdminInventory />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/trade-areas" element={<AdminTradeAreas />} />
            <Route path="/branches" element={<AdminBranches />} />
            <Route path="/promotions" element={<AdminPromotions />} />
            <Route path="/seo" element={<AdminSeo />} />
            <Route path="/reports" element={<AdminReports />} />
            <Route path="/filter-settings" element={<AdminFilterSettings />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AdminLayout>
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;