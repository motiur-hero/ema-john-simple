import React from 'react';
import { useState,useEffect,useRef } from 'react';



const usePrevious = value =>{
    const prev = useRef()
    useEffect( ()=>{
        prev.current = value;
    },[value])

    return prev.current
}

const usePrevious = () => {
const [count, setCount] = useState(0);
const previous = usePrevious(count)

    return (
        <div>
            <h1>count:{count} previous : {previous}</h1>
            <button  onClick={ ()=> setCount(count+1)}>+</button>
            <button onClick={ ()=> setCount(count-1)}>-</button>
        </div>
    );
};

export default usePrevious;