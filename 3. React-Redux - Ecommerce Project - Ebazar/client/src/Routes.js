import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/userPages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/userPages/ProductDetailPage';
import Protected from './features/auth/components/user/Protected';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import LogOut from './features/auth/components/Logout';
import ForgotPassword from './features/auth/components/forgotPassword';
import AdminHome from './pages/adminPages/AdminHome';
import AdminProductDetailPage from './pages/adminPages/AdminProductDetailPage';
import AddProductFormPage from './pages/adminPages/AddProductFormPage';
import EditProductFormPage from './pages/adminPages/EditProductFormPage';
import AdminOrdersPage from './pages/adminPages/AdminOrdersPage';
import StripeCheckoutPage from './pages/StripeCheckoutPage';
import AdminProfilePage from './pages/adminPages/AdminProfilePage';
import WishListPage from './pages/userPages/WishListPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>,
    </Protected>
  },
  {
    path: "login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "cart",
    element: <Protected>
      <CartPage></CartPage>
    </Protected>,
  },
  {
    path: "checkout",
    element: <Protected>
      <CheckoutPage></CheckoutPage>
    </Protected>,
  },
  {
    path: "product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>,
  },
  {
    path: "order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path: "my-orders",
    element: <Protected>
      <UserOrdersPage></UserOrdersPage>
    </Protected>,
  },
  {
    path: "profile",
    element: <Protected>
      <UserProfilePage></UserProfilePage>
    </Protected>,
  },
  {
    path: "wishlist",
    element: <Protected>
      <WishListPage></WishListPage>
    </Protected>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>
  },
  {
    path: "/admin",
    element: <Protected>
      <AdminHome></AdminHome>,
    </Protected>
  },
  {
    path: "/admin/product-detail/:id",
    element: <Protected>
      <AdminProductDetailPage></AdminProductDetailPage>,
    </Protected>
  },
  {
    path: "/admin/product-form",
    element: <Protected>
      <AddProductFormPage></AddProductFormPage>,
    </Protected>
  },
  {
    path: "/admin/edit-product-form/:id",
    element: <Protected>
      <EditProductFormPage></EditProductFormPage>,
    </Protected>
  },
  {
    path: "/admin/orders",
    element: <Protected>
      <AdminOrdersPage></AdminOrdersPage>,
    </Protected>
  },
  {
    path: "/admin/profile",
    element: <Protected>
      <AdminProfilePage></AdminProfilePage>,
    </Protected>
  },
  {
    path: "/stripe-checkout/:id",
    element: <Protected>
      <StripeCheckoutPage></StripeCheckoutPage>,
    </Protected>
  },
]);
