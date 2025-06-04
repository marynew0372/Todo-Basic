import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GlobalStyle from '../../Themes/globalStyles';
import HeaderAppBar from "../../HeaderAppBar/HeaderAppBar";
import { useState } from 'react';
import { BoxStyled, TextFieldStyled } from './registerPage.styles';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { registerUserThunk } from '../../../../store/AuthReducers/authThunks';
import { selectAuthErrorPayLoad, selectAuthentication } from '../../../../store/selectors';
import { AuthStatus, clearSendingStatus } from '../../../../store/AuthReducers/authSlice';
import { Navigate } from 'react-router-dom';
import { ButtonStyled } from '../../MainLayout/AddTodo/button.styles';
import { validateAge, validateEmail, validatePassword } from '../../../utils/handleValidationData';

interface FormData {
    email: string;
    password: string;
    age?: string;
}

const initialFormData: FormData = {
    email: '',
    password: '',
    age: '',
};

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);
    const authentication = useAppSelector(selectAuthentication);

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<{ email: string; password: string; age: string }>({
        email: '',
        password: '',
        age: '',
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        let error = '';
        if (field === 'email') error = validateEmail(value);
        if (field === 'password') error = validatePassword(value);
        if (field === 'age') error = validateAge(value);

        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleRegistration = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const ageError = validateAge(formData.age);

        setErrors({ email: emailError, password: passwordError, age: ageError });

        if (!emailError && !passwordError) {
            dispatch(registerUserThunk({
                email: formData.email.trim(),
                password: formData.password.trim(),
                age: formData.age || undefined,
            }));
            setShowAlert(false);
        } else {
            setShowAlert(true);
        }
    };

    if (authentication === AuthStatus.Authenticated) {
        return <Navigate to="/" replace />;
    }

    const handleCloseAlert = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') return;
        setShowAlert(false);
        dispatch(clearSendingStatus());
    };

    return (
        <>
            <GlobalStyle />
            <HeaderAppBar />
            <BoxStyled>
                <TextFieldStyled
                    value={formData.email}
                    error={!!errors.email}
                    label="Логин"
                    onChange={handleChange('email')}
                    helperText={errors.email}
                />
                <TextFieldStyled
                    value={formData.password}
                    error={!!errors.password}
                    label="Пароль"
                    type="password"
                    onChange={handleChange('password')}
                    helperText={errors.password}
                />
                <TextFieldStyled
                    value={formData.age}
                    error={!!errors.age}
                    label="Возраст (необязательно)"
                    onChange={handleChange('age')}
                    helperText={errors.age}
                />
                <ButtonStyled variant="contained" size="medium" onClick={handleRegistration}>
                    Зарегистрироваться
                </ButtonStyled>
            </BoxStyled>
            <Snackbar open={showAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Указаны не все данные или они не соответствуют требованиям.
                </Alert>
            </Snackbar>
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
        </>
    );
};

export default RegisterPage;