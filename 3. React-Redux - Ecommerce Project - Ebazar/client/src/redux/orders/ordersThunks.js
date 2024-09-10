import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, makePayment } from "../../api";

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