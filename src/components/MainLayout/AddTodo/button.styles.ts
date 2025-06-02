import styled from 'styled-components';
import Button from '@mui/material/Button';

export const ButtonStyled = styled(Button)`
    color: white !important;
    font-family: 'Open Sans', sans-serif !important;
    text-transform: none !important;
    border-radius: 10px !important;
    font-weight: 500 !important;
    font-size: 1rem !important;
    min-width: 100px !important;
    background-color: #9c27b0 !important;

    &:hover {
        background-color: #751d85 !important;
    }
`