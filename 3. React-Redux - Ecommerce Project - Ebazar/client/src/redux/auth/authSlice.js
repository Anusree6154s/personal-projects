import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAsync, createUserAsync, LoginUserAsync, sendOTPAsync, signOutsAsync, updateUserAsync } from './authThunks';

const initialState = {
  loggedInUser: null,
  status: 'nil',
  error: null,
  userAuthenticated: false,
  user_id: null
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.userAuthenticated = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userAuthenticated = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload
      })
      .addCase(signOutsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutsAsync.fulfilled, (state,) => {
        state.status = 'idle';
        state.loggedInUser = null
      })
      .addCase(sendOTPAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(sendOTPAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user_id = action.payload.id
      })
  },
});


export default authSlice.reducer;
