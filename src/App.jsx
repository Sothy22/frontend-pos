import ProductPage from './pages/admin/ProductPage';
import Home from './pages/admin/HomePage';
import NotFoundPage from './pages/admin/NotFoundPage';
import About from './pages/admin/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import UserPage from './pages/admin/UserPage';
import ProductDetailPage from './pages/admin/ProductDetailPage';
import CategoryPage from './pages/admin/CategoryPage';
import PosPage from './pages/admin/PosPage';
import BrandPage from './pages/admin/BrandPage';
import SupplierPage from './pages/admin/SupplierPage';
import CustomerPage from './pages/admin/CustomerPage';
import PurchasePage from './pages/admin/PurchasePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AuthLayout from './components/layout/AuthLoyout';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector((state) => state.token?.token);

  if (!token) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="About" element={<About />} />
            <Route path="productPage" element={<ProductPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="brand" element={<BrandPage />} />
            <Route path="pos" element={<PosPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="customer" element={<CustomerPage />} />
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    // <ProductPage/>
    // <MainLayout />
  );
};

export default App;
