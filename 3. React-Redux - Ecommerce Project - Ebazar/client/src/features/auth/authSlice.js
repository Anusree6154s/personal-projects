import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginUser, createUser, signOut, updateUser, checkAuth, sendOTP, getRecovery, resetPassword } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'nil',
  error: null,
  userAuthenticated: false,
  user_id: null
};

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


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userAuthenticated;
export const selectUserId = (state) => state.auth.user_id;
export const selectAuthSliceStatus = (state) => state.auth.status;


export default authSlice.reducer;
