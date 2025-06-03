import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { changePasswordThunk, getProfileDataThunk, loginUserThunk, ProfileDataPayload, registerUserThunk } from "./authThunks";
import { removeTokensFromLocalStorage, saveTokensToLocalStorage } from "../../src/utils/localStorage";
import { ErrorPayload } from './authThunks';

export enum SendingStatus {
    Pending = 'pending',
    Success = 'success',
    Failed  = 'failed',
}

export enum AuthStatus {
    Unauthenticated = 'unauthenticated',
    Authenticated = 'authenticated',
    Pending = 'pending',
}

interface Tokens {
    accessToken: string,
    refreshToken: string
}

interface AuthState {
    authentication: AuthStatus,
    user: ProfileDataPayload | null,
    sendingStatusText: ErrorPayload | null,
    sendingStatus: SendingStatus,
}

const initialState: AuthState = {
    authentication: AuthStatus.Pending,
    user: null,
    sendingStatusText: null,
    sendingStatus: SendingStatus.Pending,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.authentication = AuthStatus.Authenticated;
        },
        logout (state) {
            state.authentication = AuthStatus.Unauthenticated;
        },
        setTokensWhenRefreshed(_state, action: PayloadAction<Tokens>) {
            try {    
                saveTokensToLocalStorage(action.payload);
            } catch {
                throw new Error('ошибка обновления токенов в localstorage')
            }
        },
        removeTokens() {
            try {
                removeTokensFromLocalStorage()
            } catch {
                throw new Error('ошибка удаления токенов в localstorage')
            }
        },
        setSuccessSendingStatus(state) {
            state.sendingStatus = SendingStatus.Success;
        },
        setFailedSendingStatus(state) {
            state.sendingStatus = SendingStatus.Failed;
        },
        clearSendingStatus(state) {
            state.sendingStatusText = null;
            state.sendingStatus = SendingStatus.Pending;
        },
    },
    extraReducers: (builder) => {
        builder
        
        //Регистрация
        .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<Tokens>) => {
            state.authentication = AuthStatus.Authenticated;
            state.sendingStatusText = null;

            const tokens = action.payload;
            saveTokensToLocalStorage(tokens);
        })
        .addCase(registerUserThunk.rejected, (state, action) => {
            state.authentication = AuthStatus.Pending;
            state.sendingStatusText = action.payload ? action.payload : { status: 500, message: 'неизвестная ошибка' }
        })

        //Авторизация
        .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<Tokens>) => {
            state.authentication = AuthStatus.Authenticated;
            state.sendingStatusText = null;

            const tokens = action.payload;
            saveTokensToLocalStorage(tokens);
        })
        .addCase(loginUserThunk.rejected, (state, action) => {
            state.authentication = AuthStatus.Pending;
            state.sendingStatusText = action.payload ? action.payload : { status: 500, message: 'неизвестная ошибка' };
            console.log(state.sendingStatusText);
        })

        // Получение профиля
        .addCase(getProfileDataThunk.fulfilled, (state, action) => {
            state.user = action.payload;
            state.authentication = AuthStatus.Authenticated;
        })
        .addCase(getProfileDataThunk.rejected, (state, action) => {
            state.user = null;
            state.authentication = AuthStatus.Unauthenticated;
            state.sendingStatusText = action.payload ? action.payload : { status: 500, message: 'неизвестная ошибка' };
        })

        //Смена пароля
        .addCase(changePasswordThunk.fulfilled, (state) => {
            // state.authentication = AuthStatus.Authenticated;
            state.sendingStatus = SendingStatus.Success;
        })
        .addCase(changePasswordThunk.rejected, (state, action) => {
            if (action.payload) {
                state.sendingStatusText = action.payload;
                state.sendingStatus = SendingStatus.Failed;
            }
        })
    }
})

export const { logout, login, setTokensWhenRefreshed, removeTokens, setSuccessSendingStatus, setFailedSendingStatus, clearSendingStatus } = authSlice.actions;
export default authSlice.reducer;