import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const PrDetails = () => {
    const {productKey} = useParams()
    const singleProduct= fakeData.find(pd =>pd.key === productKey);
    console.log(singleProduct)
    return (
        <div>
           <h1>Your Product Details Here:</h1>
           <Product showCartBtn={false} product={singleProduct}></Product>
        </div>
    );
};

export default PrDetails;