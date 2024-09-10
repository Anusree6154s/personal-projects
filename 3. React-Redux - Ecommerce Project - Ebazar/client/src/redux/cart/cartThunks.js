import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addToCart,
    fetchItemsByUserId,
    updateCart,
    deleteItemFromCart,
    resetCart
} from "../../api";

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item) => {
        const response = await addToCart(item);
        return response.data;
    }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async () => {
        const response = await fetchItemsByUserId();
        return response.data;
    }
);

export const updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async (update) => {
        const response = await updateCart(update);
        return response.data;
    }
);

export const deleteItemFromCartAsync = createAsyncThunk(
    'cart/deleteItemFromCart',
    async (itemId) => {
        const response = await deleteItemFromCart(itemId);
        return response.data;
    }
);

export const resetCartAsync = createAsyncThunk(
    'cart/resetCart',
    async (userId) => {
        const response = await resetCart(userId);
        return response;
    }
);