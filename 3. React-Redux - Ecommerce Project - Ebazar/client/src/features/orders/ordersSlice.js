import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, makePayment, updateOrder } from './ordersAPI';

const initialState = {
    orders: [],
    currentOrder: null,
    status: 'idle',
    clientSecret:null
};

export const createOrderAsync = createAsyncThunk(
    'orders/createOrder',
    async (item) => {
        const response = await createOrder(item);
        return response.data;
    }
);


export const makePaymentAsync = createAsyncThunk(
    'orders/makePayment',
    async (item) => {
        const response = await makePayment(item);
        return response.data
    }
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrder: (state) => {
            state.currentOrder = null;
        }
    },
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
            .addCase(makePaymentAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                state.clientSecret = action.payload
            })
    },
});


export const { resetOrder } = ordersSlice.actions

export const selectCurrentOrder = (state) => state.orders.currentOrder
export const selectClientSecret = (state) => state.orders.clientSecret

export default ordersSlice.reducer;
