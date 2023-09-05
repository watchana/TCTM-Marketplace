import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardContent, Typography } from '@mui/material'

const ProductImageCard = ({ product, name, image }) => {
  return (
    <Card>
      {/* แสดงรูปภาพสินค้า */}
      <CardMedia component='img' height='200' image={image} style={{ cursor: 'pointer', maxWidth: '100%' }} />

      <CardContent>
        {/* แสดงชื่อสินค้า */}
        <Typography variant='body1' component='div' fontWeight='bold' style={{ cursor: 'pointer' }}>
          {name}
        </Typography>
      </CardContent>
      <br />
    </Card>
  )
}

export default ProductImageCard
