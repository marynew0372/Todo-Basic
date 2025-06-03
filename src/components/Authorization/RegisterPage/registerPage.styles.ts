import { styled } from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const BoxStyled = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const TextFieldStyled = styled(TextField)`
    .MuiOutlinedInput-root {
        &:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline {
            border-color: ${({ theme }) => theme.text};
        }
    }

    fieldset:hover {
        border-color: white;
    }

    input {
        color: ${({ theme }) => theme.text};
    }

    label {
        color: ${({ theme }) => theme.text};
    }
    
    formHelperText {
        color: ${({ theme }) => theme.text};
    }

    fieldset {
        border-color: ${({ theme }) => theme.borderInput}
    }
`