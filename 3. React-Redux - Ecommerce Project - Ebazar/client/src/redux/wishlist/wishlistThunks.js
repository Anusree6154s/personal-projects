import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToWishList, fetchWishListByUserId, deleteItemFromWishList } from "../../api";

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