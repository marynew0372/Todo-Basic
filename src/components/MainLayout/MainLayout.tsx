import { useEffect } from "react";
import AddTodo from './AddTodo/AddTodo'
import TodoList from './TodoList/TodoList';
import GlobalStyle from '../Themes/globalStyles';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { PaginationTodo } from './Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchTaskThunk, addTaskThunk, deleteTaskThunk, editTaskThunk } from '../../../store/TasksReducers/tasksThunks';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { clearDeleteErrorAlert } from "../../../store/TasksReducers/tasksSlice";
import HeaderAppBar from "../HeaderAppBar/HeaderAppBar";
import { selectAuthentication, selectLimit, selectPage } from "../../../store/selectors";
import ProtectedRoute from "../ProtectedRoute";
import './../../App.css'

export interface TaskDate {
    id: number;
    text: string;
    createdAt: Date;
    completed: boolean;
}

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const successDeleteTask = useSelector((state: RootState) => state.tasks.successDeleteTask);
    const errorDeleteTask = useSelector((state: RootState) => state.tasks.errorDeleteTask);
    const page = useAppSelector(selectPage);
    const limit = useAppSelector(selectLimit);
    
    const authentication = useAppSelector(selectAuthentication);

    useEffect(() => {
        dispatch(fetchTaskThunk({page: 1, limit: 10}));
    }, []);
    
    const handleAddTask = async (taskText: string) => {
        await dispatch(addTaskThunk({taskText}));
        dispatch(fetchTaskThunk({page, limit}));
    };
    
    const handleDeleteTask = async (id: number) => {
        await dispatch(deleteTaskThunk({id}));
        dispatch(fetchTaskThunk({page, limit}));
    };

    const handleEditTask = (id: number, newText: string) => {
        dispatch(editTaskThunk({id, newText}));
    };

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
        ) => {
        if (reason === 'clickaway') {
          return;
        };
        dispatch(clearDeleteErrorAlert());
        };

    return (
        <>
            {successDeleteTask && (
                <Snackbar open={successDeleteTask} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Задача успешно удалена.
                    </Alert>
                </Snackbar>
            )}
            {errorDeleteTask && (
                <Snackbar open={errorDeleteTask} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    Возникла ошибка при удалении задачи.
                    </Alert>
                </Snackbar>
            )}
                <GlobalStyle />
                <HeaderAppBar />
                <ProtectedRoute authentication={authentication}>
                    <AddTodo onAddTask={handleAddTask} />
                    <TodoList onDelete={handleDeleteTask} onEdit={handleEditTask}/>
                    <PaginationTodo />
                </ProtectedRoute>
        </>
    );
};

export default MainLayout;