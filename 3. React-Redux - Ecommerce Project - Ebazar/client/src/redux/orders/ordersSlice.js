import { createSlice } from '@reduxjs/toolkit';
import { createOrderAsync, makePaymentAsync } from './ordersThunks';
import { resetOrder } from './ordersActions'; 

const initialState = {
    orders: [],
    currentOrder: null,
    status: 'idle',
    clientSecret: null
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.orders.push(action.payload);
                state.currentOrder = action.payload
            })
            .addCase(makePaymentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(makePaymentAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.clientSecret = action.payload
            })
            .addCase(resetOrder, (state) => {  
                state.currentOrder = null;
            });
    },
});


export default ordersSlice.reducer;
