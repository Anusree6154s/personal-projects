import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToWishList, deleteItemFromWishList, fetchWishListByUserId } from './wishListAPI';

const initialState = {
  items: [],
  status: null,
};

export const addToWishListAsync = createAsyncThunk(
  'wishlist/addToWishList',
  async (item) => {
    const response = await addToWishList(item);
    return response.data;
  }
);

export const fetchWishListByUserIdAsync = createAsyncThunk(
  'wishlist/fetchWishListByUserId',
  async () => {
    const response = await fetchWishListByUserId();
    return response.data;
  }
);


export const deleteItemFromWishListAsync = createAsyncThunk(
  'wishlist/deleteItemFromWishList',
  async (itemId) => {
    const response = await deleteItemFromWishList(itemId);
    return response.data;
  }
);

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



export const selectWishList = (state) => state.wishlist.items
export const selectWishListStatus = (state) => state.wishlist.status


export default wishListSlice.reducer;
