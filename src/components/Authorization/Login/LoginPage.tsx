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
import { validateEmail, validatePassword } from '../../../utils/handleValidationData';

interface FormData {
    email: string,
    password: string,
}

const initialFormData: FormData = {
    email: '',
    password: '',
}

const LoginPage = () => {
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormData>(initialFormData);

    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);
    const authentication = useAppSelector(selectAuthentication);


    const handleLogin = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            dispatch(loginUserThunk({
                email: formData.email.trim(),
                password: formData.password.trim(),
            }));
        }
    };

    if (authentication === AuthStatus.Authenticated) {
        return <Navigate to = "/" replace />
    }

    const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        let error = '';
        if (field === 'email') error = validateEmail(value);
        if (field === 'password') error = validatePassword(value);

        setErrors(prev => ({ ...prev, [field]: error }));
    };

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
                error={!!errors.email}
                id="outlined-error"
                label="Логин"
                onChange={handleChange('email')}
                helperText={errors.email}
                />
                <TextFieldStyled
                value={formData.password}
                error={!!errors.password}
                onChange={handleChange('password')}
                helperText={errors.password}
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