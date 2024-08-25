import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/product/productSlice'
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import wishListReducer from '../features/wishList/wishListSlice';
import adminReducer from '../features/admin/adminSlice'
import userReducer from '../features/user/userSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    admin: adminReducer,
    user:userReducer,
    orders: ordersReducer
  },
});
