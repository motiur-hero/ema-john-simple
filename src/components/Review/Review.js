import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import CartItem from '../CartItem/CartItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import Auth from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placeOrder,setPlaceOrder]= useState(false);

    const //handlePlaceOrder = ()=>{
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

    const auth = Auth();
    return (
        <div className='shop-container'>
            <div className="product-container">
            <h1>Your Cart Items:{cart.length}</h1>
            {
                    cart.map(pd => <CartItem 
                    key={pd.key}
                    product={pd}
                    removeProduct ={removeProduct}
                    > </CartItem>)
            }
            {thankYou}
            {
                !cart.length &&
                <h1>Your cart is empty!!<a href='/shop'>Keep shopping...</a></h1>
            }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Shipment">
                        {
                            auth.user ?
                            <button className='add-button'>Proceed Checkout</button>
                            : <button className='add-button'>Login to Proceed</button>
                            
                        }
                            </Link>
                            
                        
                        
                    
                </Cart>
            </div>
        </div>
    );
};

export default Review;