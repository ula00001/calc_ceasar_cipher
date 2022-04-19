import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoDeleted } from './TodoListSlice';
import { createSelector } from '@reduxjs/toolkit'


import Button from '@mui/material/Button';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { todoIsDone } from '../todo/TodoListSlice'
import './todo.css'

const TodoList = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.todos.todos);

  const sortedTodos = useMemo(() => {
        const s = [...list]
        return s.sort((a, b) => a.isDone - b.isDone)
  }, [list])

  const onDone = ({id}) => {
    dispatch(todoIsDone(id));
  }

  console.log(list);
  return (
    <div className='list-wrapper'>
      <ul >
        {
          sortedTodos && sortedTodos.map((item, index) => (
            <div className='list-li'
              key={item.id}
            >
              <li
                key={item.name}
              >
                <div className='names'>
                  <label style={item.isDone ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}>{item.name}</label>
                <label style={item.isDone ? { textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : {}}>created {item.date}</label>
                </div>
                <div className='doneBtn'>
                  <Button
                    onClick={()=>onDone(item)}
                  ><CheckCircleRoundedIcon color={`${item.isDone && 'success'}`}/></Button>
                </div>
              </li>
              <Button
                variant="outlined"
                name="encrypt"
                className='btn'
                onClick={() => dispatch(todoDeleted(item.id))}>
                  DELETE</Button>
            </div>
          ))
        }
      </ul>
      <label></label>

    </div>
  )
}

export default TodoList;