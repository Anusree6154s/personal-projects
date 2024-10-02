import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/products/productsSlice'
import authReducer from '../redux/auth/authSlice';
import cartReducer from '../redux/cart/cartSlice';
import wishListReducer from '../redux/wishlist/wishlistSlice';
import adminReducer from '../redux/admin/adminSlice'
import userReducer from '../redux/user/userSlice'
import ordersReducer from '../redux/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    product: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    admin: adminReducer,
    user: userReducer,
    orders: ordersReducer
  },
});
