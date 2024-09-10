import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUser , fetchLoggedInUserOrders} from "../../api";

export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async () => {
      const response = await fetchLoggedInUser();
      return response.data;
    }
  );
  
  export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async (userId) => {
      const response = await fetchLoggedInUserOrders(userId);
      return response.data;
    }
  );