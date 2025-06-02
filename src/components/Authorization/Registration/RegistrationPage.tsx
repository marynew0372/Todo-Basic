import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import GlobalStyle from '../../Themes/globalStyles';
import HeaderAppBar from "../../HeaderAppBar/HeaderAppBar";
import { useState } from 'react';
import { BoxStyled, TextFieldStyled } from './registrationPage.styles';
import isEmail from 'validator/lib/isEmail';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { registerUserThunk } from '../../../../store/AuthReducers/authThunks';
import { selectAuthErrorPayLoad, selectAuthentication } from '../../../../store/selectors';
import { AuthStatus, clearSendingStatus } from '../../../../store/AuthReducers/authSlice';
import { Navigate } from 'react-router-dom';
import { ButtonStyled } from '../../MainLayout/AddTodo/button.styles';

const RegisterPage = () => {
    const dispatch = useAppDispatch();

    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);
    const authentication = useAppSelector(selectAuthentication);

    const [globalStateDataError, setGlobalStateDataError] = useState(false);

    interface FormData {
        email: string,
        password: string,
        age?: string | undefined
    }

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        age: '',
    });

    const [errorsVisual, setErrorsVisual] = useState({
        email: false,
        password: false,
        age: false,
    })

    const [errorsText, setErrorsText] = useState({
        email: '',
        password: '',
        age: '',
    })

    

    const handleWriteEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setFormData(prev => ({
            ...prev,
            email: value
        }))

        if (!isEmail(value) || value.length === 0) {
            setErrorsText(prev => ({
                ...prev,
                email: 'Недопустимый формат'
            }))
            setErrorsVisual(prev => ({
                ...prev,
                email: true
            }));
        } else {
            setErrorsText(prev => ({
                ...prev,
                email: ''
            }))
            setErrorsVisual(prev => ({
                ...prev,
                email: false
            }));
        }
    }

    const handleWritePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setFormData(prev => ({
            ...prev,
            password: value
        }))

        if (value.length < 6) {
            setErrorsText(prev => ({
                ...prev,
                password: 'Минимальная длина пароля: 6 символов'
            }))
            setErrorsVisual(prev => ({
                ...prev,
                password: true
            }));
        } else {
            setErrorsText(prev => ({
                ...prev,
                password: ''
            }))
            setErrorsVisual(prev => ({
                ...prev,
                password: false
            }));
        }
    }

    const handleWriteAge = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = (event.target);

        if (!value) {
            setFormData(prev => ({
            ...prev,
            age: undefined
            }))
        } else if (value === '' || /^[0-9]+$/.test(value) && value.length < 3) {
            setFormData(prev => ({
            ...prev,
            age: value
            }))
        }
    }

    const handleRegistration = async () => {
        const {email, password, age} = formData;
        if (!errorsVisual.email && !errorsVisual.password) {
                dispatch(registerUserThunk({email, password, age}));
                if (authentication === AuthStatus.Unauthenticated) {
                    setGlobalStateDataError(false);
                } else if (authentication === AuthStatus.Authenticated) {
                    setGlobalStateDataError(false);
                }
        } else {
            setGlobalStateDataError(true);
        }    
    }

    if (authentication === AuthStatus.Authenticated) {
        return <Navigate to="/" replace />
    }

    const handleCloseAlert = (
            _event: React.SyntheticEvent | Event,
            reason?: SnackbarCloseReason,
            ) => {
            if (reason === 'clickaway') {
              return;
            };
                setGlobalStateDataError(false);
                dispatch(clearSendingStatus())
    };

    return (
        <>
            {authentication === AuthStatus.Unauthenticated && 
                <Snackbar open={globalStateDataError} autoHideDuration={2000} onClose={handleCloseAlert}>
                    <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Указаны не все данные или они не соответствуют требованиям.
                    </Alert>
                </Snackbar>
            }
            {authentication === AuthStatus.Unauthenticated && 
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
            }
                <GlobalStyle />
                <HeaderAppBar />
                <BoxStyled>
                    <TextFieldStyled
                    value={formData.email}
                    error={errorsVisual.email}
                    id="outlined-error"
                    label="Логин"
                    onChange={handleWriteEmail}
                    helperText={errorsText.email}
                    />
                    <TextFieldStyled
                    value={formData.password}
                    onChange={handleWritePassword}
                    error={errorsVisual.password}
                    id="outlined-error-helper-text"
                    label="Пароль"
                    helperText={errorsText.password}
                    />
                    <TextFieldStyled
                    onChange={handleWriteAge}
                    value={formData.age}
                    error={errorsVisual.age}
                    id="outlined-error-helper-text"
                    label="Возраст (необязательно)"
                    helperText={errorsText.age}
                    />
                    <ButtonStyled variant="contained" size="medium" onClick={handleRegistration}>
                        Зарегистрироваться
                    </ButtonStyled>
                </BoxStyled>
        </>
    )
}


export default RegisterPage;