import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';

const usePrevious = value =>{
    const prev = useRef()
    useEffect( ()=>{
        prev.current = value;
    },[value])

    return prev.current
}




const Header = () => {
    const auth = useAuth();
    // console.log(auth.user);
    
    const [count, setCount] = useState(0);
    const previous = usePrevious(count)
    return (
        <div className="header">
            <h1>count:{count} previous : {previous}</h1>
            <button  onClick={ ()=> setCount(count+1)}>+</button>
            <button onClick={ ()=> setCount(count-1)}>-</button>
            
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/Inventory">Manage Inventor here</a>
                {
                    auth.user &&
                    <span style={{color:'yellow'}}>Welcome {auth.user.name}</span>
                    
                }
                {
                    auth.user ?
                     <a href='/Login'>sign Out</a>
                     : <a href='/Login'>sign in</a>
                }
                
            </nav>
            <img src={logo} alt=""/>
        </div>
        
    );
};

export default Header;