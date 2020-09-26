import React from 'react';
//import { useAuth } from '../Login/useAuth';


const Cart = (props) => {
    //const auth = useAuth();
    //console.log(auth.user);
   
    const cart = props.cart
    //console.log(cart)
    //const total = cart.reduce((total,prd) => total + prd.price,0)
    
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const prd = cart[i];
        total =total+prd.price * prd.quantity
        
    }
    
    let shipping = 0
    if(total > 65){
        shipping= 0;
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if(total > 0){
        shipping= 12.99
    }
    const tax = (total*.10).toFixed(2);
    const grandTotal = (total + Number(tax) + shipping).toFixed(2)
    return (
        <div>
            <h4>Order Summery :</h4>
            <p>Items Orderd:{cart.length}</p>
            <p><small>Vat & Tax : {tax}</small></p>
            <p><small>Product Price: {total}</small></p>
            <p><small>shipping cost: {shipping}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {props.children}

            <div>
                <audio src="../../media/audio.mp3"></audio>
                
            </div>
            
        </div>
    );
};

export default Cart;