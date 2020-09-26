import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config" 
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom'



firebase.initializeApp(firebaseConfig)



const AuthContext = createContext();

 export const AuthContextProvider = (props)=>{
    const auth = Auth();
 return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest })=> {
    const auth = useAuth();
    //console.log(auth)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) 
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
   


const Auth = ()=>{
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    success:false
   
  });
  
    
const provider = new firebase.auth.GoogleAuthProvider();
const signInWithGoogle = () =>{
   return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName,email} = res.user;
        const signedInUser ={isSignedIn:true,
                              name: displayName,
                               email: email}
      
        setUser(signedInUser);
   console.log(user)
    return signedInUser;
    })
    .catch(err =>{
        console.log(err)
        setUser(null)
        return err.message
    })

}






const signOut = () =>{
    return firebase.auth().signOut().then(function() {
      const signOutUser ={
                          name:'',
                          isSignedIn:false,
                          email:'',
                          password:'',
                          error:'',
                          success:false
                        }
        setUser(signOutUser)
      
        return true;
      }).catch(function(error) {
        return false;
      });
        
}

const handleBlur =(e)=>{
//console.log(e.target.name, e.target.value);
let isFormValid = true;
if(e.target.name === 'email'){
   isFormValid = /^\w+(.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(e.target.value);
  console.log(isFormValid)
}
if(e.target.name === 'password'){
  const isLengthValid = e.target.value.length > 7 ;
  const isNumberValid = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/.test(e.target.value);
   isFormValid = (isLengthValid && isNumberValid);
  console.log(isFormValid);
}
if(isFormValid){
  const newUserInfo = {...user};
   newUserInfo[e.target.name] = e.target.value;
   setUser(newUserInfo);
   console.log(newUserInfo);
}
};

const handleSubmit = (e)=>{
  if(user.email && user.password && user.name)
  {
   return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res=>{
       
      const newUserInfo= {...user}
      newUserInfo.error = '';
      newUserInfo.success = true;
      newUserInfo.isSignedIn = false;
      newUserInfo.name = user.name
      setUser(newUserInfo);
      console.log(newUserInfo)
    })
    .catch(error=> {
      // Handle Errors here.
      const newUserInfo = {...user}
      console.log(newUserInfo)
      newUserInfo.success =false;
      newUserInfo.error = error.message
      setUser(newUserInfo);
      console.log(newUserInfo)
    });
  }
  e.preventDefault();
}


const getUser = user=> {
     
  const { email,displayName} = user;
      return {name:displayName,email,isSignedIn:true,success:true};
      
}

useEffect(()=>{firebase.auth().onAuthStateChanged(function(usr) {
    if ( usr) {
      
        const currentUser = getUser(usr)
            setUser(currentUser)
           
    } else {
      setUser({isSignedIn:false, name:"empty",email:"empty",success:false})
    }
  });},[])



   
return {
    signInWithGoogle,handleSubmit,
    user,handleBlur,
    signOut }
}

export default Auth;