import { AuthStatus } from "./AuthReducers/authSlice";
import { RootState } from "./store";

//authUser
export const selectUserData = (state: RootState) => state.auth.user;
export const selectAuthentication = (state: RootState): AuthStatus => state.auth.authentication;
export const selectAuthErrorPayLoad = (state: RootState) => state.auth.sendingStatusText;
export const selectSendingStatus = (state: RootState) => state.auth.sendingStatus;

//Tasks
export const selectTasks = (state: RootState) => state.tasks.tasks.data;
export const selectPage = (state: RootState) => state.tasks.tasks.page;
export const selectLimit = (state: RootState) => state.tasks.tasks.limit;
export const selectTotal = (state: RootState) => state.tasks.tasks.total;
export const selectTotalPages = (state: RootState) => state.tasks.tasks.totalPages;
