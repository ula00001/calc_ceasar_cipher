import { useState, useCallback } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { todoCreated } from '../todo/TodoListSlice'
import { useDispatch, useSelector } from 'react-redux';

const TodoFrom = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todos.todos)

  const getDate = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
  }

  const onAdd = useCallback(() => {
    if (!text) return;
    const newTodo = {
      id: Date.now(),
      name: text,
      date: getDate(),
      isDone: false,
    }
    dispatch(todoCreated(newTodo));

    setText("");
  }, [text])

  return (
    <>
      <Box
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{
            '& > :not(style)': { mr: 2, width: '50ch' },
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onAdd();
            }
          }}
          id="outlined-name"
          label="Enter msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
         <Button
          variant="outlined"
          name="encrypt"
          onClick={() => onAdd()}>
          ADD</Button>
      </Box>

    </>

  )
}

export default TodoFrom;