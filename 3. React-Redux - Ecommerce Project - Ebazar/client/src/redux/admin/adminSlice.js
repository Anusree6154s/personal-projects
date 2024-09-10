

import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOrdersAsync, updateOrderAsync } from "./adminThunks";

const initialState = {
    orders: [],
    totalOrders: 0,
    status: 'idle',
};

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

export default adminSlice.reducer;
