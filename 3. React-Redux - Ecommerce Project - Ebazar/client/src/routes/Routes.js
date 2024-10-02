import { createBrowserRouter } from 'react-router-dom';
import { ForgotPassword, PageNotFound, Protected } from '../components/auth';
import LogOut from '../components/auth/Logout';
import { AddProductFormPage, AdminHome, AdminOrdersPage, AdminProductDetailPage, AdminProfilePage, CartPage, CheckoutPage, EditProductFormPage, LoginPage, OrderSuccessPage, ProductDetailPage, SignupPage, StripePaymentPage, UserOrdersPage, UserProfilePage, WishListPage } from '../pages';
import HomePage from '../pages/user/HomePage';
import ProductListPage from '../pages/user/ProductListPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <ProductListPage></ProductListPage>
    </Protected>
  },
  {
    path: "home",
    element: <HomePage></HomePage>,
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
    path: "/stripe-payment/:id",
    element: <Protected>
      <StripePaymentPage></StripePaymentPage>,
    </Protected>
  },
]);
