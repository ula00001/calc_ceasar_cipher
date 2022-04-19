import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { dec, set } from '../actions/actions';

let interval = null
let myCounter = 0;

const Counter = () => {
  // let [count, setCount] = useState(0);
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => clearInterval(interval)
  }, [])

  myCounter = counter.counter;

  const startCountdown = () => {
    clearInterval(interval)
    dispatch(set());

    interval = setInterval(() => {
      console.log("counter: ", myCounter);
      if (myCounter > 0) {
        dispatch(dec())
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  return (
    <div>
      <Button onClick={startCountdown}>Start Countdown</Button>
      {counter.counter}
      <br />
    </div>
  )
}

export default Counter;
