import React, { useEffect } from 'react';
import { useState } from "react";
import './Shop.css'
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    
     const first15 = fakeData.slice(0,15)
    const [products, setProducts] = useState(first15);
    const [cart,setCart] = useState([])
    const [count, setCount] = useState(0)
    

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        //console.log(savedCart)
        const productsKey = Object.keys(savedCart)
        const previousProduct = productsKey.map(pPrdkey =>{

        const product = fakeData.find(pdKey => pdKey.key === pPrdkey)
            product.quantity = savedCart[pPrdkey]
            return product;
        })
        //console.log(previousProduct)
        setCart(previousProduct);
        
    },[])
   
         const handleAddProduct= (product) =>{
            const toBeAdded = product.key
        //console.log('product added',product);
        const sameProduct = cart.find(pd => pd.key === toBeAdded)
        let count =1
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1
            sameProduct.quantity = sameProduct.quantity + 1
            const others= cart.filter(pd => pd.key !== toBeAdded)
             newCart = [...others,sameProduct]
            
        }
        else{
            product.quantity =1
            newCart = [...cart, product]
            
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
    
                {products.map(pd =><Product key={pd.key} showCartBtn = {true} handleAddProduct = {handleAddProduct}product={pd}> </Product> )}
            
            </div>
            <div className="cart-container">
            
            
                <Cart cart={cart}>
                <Link to='/review'><button className='add-button'>Review Order</button></Link>
                </Cart>
            
        </div>
        </div>
    );
};

export default Shop;