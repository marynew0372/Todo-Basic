import { ButtonStyled } from '../../MainLayout/AddTodo/button.styles.ts';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks.ts';
import { ChangePassword, changePasswordThunk } from '../../../../store/AuthReducers/authThunks.ts';
import {selectAuthErrorPayLoad, selectSendingStatus} from "../../../../store/selectors.ts";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from "react";
import { clearSendingStatus, SendingStatus } from '../../../../store/AuthReducers/authSlice.ts';
import { DialogStyled } from './changePassword.styled.ts';


interface ChangePasswordDialogProps {
    open: boolean,
    onClose: () => void,
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose}) => {
    const dispatch = useAppDispatch();
    const sendingStatus = useAppSelector(selectSendingStatus);

    const [formData, setFormData] = useState<ChangePassword>({
        oldPassword: '',
        newPassword: '' 
    });

    const [errorVisual, setErrorVisual] = useState({
            oldPassword: false,
            newPassword: false 
        })
    
    const [errorsText, setErrorsText] = useState({
        oldPassword: '',
        newPassword: '' 
    })

    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);

    const handleWriteOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            oldPassword: value
        }))
        if (value.length < 6) {
            setErrorVisual((prev) => ({
                ...prev,
                oldPassword: true
            }));
            setErrorsText((prev) => ({
                ...prev,
                oldPassword: 'Минимальная длина пароля: 6 символов'
            }));
        } else {
            setErrorVisual((prev) => ({
                ...prev,
                oldPassword: false
            }));
            setErrorsText((prev) => ({
                ...prev,
                oldPassword: ''
            }));
        }
    }

    const validateNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFormData((prev) => ({
            ...prev,
            newPassword: value
        }));

        if (value.length < 6) {
            setErrorVisual((prev) => ({
                ...prev,
                newPassword: true
            }));
            setErrorsText((prev) => ({
                ...prev,
                newPassword: 'Минимальная длина пароля: 6 символов'
            }));
        } else {
            setErrorVisual((prev) => ({
                ...prev,
                newPassword: false
            }));
            setErrorsText((prev) => ({
                ...prev,
                newPassword: ''
            }));
        }
    }

    const handleChangePassword = async () => {
        if (!errorVisual.oldPassword && !errorVisual.newPassword) {
            await dispatch(changePasswordThunk(formData));
            setFormData((prev) => ({
            ...prev,
            oldPassword: '',
            newPassword: ''
            }))
            setTimeout(() => {
                handleCloseDialog();
            }, 1000);
        }
    }

    const handleCloseDialog = () => {
        if (sendingStatus === SendingStatus.Success) {
            onClose();
            dispatch(clearSendingStatus());
        }
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
            <DialogStyled
                className='dialog-main'
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                    component: 'form'
                    },
                }}
                >
                <DialogTitle>Изменение пароля</DialogTitle>
                <DialogContent>
                    <TextField
                    value={formData.oldPassword}
                    onChange={handleWriteOldPassword}
                    autoFocus
                    required
                    error={errorVisual.oldPassword}
                    helperText={errorsText.oldPassword}
                    margin="dense"
                    name="old-password"
                    label="Старый пароль"
                    type="old-password"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    value={formData.newPassword}
                    onChange={validateNewPassword}
                    autoFocus
                    required
                    error={errorVisual.newPassword}
                    helperText={errorsText.newPassword}
                    margin="dense"
                    name="new-password"
                    label="Новый пароль"
                    type="new-password"
                    fullWidth
                    variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonStyled onClick={onClose}>Закрыть</ButtonStyled>
                    <ButtonStyled onClick={handleChangePassword}>Применить</ButtonStyled>
                </DialogActions>
            </DialogStyled>
        </>
    )
}

export default ChangePasswordDialog;