"use client"
import { useState } from "react"

import { useAppSelector, useAppDispatch } from '../app/store/hooks'

import { decrement, increment, incrementByAmount } from '../app/store/slices/slice'

const Converter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const [num, setNum] = useState<number>(0);
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNum(Number(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(incrementByAmount(Number(num)));
  };

  // omit rendering logic
  return (
    <div>
      <p>Count: {count}</p>
      <button className="p-5 bg-slate-500 mr-2 mt-5" onClick={() => dispatch(increment())}>+</button>
      <button className="p-5 bg-slate-500" onClick={() => dispatch(decrement())}>-</button>
      <form onSubmit={handleSubmit}>
      <input className="p-5 bg-slate-500" placeholder="amount" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
    </div> 

  ) 
}

export default Converter;