import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { saveLimit } from '../../../../store/TasksReducers/tasksSlice';
import InputLabel from '@mui/material/InputLabel';
import { FormControlStyled, OutlinedInputStyled, SelectStyled } from './itemsPerPage.styles';
import { selectLimit } from '../../../../store/selectors';

export default function ItemsPerPage() {
  const dispatch = useDispatch();
  const limit = useSelector(selectLimit);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const limit = parseInt(event.target.value);
    dispatch(saveLimit(limit));

  }

  return (
    <FormControlStyled sx={{ m: 1, width: 100}}>
      <InputLabel id="demo-multiple-name-label">Кол-во</InputLabel>
      <SelectStyled
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={limit.toString()}
        onChange={handleChange}
        input={<OutlinedInputStyled label="Name" />}
      >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
      </SelectStyled>
    </FormControlStyled>
  );
}