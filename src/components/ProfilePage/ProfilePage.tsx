import HeaderAppBar from '../HeaderAppBar/HeaderAppBar';
import GlobalStyle from '../Themes/globalStyles';
import { BoxStyled } from './profile.styles';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { selectAuthentication, selectUserData } from '../../../store/selectors';
import { getProfileDataThunk } from '../../../store/AuthReducers/authThunks';
import { ButtonStyled } from '../MainLayout/AddTodo/button.styles';
import { removeTokensFromLocalStorage } from '../../utils/localStorage';
import { logout } from '../../../store/AuthReducers/authSlice';
import ChangePasswordDialog from './ChangePassword/ChangePassword';
import ProtectedRoute from '../ProtectedRoute';

const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const authentication = useAppSelector(selectAuthentication);
    const userData = useAppSelector(selectUserData);

    const { id, email, age, createdAt } = userData || {};
    const dateRegistration = createdAt && new Date(createdAt).toLocaleDateString();

    useEffect(() => {
        dispatch(getProfileDataThunk());
    }, []);

    const handleLogout = () => {
        removeTokensFromLocalStorage();
        dispatch(logout());
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <GlobalStyle/>
            <HeaderAppBar />
            <ProtectedRoute authentication={authentication}>
                <BoxStyled>
                    <div className='wrapper'>
                        <h1>Профиль</h1>
                        <div className='dataWrapper'>
                            <div className='id-container'>
                                <span>ID:</span>
                                <span>{id}</span>
                            </div>
                            <div className='email-container'>
                                <span>Логин:</span>
                                <span>{email}</span>
                            </div>
                            <div className='age-container'>
                                <span>Возраст:</span>
                                <span>{!age ? 'Не указан' : age}</span>
                            </div>
                            <div className='dateRegistration-container'>
                                <span>Дата регистрации:</span>
                                <span>{dateRegistration}</span>
                            </div>
                            <div className='buttonsAction'>
                                <ButtonStyled variant="contained" onClick={handleClickOpen}>Изменить пароль</ButtonStyled>
                                <ButtonStyled variant="contained" onClick={handleLogout}>Выйти</ButtonStyled>
                            </div>
                        </div>
                    </div>
                    <ChangePasswordDialog
                        open={open}
                        onClose={handleClose}
                        />
                </BoxStyled>
            </ProtectedRoute>
        </>
    )
}

export default ProfilePage;