import React from 'react';
import './CartItem.css'

const CartItem = (props) => {
   
    const {name,quantity,key,price} = props.product
    return (
        <div className='cart-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: ${price}</p>
            <button 
            className='add-button'
            onClick={()=>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default CartItem;