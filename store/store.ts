import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './TasksReducers/tasksSlice';
import registerReducer from './AuthReducers/authSlice';


export const store = configureStore ({
    reducer: {
        tasks: tasksReducer,
        auth: registerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;