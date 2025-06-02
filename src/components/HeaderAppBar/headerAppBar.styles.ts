import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export const AppBarStyled = styled(AppBar)`
    // top: 300px;
    // position: absolute !important;
    // width: 450px !important;
    // height: 69px;
    box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 1) !important;
    border-radius: 10px;
    background-color: #9c27b0 !important;
    margin-bottom: 20px;

    .MuiToolbar-root {
        justify-content: space-between;
    }

        .MuiBox-root {
            display: flex;
        }
`

export const ButtonTodoStyled = styled(Button)`
    display: flex;
    font-weight: 700;
    letter-spacing: 0.5rem;
    color: white;
`

export const ButtonHeaderStyled = styled(Button)`
    display: flex;
    margin: 2px 0 2px 0;
    color: white;
`

export const BoxStyled = styled(Box)`
    gap: 25px;
`