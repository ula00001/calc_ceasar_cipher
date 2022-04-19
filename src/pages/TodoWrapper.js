
import { useState, useCallback } from 'react';
import TodoFrom from "./todo/TodoForm";
import TodoList from "./todo/TodoList";
import Container from '@mui/material/Container';

const TodoWrapper = () => {
  // const [list, setList] = useState(['asd', 'rdgd']);

  // const onAddTodo = (text) => {
  //   setList(prevState => [...list, text]);
  // }

  // const onDeleteItem = (ind) => {
  //   const newList = list.filter((item, index) => index !== ind);
  //   setList(newList);
  // }

  return (
    <Container maxWidth="lg">
      <TodoFrom />
      <TodoList />
    </Container>
  )
}

export default TodoWrapper;
