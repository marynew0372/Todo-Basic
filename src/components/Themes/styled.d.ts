import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        text: string;
        borderInput: string;
        applyStyles: () => string;
        backgroundColorBody: string;
    }
}