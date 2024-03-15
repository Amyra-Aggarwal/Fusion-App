import React, { useEffect, useState } from 'react'

export default function Counter() {

    const [count , setCount] = useState(0)
    const [secondCounter , setSecondCounter] = useState(1)

    useEffect(()=>{
        console.log("Component Mounted....")
        return function(){
            console.log("Exit.....")
        }
    },[])

    useEffect(()=>{
        console.log("Update Phase")
        // setCount(count+2)
    },[count])

    useEffect(()=>{
        console.log("Update Phase")
        // setCount(count+2)
    },[secondCounter])

  return (
    <div>
        <h1>Counter : {count}</h1>
        <button onClick={()=>{setCount(count+1)}}>+</button>
        <button onClick={()=>{setCount(count-1)}}>-</button>
        <h1>---------------------------------------------------</h1>
        <h1>Second Counter : {secondCounter}</h1>
        <button onClick={()=>{setSecondCounter(secondCounter+1)}}>+</button>
        <button onClick={()=>{setSecondCounter(secondCounter-1)}}>-</button>
    </div>
  )
}