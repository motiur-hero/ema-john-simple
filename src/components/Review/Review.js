import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartItem from '../CartItem/CartItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder,setPlaceOrder]= useState(false);

    const handlePlaceOrder = ()=>{
        setPlaceOrder(true)
        setCart([]);
        processOrder();
        
    }

    const removeProduct = (productKey)=>{
        //removeProduct ={removeProduct}
        const newCart = cart.filter(pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
   
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity= savedCart[key];
            return product;
        })
       setCart(cartProducts)
    },[])
    let thankYou;
    if(placeOrder){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
            <h1>Cart Items:{cart.length}</h1>
            {
                    cart.map(pd => <CartItem 
                    key={pd.key}
                    product={pd}
                    removeProduct ={removeProduct}
                    > </CartItem>)
            }
            {thankYou}
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='add-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;