import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        background-color: ${({ theme }) => theme.backgroundColorBody};
        color: ${({ theme }) => theme.text};
        transition: all 0.3s ease;
    }
`;

export default GlobalStyle;
