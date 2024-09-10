import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/slices/productSlice'
import authReducer from '../redux/slices/authSlice';
import cartReducer from '../redux/slices/cartSlice';
import wishListReducer from '../redux/slices/wishListSlice';
import adminReducer from '../redux/slices/adminSlice'
import userReducer from '../redux/slices/userSlice'
import ordersReducer from '../redux/slices/ordersSlice'

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
