import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GlobalStyle from '../../Themes/globalStyles';
import HeaderAppBar from "../../HeaderAppBar/HeaderAppBar";
import { useState } from 'react';
import { BoxStyled, TextFieldStyled } from './registerPage.styles';
import isEmail from 'validator/lib/isEmail';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
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
        email: string | undefined,
        password: string | undefined,
        age?: string | undefined
    }

    const [formData, setFormData] = useState<FormData>({
        email: undefined,
        password: undefined,
        age: undefined,
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

        if (/\s/.test(value)) {
        setErrorsText(prev => ({
            ...prev,
            email: 'Почта не должна содержать пробелы'
        }));
        setErrorsVisual(prev => ({
            ...prev,
            email: true
        }));
        setFormData(prev => ({
            ...prev,
            email: undefined
        }));
        return;
    }

        setFormData(prev => ({
            ...prev,
            email: value
        }))

        if (!isEmail(value.trim()) || value.length === 0) {
            setErrorsText(prev => ({
                ...prev,
                email: 'Недопустимый формат'
            }))
            setErrorsVisual(prev => ({
                ...prev,
                email: true
            }));
            setFormData(prev => ({
            ...prev,
            email: undefined
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

        if (/\s/.test(value)) {
        setErrorsText(prev => ({
            ...prev,
            password: 'Пароль не должен содержать пробелы'
        }));
        setErrorsVisual(prev => ({
            ...prev,
            password: true
        }));
        setFormData(prev => ({
            ...prev,
            password: undefined
        }));
        return;
    }

        setFormData(prev => ({
            ...prev,
            password: value
        }));

        if (value.trim().length < 6) {
            setErrorsText(prev => ({
                ...prev,
                password: 'Минимальная длина пароля: 6 символов'
            }));
            setErrorsVisual(prev => ({
                ...prev,
                password: true
            }));
            setFormData(prev => ({
                ...prev,
                password: undefined
            }));
        } else {
            setErrorsText(prev => ({
                ...prev,
                password: ''
            }));
            setErrorsVisual(prev => ({
                ...prev,
                password: false
            }));
        }
    };

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
        if (!errorsVisual.email && !errorsVisual.password && email && password) {
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
            {authentication === AuthStatus.Pending &&
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
            {authentication === AuthStatus.Pending && 
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