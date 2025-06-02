import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { refreshTokens } from '../../../api/authUser';
import { login, logout } from '../../../../store/AuthReducers/authSlice';
import { loadTokensFromLocalStorage } from '../../../utils/localStorage';

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { accessToken } = loadTokensFromLocalStorage();
                if (!accessToken) {
                    dispatch(logout());
                    return;
                }
                const tokens = await refreshTokens();
                console.log(`из хука`,tokens);
                const newAccessToken = tokens.accessToken;
                dispatch(login(newAccessToken));
                
            } catch (error) {
                console.log('ошибка в хуке')
                console.error(error);
                dispatch(logout());
            }
        };
        checkAuth();
    }, [dispatch]);
};