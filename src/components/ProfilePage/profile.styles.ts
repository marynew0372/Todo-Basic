import { styled } from "styled-components";
import Box from '@mui/material/Box';


export const BoxStyled = styled(Box)`
    -webkit-box-shadow: 0 0 10px -3px rgba(0, 0, 0, 1);
    -moz-box-shadow: 0 0 10px -3px rgba(0, 0, 0, 1);
    box-shadow: 0 0 10px -3px rgba(0, 0, 0, 1);

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 450px;
    height: 512px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background};

    span, p {
        font-size: 18px;
    }

    path {
        width: 150px;
    }

    .dataWrapper {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .id-container,
    .email-container,
    .age-container,
    .dateRegistration-container {
        :first-child {
            font-weight: 600;
        }

        padding: 10px;
        display: flex;
        flex-direction: column;
    }

    .buttonsAction {
        display: flex;
        gap: 10px;
    }
`