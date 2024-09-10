export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userAuthenticated;
export const selectUserId = (state) => state.auth.user_id;
export const selectAuthSliceStatus = (state) => state.auth.status;