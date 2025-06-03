import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import RegisterPage from "./components/Authorization/RegisterPage/RegisterPage";
import LoginPage from "./components/Authorization/Login/LoginPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { ThemeProvider } from 'styled-components';
import { useThemeContext } from './components/Themes/ThemeContext';
import { lightTheme, darkTheme } from "./components/Themes/theme";
import IconButton from '@mui/material/IconButton';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import NotFoudPage from "./components/NotFound/NotFoundPage";

export interface TaskDate {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
}

const App = () => {
    const { themeMode, toggleTheme } = useThemeContext();
    const theme = themeMode === 'light' ? lightTheme : darkTheme

    return (
        <ThemeProvider theme={theme}>
            <IconButton onClick={toggleTheme} color="primary">
                <ContrastOutlinedIcon />
            </IconButton>
            <Routes>
                <Route path='/' element={<MainLayout />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='*' element={<NotFoudPage />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;