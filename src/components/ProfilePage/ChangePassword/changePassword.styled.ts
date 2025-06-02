import styled from "styled-components"
import Dialog from '@mui/material/Dialog';


export const DialogStyled = styled(Dialog)`
    .MuiPaper-root {
        background-color: ${({ theme }) => theme.background};
        width: 470px;
        height: auto;
    }

    .MuiTypography-h6 {
        color: ${({ theme }) => theme.text};
    }

    .MuiFormLabel-root {
        color: ${({ theme }) => theme.text};
    }

    .MuiInputBase-root {
        color: ${({ theme }) => theme.text};
    }

    ::before {
        border-bottom: 1px solid ${({theme }) => theme.borderInput} !important;
    }

    .MuiDialogActions-root {
        justify-content: center;
    }
`