import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

const ProductImageCard = ({ name, image }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
      />
    </Card>
  );
};

export default ProductImageCard;