import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './TasksReducers/tasksSlice';
import registerReducer from './AuthReducers/authSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore ({
    reducer: {
        tasks: tasksReducer,
        auth: registerReducer,
    },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;