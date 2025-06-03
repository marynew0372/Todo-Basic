import { createAsyncThunk } from '@reduxjs/toolkit';
import { changePassword, getProfileData, loginUser, registrationUser } from '../../src/api/authUser';
import axios, { AxiosError } from 'axios';



interface RegistrationPayload {
    email: string;
    password: string;
    age?: string | undefined;
}

interface Tokens {
    accessToken: string,
    refreshToken: string
}

export interface ErrorPayload {
  status: number | undefined;
  message: string | undefined;
}

export interface ProfileDataPayload {
    age: number | null,
    createdAt: string,
    email: string,
    id: number | null,
}

export interface ChangePassword {
    oldPassword: string,
    newPassword: string,
}

export const registerUserThunk = createAsyncThunk<
    Tokens,
    RegistrationPayload,
    {rejectValue: ErrorPayload}
>(
    'user/register',
    async ({ email, password, age }: RegistrationPayload, thunkAPI) => {
        try {
            const tokens = await registrationUser(email, password, age);
            return tokens;
        } catch (error: AxiosError | unknown) {
            if (axios.isAxiosError(error) && error.response) {
            const status = error.status;
            const message = status === 400 ? 'Пользователь с таким email уже существует' : 'Неизвестный статус ошибки';
            return thunkAPI.rejectWithValue({ status, message });
            }
        }
    }
)

export const loginUserThunk = createAsyncThunk<
    Tokens,
    RegistrationPayload,
    {rejectValue: ErrorPayload}
>(
    'user/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const tokens = await loginUser(email, password);
            return tokens;
        } catch (error: AxiosError | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error);
                const status = error.response.status;
                const message = status === 401 ? 'Неправильный логин или пароль' : 'Неизвестный статус ошибки';
                console.log(error)
                return thunkAPI.rejectWithValue({ status, message });
            }
        }
    }
)

export const getProfileDataThunk = createAsyncThunk<
    ProfileDataPayload,
    void,
    { rejectValue: ErrorPayload }
>(
    'user/profile',
    async (_: void, ThunkAPI) => {
        try {
            const response = await getProfileData();
            return response.data;
        } catch (error: AxiosError | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                const message = status === 404 ? 'Пользователь не найден' : 'Неизвестный статус ошибки'
                return ThunkAPI.rejectWithValue({ status, message });
            }
        }
    }
)

export const changePasswordThunk = createAsyncThunk<
    void,
    ChangePassword,
    { rejectValue: ErrorPayload }
>(
    'user/change-password',
    async ({ oldPassword, newPassword }, thunkAPI) => {
        try {
            await changePassword(oldPassword, newPassword);
        } catch (error: AxiosError | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                const messages: Record<number, string> = {
                    400: 'Требуются оба пароля',
                    401: 'Неверно указан старый пароль',
                    404: 'Пользователь не найден',
                    };
                const message = messages[status] || 'Неизвестный статус ошибки';
                return thunkAPI.rejectWithValue({ status, message });
            }
        }
    }
)