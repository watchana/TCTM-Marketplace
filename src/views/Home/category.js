import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const ProductImageCard = ({ image }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Product Image"
      />
    </Card>
  );
};

export default ProductImageCard;