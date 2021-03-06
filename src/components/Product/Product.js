import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {
    //console.log(props)
    const { name, price, seller, img, stock,key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
    <h4  className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <br/>
                <p><small>by:{seller}</small></p>
                
                <p> $ {price}</p>
            
                <p><small>only {stock} let in stock- Order soon</small></p>
                {props.showCartBtn === true && 
                <button onClick={()=>props.handleAddProduct(props.product)} 
                className="add-button">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    add to cart
                    </button>}
            </div>

        </div>
    );
};

export default Product;