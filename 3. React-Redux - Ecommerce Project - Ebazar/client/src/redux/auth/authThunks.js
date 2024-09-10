import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUser,
    LoginUser,
    checkAuth,
    updateUser,
    signOut,
    sendOTP,
    resetPassword
} from "../../api";

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
);

export const LoginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo) => {
        const response = await LoginUser(loginInfo);
        return response.data;
    }
);

export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
    async () => {
        const response = await checkAuth();
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUser',
    async (update) => {
        const response = await updateUser(update);
        return response.data;
    }
);

export const signOutsAsync = createAsyncThunk(
    'user/signOut',
    async () => {
        const response = await signOut();
        return response.data;
    }
);


export const sendOTPAsync = createAsyncThunk(
    'user/sendOTP',
    async (item) => {
        const response = await sendOTP(item);
        return response.data;
    }
);

export const resetPasswordAsync = createAsyncThunk(
    'user/resetPassword',
    async (item) => {
        const response = await resetPassword(item);
        return response.data;
    }
);
