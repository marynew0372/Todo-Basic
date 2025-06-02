import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProviderContext } from './components/Themes/ThemeContext';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { muiTheme } from './components/Themes/MuiTheme/muiTheme';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'


(window as any).store = store;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <ThemeProviderContext>
            <MUIThemeProvider theme={muiTheme}>
              <App/>
            </MUIThemeProvider>
          </ThemeProviderContext>
        </Provider>
    </BrowserRouter>
  </StrictMode>,
)

