import { useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import EditTodo from '../EditTodo/EditTodo';
import { ListContainer, ButtonSort } from './TodoList.styles';
import { EditIconCustom, DeleteIconCustom, SwapVertIconCustom } from './TodoList.styles';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../store/hooks';
import { clearEditAlert, clearToggleCompletedTaskAlert, setTasks } from '../../../../store/TasksReducers/tasksSlice';
import { RootState } from '../../../../store/store';
import { format } from 'date-fns';
import './styles.css'
import { ToggleCompletedThunk } from '../../../../store/TasksReducers/tasksThunks';


interface TodoListProps {
    onDelete: (index: number) => void;
    onEdit: (index: number, task: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({onDelete, onEdit}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [ascending, setAscending] = useState(true);

    const sucessEditTask = useSelector((state: RootState) => state.tasks.sucessEditTask)
    const successToggleCompletedTask = useSelector((state: RootState) => state.tasks.successToggleCompletedTask);

    const dispatch = useAppDispatch();
    const tasks = useSelector((state: RootState) => state.tasks.tasks.data);

    const handleDialogOpen = (task: string, index: number) => {
        setCurrentTask(task);
        setCurrentIndex(index);
        setIsDialogOpen(true);
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentTask('');
        setCurrentIndex(null);
    }

    const handleSaveTask = (newTask: string) => {
        if (currentIndex !== null) {
            onEdit(currentIndex, newTask);
        }
    }

    const handleSortToggle = () => {
        setAscending(!ascending);
        sortTasksByDate(ascending);
    };

    const sortTasksByDate = (ascending: boolean = true) => {
        const sortedTasks = [...tasks].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return ascending
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
        dispatch(setTasks(sortedTasks));
    };

    const handleToggleCheckbox = async (id: number) => {
        dispatch(ToggleCompletedThunk({id}))
    }

    const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
    ) => {
    if (reason === 'clickaway') {
      return;
    };
    dispatch(clearToggleCompletedTaskAlert());
    dispatch(clearEditAlert());
    };
    
    return (
        <> 
            {successToggleCompletedTask &&
                <Snackbar open={successToggleCompletedTask} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Задача выполнена.
                    </Alert>
                </Snackbar>
            }
            {sucessEditTask &&
                <Snackbar open={sucessEditTask} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Имя задачи изменено.
                    </Alert>
                </Snackbar>
            }
            <ButtonSort>
                <IconButton onClick={() => handleSortToggle()}>
                    <SwapVertIconCustom />
                </IconButton>
            </ButtonSort>
            <ListContainer className='list'>
                {tasks.length === 0 ? (
                    <p className='msgNoTask'>Список задач пуст</p>
                ) : (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                        <Checkbox
                            onChange={() => {
                                handleToggleCheckbox(task.id)
                            }}
                            checked={task.completed}
                            size='medium'
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            sx={{
                                color: blue[600],
                                '&.Mui-checked': {
                                color: blue[800],
                                },
                            }}
                        />
                        </ListItemIcon>
                        <ListItemText primary={task.text} secondary={format(new Date(task.createdAt), 'dd.MM.yyyy, HH:mm')}/>
                        <IconButton edge='end' aria-label="edit" size="large" onClick={() => handleDialogOpen(task.text, task.id)}>
                            <EditIconCustom />
                        </IconButton>
                        <IconButton edge='end' aria-label="delete" size="large" onClick={() => onDelete(task.id)}>
                            <DeleteIconCustom />
                        </IconButton>
                    </ListItem>
                    ))}
                </List>
                )}
                <EditTodo
                open={isDialogOpen}
                task={currentTask}
                onClose={handleDialogClose}
                onSave={handleSaveTask}
                />
            </ListContainer>
                
        </>
      );
}

export default TodoList;
