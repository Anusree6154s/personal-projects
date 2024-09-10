import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllOrders, updateOrder } from '../../api/adminAPI';

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