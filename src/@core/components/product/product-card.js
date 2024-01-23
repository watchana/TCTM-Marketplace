// components/Card.js
import React from 'react'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const ProductCard = ({ name, description, price, image }) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/product/${name}`)
  }

  return (
    <Card>
      <CardMedia
        component='img'
        height='200'
        image={image}
        alt={name}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      />
      <CardContent>
        <Typography variant='h6' component='div' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='body1' color='text.primary' fontWeight='bold'>
          Price: {price} THB
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCard
