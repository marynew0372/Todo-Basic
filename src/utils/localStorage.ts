import { AuthStatus } from '../../store/AuthReducers/authSlice';

export enum ThemeModeEnum {
    darkTheme = 'dark',
    lightTheme = 'light'
}

interface Tokens {
    accessToken: string,
    refreshToken: string,
}
//Theme
export const saveThemeToLocalStorage = (theme: 'light' | 'dark') => {
    localStorage.setItem('Theme', theme);
};

export const loadThemeFromLocalStorage = (): 'light' | 'dark' => {
    const storedTheme = localStorage.getItem('Theme');
    return storedTheme === 'dark' ? 'dark' : 'light';
};

//Tokens
export const saveTokensToLocalStorage = (tokens: Tokens) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
}

export const removeTokensFromLocalStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}

export const loadTokensFromLocalStorage = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
}

//userStatus
export const saveAuthenticatedStatusToLocalStorage = (status: AuthStatus) => {
    localStorage.setItem('userStatus', status);
}

export const loadAuthenticatedStatusToLocalStorage = () => {
    const authenticated = localStorage.getItem('userStatus');
    return authenticated;
}