import { createContext, useContext, useState, useEffect } from 'react';
import { saveThemeToLocalStorage } from '../../utils/localStorage';
import { loadThemeFromLocalStorage } from "../../utils/localStorage";


type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
    themeMode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderContext = ({ children }: { children: React.ReactNode }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const toggleTheme = () => {
        setThemeMode((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            saveThemeToLocalStorage(newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        const storedTheme = loadThemeFromLocalStorage();
        setThemeMode(storedTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('Компонент находится вне области действия провайдера "ThemeProviderContext"');
    return context;
  }