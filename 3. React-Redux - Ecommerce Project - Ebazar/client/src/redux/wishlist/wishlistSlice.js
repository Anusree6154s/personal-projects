import { createSlice } from '@reduxjs/toolkit';
import { addToWishListAsync, fetchWishListByUserIdAsync, deleteItemFromWishListAsync } from './wishlistThunks';

const initialState = {
    items: [],
    status: null,
};

export const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToWishListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToWishListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchWishListByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWishListByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload ? action.payload : [];
            })
            .addCase(deleteItemFromWishListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemFromWishListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id)
                state.items.splice(index, 1)
            })
    },
});






export default wishListSlice.reducer;
