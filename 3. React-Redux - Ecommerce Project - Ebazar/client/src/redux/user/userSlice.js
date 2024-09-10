import { createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync } from './userThunks';

const initialState = {
    userInfo: null, //for detailed user info
    userOrders: [],
    status: 'idle',
};




export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
            .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userOrders = action.payload;
            })
    },
});


export default userSlice.reducer;
