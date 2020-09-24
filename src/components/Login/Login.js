import React from 'react';
import Auth from './useAuth';
import './Login.css'


const Login = () => {
    const auth = Auth();
   //console.log(auth.user)
    const handleSignIn = ()=>{
      auth.signInWithGoogle()
      .then(res =>{
        window.location.pathname='/review'
      })
    }

    const handleSignOut = ()=>{
        auth.signOut()
        .then(res =>{
            window.location.pathname='/shop'
        })
    }
    
    return (
        <div className='login-area'>
            
            <div className="login-data">
            <h3>Sign in with Your google Account</h3>
    
    
                {   
                auth.user.isSignedIn ? <button onClick={handleSignOut}>sign Out</button> :
                <button onClick={handleSignIn}>Sign In Google</button>
            }
            <br/>
            <h4>signIn with Email and password</h4>
            
            <form action>
            
            <input type="text" name='email' onBlur={auth.handleBlur} placeholder='Your email' required/>
            <br/>
            <input type="password" name='password' onBlur={auth.handleBlur} placeholder='Your password' required/>
            <br/>
            <input  type="submit" value='signIn'/>
            </form>
            <br/>

            <form onSubmit={auth.handleSubmit}>
            <input type="text" name='name' placeholder='Your name' onBlur={auth.handleBlur}/>
            <br/>  
            <input type="text" onBlur={auth.handleBlur} name='email' placeholder='Your email' required/>
            <br/>
            <input type="password" onBlur={auth.handleBlur} name='password' placeholder='Your password' required/>
            <br/>
            <input type="submit" value='create Account'/>
            </form>
            <p style={{color:'red'}}>{auth.user.error}</p>
           {auth.user.success && <p style={{color:'green'}} > User created successful.</p>}
            
             
      
            </div>
            
        </div>
    );
};

export default Login;