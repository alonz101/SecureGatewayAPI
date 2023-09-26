// src/views/Product/Product.js

import ProductList from '../../components/productList/productList';
import React from 'react';

// import ProductTable from '../../components/productList/productTable';


const Product = () => {
    // For now, let's just return a static list of products.
    // Later, you can fetch this data from your Python endpoint using a hook.
    const products = [
        { name: 'Product A' , description: 'good product' , price: "5" , size:"big" , image: "https://images.squarespace-cdn.com/content/v1/5397816ce4b03ea7cc913085/1404964925105-YMH53TQ4FF0KJOFM20B8/tranquilizer.png?format=200w"},
        { name: 'Product B' , description: 'good product' , price: "5" , size:"big"},
        { name: 'Product C' , description: 'good product' , price: "5" , size:"big"},
        { name: 'Product D' , description: 'good product' , price: "5" , size:"big"}
    ];

    return (
        <div>
            <ProductList/>
        </div>
    );
}

export default Product;
