import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllOrders, updateOrder } from './adminAPI';

const initialState = {
  orders: [],
  totalOrders: 0,
  status: 'idle',

};

export const fetchAllOrdersAsync = createAsyncThunk(
  'admin/fetchAllOrders',
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'admin/updateOrder',
  async (order) => {
    const response = await updateOrder(order)
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders
      })

      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(item => item.id === action.payload.id)
        state.orders.splice(index, 1, action.payload);
      })
  },
});

export const selectAllOrders = (state) => state.admin.orders;
export const selectTotalOrders = (state) => state.admin.totalOrders


export default adminSlice.reducer;
