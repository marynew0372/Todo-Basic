import * as React from 'react';
import { ButtonStyled } from './button.styles';


interface TaskAddButtonProps {
    onClick: () => void;
}

const TaskAddButton: React.FC<TaskAddButtonProps> = ({onClick}) => {
    return (
        <ButtonStyled variant="contained" onClick={onClick}>Добавить</ButtonStyled>
    )
}

export default TaskAddButton;