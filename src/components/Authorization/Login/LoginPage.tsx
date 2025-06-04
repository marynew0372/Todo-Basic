import * as React from 'react';
import HeaderAppBar from "../../HeaderAppBar/HeaderAppBar";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GlobalStyle from '../../Themes/globalStyles';
import { BoxStyled, TextFieldStyled } from './loginPage.styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { loginUserThunk } from '../../../../store/AuthReducers/authThunks';
import { selectAuthentication, selectAuthErrorPayLoad } from '../../../../store/selectors';
import { AuthStatus, clearSendingStatus } from '../../../../store/AuthReducers/authSlice';
import { Navigate } from 'react-router-dom';
import { ButtonStyled } from '../../MainLayout/AddTodo/button.styles';

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);
    const authentication = useAppSelector(selectAuthentication);

    interface FormData {
        email: string,
        password: string,
        age?: string | undefined
    }

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        age: undefined
    })

    const handleWriteEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
    
            setFormData(prev => ({
                ...prev,
                email: value
            }))
    }

    const handleWritePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
    
            setFormData(prev => ({
                ...prev,
                password: value
            }))
    }

    const handleLogin = () => {
        const {email, password} = formData;
        dispatch(loginUserThunk({email, password}));
    }

    if (authentication === AuthStatus.Authenticated) {
        return <Navigate to = "/" replace />
    }

    const handleCloseAlert = (
                _event: React.SyntheticEvent | Event,
                reason?: SnackbarCloseReason,
                ) => {
                if (reason === 'clickaway') {
                  return;
                };
                    dispatch(clearSendingStatus())
        };

    return (
        <>  
            <Snackbar open={Boolean(authErrorPayLoad)} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert
                onClose={handleCloseAlert}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
                >
                {authErrorPayLoad?.message}
                </Alert>
            </Snackbar>
            <GlobalStyle />
            <HeaderAppBar />
            <BoxStyled>
                <TextFieldStyled
                value={formData.email}
                id="outlined-error"
                label="Логин"
                onChange={handleWriteEmail}
                />
                <TextFieldStyled
                value={formData.password}
                onChange={handleWritePassword}
                id="outlined-error-helper-text"
                label="Пароль"
                />
                <ButtonStyled variant="contained" size="medium" onClick={handleLogin}>
                    Войти
                </ButtonStyled>
            </BoxStyled>
        </>
    )
}

export default LoginPage;