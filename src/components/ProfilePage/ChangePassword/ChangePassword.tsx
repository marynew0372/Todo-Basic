import { ButtonStyled } from '../../MainLayout/AddTodo/button.styles.ts';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { ChangePassword, changePasswordThunk } from '../../../../store/AuthReducers/authThunks.ts';
import { selectAuthErrorPayLoad } from "../../../../store/selectors.ts";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import * as React from "react";
import { clearSendingStatus } from '../../../../store/AuthReducers/authSlice.ts';
import { DialogStyled } from './changePassword.styled.ts';
import { validatePassword } from '../../../utils/handleValidationData.ts';


interface ChangePasswordDialogProps {
    open: boolean,
    onClose: () => void,
}

const initialFormData: ChangePassword = {
    oldPassword: '',
    newPassword: '',
}

interface Errors {
    oldPassword: boolean,
    newPassword: boolean,
}

const initialErrors: Errors = {
    oldPassword: false,
    newPassword: false,
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onClose}) => {
    const dispatch = useAppDispatch();
    const authErrorPayLoad = useAppSelector(selectAuthErrorPayLoad);
    
    const [formData, setFormData] = useState<ChangePassword>(initialFormData);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    const handleChange = (field: keyof ChangePassword) => (event: React.ChangeEvent<HTMLInputElement>) => {
         const { value } = event.target;
         setFormData(prev => ({ ...prev, [field]: value }));

         let error = '';
         if (field === 'oldPassword') error = validatePassword(value);
         if (field === 'newPassword') error = validatePassword(value);

         setErrors(prev => ({ ...prev, [field]: error}));
    }

    const handleCloseDialog = () => {
        onClose();
        dispatch(clearSendingStatus());
    };

    const handleChangePassword = async () => {
        if (!errors.oldPassword && !errors.newPassword) {
            await dispatch(changePasswordThunk(formData));
            setFormData((prev) => ({
            ...prev,
            oldPassword: '',
            newPassword: ''
            }))
            !Boolean(authErrorPayLoad) && handleCloseDialog();
        }
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
                    onChange={handleChange('oldPassword')}
                    autoFocus
                    required
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword}
                    margin="dense"
                    name="old-password"
                    label="Старый пароль"
                    type="old-password"
                    fullWidth
                    variant="standard"
                    />
                    <TextField
                    value={formData.newPassword}
                    onChange={handleChange('newPassword')}
                    autoFocus
                    required
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
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