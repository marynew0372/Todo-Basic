import styled from "styled-components";
import Dialog from '@mui/material/Dialog';

export const EditTodoCustom = styled(Dialog)`
    & .MuiPaper-root {
        width: 420px;
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
    
    & .MuiFormLabel-root {
        color: ${({ theme }) => theme.text};
    }

    & .MuiInputBase-input {
        color: ${({ theme }) => theme.text};
    }

    & .MuiInputBase-root {
        border-bottom: unset;
    }

    .MuiDialogContent-root{
        display: flex;
        align-items: baseline;
    }

    ::before {
        border-bottom: 1px solid ${({ theme }) => theme.borderInput} !important;
    }
`