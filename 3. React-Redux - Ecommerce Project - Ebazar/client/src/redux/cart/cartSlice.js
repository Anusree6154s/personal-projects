import {  createSlice } from '@reduxjs/toolkit';
import {
    addToCartAsync,
    fetchItemsByUserIdAsync,
    updateCartAsync,
    deleteItemFromCartAsync,
    resetCartAsync
} from './cartThunks';

const initialState = {
    items: [],
    status: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload ? action.payload : [];
            })
            .addCase(updateCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items[index] = action.payload
            })
            .addCase(deleteItemFromCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items.splice(index, 1)
            })
            .addCase(resetCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = []
            })
    },
});

export default cartSlice.reducer;
