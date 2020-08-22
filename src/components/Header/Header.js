import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useAuth } from '../Login/useAuth';






const Header = () => {
    const auth = useAuth();
    // console.log(auth.user);
    
    
    return (
        <div className="header">
            
            <img src={logo} alt=""/>
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
            
        </div>
        
    );
};

export default Header;