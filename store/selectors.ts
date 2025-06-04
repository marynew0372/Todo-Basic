import { AuthStatus } from "./AuthReducers/authSlice";
import { RootState } from "./store";

//authUser
export const selectUserData = (state: RootState) => state.auth.user;
export const selectSendingStatus = (state: RootState) => state.auth.sendingStatus;
export const selectAuthentication = (state: RootState): AuthStatus => state.auth.authentication;
export const selectAuthErrorPayLoad = (state: RootState) => state.auth.sendingStatusText;

//Tasks
export const selectPage = (state: RootState) => state.tasks.tasks.page;
export const selectTasks = (state: RootState) => state.tasks.tasks.data;
export const selectLimit = (state: RootState) => state.tasks.tasks.limit;
export const selectTotal = (state: RootState) => state.tasks.tasks.total;
export const selectTotalPages = (state: RootState) => state.tasks.tasks.totalPages;
export const selectSucessEditTask = (state: RootState) => state.tasks.sucessEditTask;
export const selectSuccessToggleCompletedTask = (state: RootState) => state.tasks.successToggleCompletedTask;
export const selectIsSorted = (state: RootState) => state.tasks.tasks.isSorted;