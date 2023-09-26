import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <Card style={{ maxWidth: 345, margin: 20 }}>
            <CardMedia
                component="img"
                alt={product.name}
                height="250"
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
                <Typography variant="h6">
                    ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Size: {product.size}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
