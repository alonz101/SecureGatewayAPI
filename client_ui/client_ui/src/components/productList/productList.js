import Grid from '@mui/material/Grid';
import ProductCard from './productCard';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductList = () => {

    const products = useSelector((state) => state.products);

    return (
        <Grid container spacing={4} justifyContent="center">
            {products.map((product) => (
                <Grid item key={product.name} xs={12} sm={6} md={3}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
