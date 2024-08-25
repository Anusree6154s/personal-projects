import React, { useEffect } from "react";
import "./styles/App.css";
import { Navigate, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync, } from "./features/cart/cartSlice";
import { checkAuthAsync, selectAuthSliceStatus, selectLoggedInUser, selectUserChecked, } from "./features/auth/authSlice";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { fetchWishListByUserIdAsync } from "./features/wishList/wishListSlice";
import { router } from "./Routes";
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const AuthStatus = useSelector(selectAuthSliceStatus);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync())
      
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
    dispatch(checkAuthAsync());
  }, []);


  return (
    <div className="dark:bg-gray-900">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
