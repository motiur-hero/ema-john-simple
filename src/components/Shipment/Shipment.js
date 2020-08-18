import React from 'react';
import { useForm} from 'react-hook-form';
import './Shipment.css'
import {useAuth} from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    const auth = useAuth();
    //console.log(auth,'third') 
    return (
      
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
     
          <input name="name" 
          defaultValue={auth.user.name}  
          ref={register({ required: true })} 
          placeholder='Your Name'/>
        {
        errors.name && <span className='error' >name is required</span>
        }

        <input name="email" 
        defaultValue={auth.user.email} 
        ref={register({ required: true })} 
        placeholder='Your email'/>
        
        {
        errors.email && <span className='error'>email is required</span>
        }

        <input name="address" 
        ref={register({ required: true })} 
        placeholder='Your Address'/>
        
        {errors.address && <span className='error'>address is required</span>}

        <input name="country" 
        ref={register({ required: true })} 
        placeholder='Your Country'/>
        
        {errors.country && <span className='error'>country is required</span>}

        <input name="city" 
        ref={register({ required: true })} 
        placeholder='Your city'/>
        
        {errors.city && <span className='error'>city is required</span>}

        <input name="zip" 
        ref={register({ required: true })} 
        placeholder='ZIP code'/>
        
        {errors.zip && <span className='error'>ZIP code is required</span>}

        <input name="contact" 
        ref={register({ required: true })} 
        placeholder='Your contact number'/>
        
        {errors.contact && <span className='error'>Contact number is required</span>}
        
        <input id='submit-btn' type="submit" />
      </form>
    );
  }


export default Shipment;