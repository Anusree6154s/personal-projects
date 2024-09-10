import React, { useEffect } from "react";
import "./styles/App.css";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { router } from "./routes/Routes";
import { checkAuthAsync, fetchItemsByUserIdAsync, fetchLoggedInUserAsync, fetchWishListByUserIdAsync, selectLoggedInUser } from "./redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchWishListByUserIdAsync())
    }
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
    dispatch(checkAuthAsync());
  }, [dispatch]);


  return (
    <div className="dark:bg-gray-900">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
