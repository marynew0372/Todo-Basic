import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { AppBarStyled, ButtonTodoStyled, BoxStyled } from './headerAppBar.styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { removeTokensFromLocalStorage } from '../../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { AuthStatus, logout } from '../../../store/AuthReducers/authSlice';
import { selectAuthentication } from '../../../store/selectors';
import { useNavigate } from 'react-router-dom';

function HeaderAppBar() {
  const dispatch = useAppDispatch();
  const authentication = useAppSelector(selectAuthentication);

  interface Setting {
    name: string,
    handler: () => void
  }

  const handleLogout = () => {
    removeTokensFromLocalStorage();
    dispatch(logout());
  }

  const navigate = useNavigate();

  const handleGoToProfile = () => {
    navigate('/profile', {replace: true});
  }

  const settings: Setting[] = [
    {
      name: 'Профиль',
      handler: handleGoToProfile,
    },
    {
      name: 'Выйти',
      handler: handleLogout,
    }
  ];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBarStyled position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <ButtonTodoStyled
              as={Link}
              to = '/'
            >
              TODO
            </ButtonTodoStyled>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
                <MenuItem>
                  <Typography sx={{ textAlign: 'center' }}>Register</Typography>
                </MenuItem>
            </Menu>
          </Box>
          {(authentication === AuthStatus.Unauthenticated || authentication === AuthStatus.Pending) && (
            <BoxStyled className='action-buttons'>
              <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  variant='outlined'
                  sx={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                  component={Link}
                  to={'/register'}
                  onClick={handleCloseNavMenu}
                >
                  Регистрация
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  variant='outlined'
                  component={Link}
                  to = '/login'
                  sx={{
                    color: 'white',
                    borderColor: 'white'
                  }}
                  onClick={handleCloseNavMenu}
                >
                  Войти
                </Button>
              </Box>
            </BoxStyled>
          )}
          {authentication === AuthStatus.Authenticated &&
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Открыть настройки">
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Аккаунт
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.name} 
                    onClick={() => {
                      setting.handler();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBarStyled>
  );
}
export default HeaderAppBar;