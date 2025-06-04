// import * as React from 'react';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { PaginationStyled, StackStyled } from './Pagination.styles';
import ItemsPerPage from './ItemsPerPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { savePage } from '../../../../store/TasksReducers/tasksSlice';
import { fetchTaskThunk } from '../../../../store/TasksReducers/tasksThunks';
import { useAppDispatch } from '../../../../store/store';
import { selectLimit, selectPage, selectTotal, selectTotalPages } from '../../../../store/selectors';


export function PaginationTodo () {
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  // const total = useSelector(selectTotal);
  const totalPages = useSelector(selectTotalPages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTaskThunk({page, limit}))
  }, [page, limit]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        dispatch(savePage(newPage));
    };

  return (
    <>
      <StackStyled spacing={2}>
        <PaginationStyled
          page={page}
          count={totalPages}
          onChange={handlePageChange}
          color='secondary'
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      <ItemsPerPage />
      </StackStyled>
    </>
  );
}