import React from 'react'
import { Box, Card, CardContent, Typography, Link as MuiLink } from '@mui/material'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

const SlideshowWithCards = ({ productData }) => {
  const limitedProductData = productData.slice(0, 4)

  return (
    <Box sx={{ width: '100%' }}>
      <Slide autoplay={true} duration={1500} transitionDuration={500}>
        {limitedProductData.map((product, index) => (
          <Card sx={{ maxWidth: 450, display: 'flex', justifyContent: 'center' }} key={index}>
            <CardActionArea component={MuiLink} href={`/product/${product.product_id}`}>
              <CardMedia
                component='img'
                style={{ margin: 'auto', display: 'block' }}
                height='auto'
                image={`imgTctmProduct/${product.image_file_name}`}
                alt='Cabill Board'
              />
            </CardActionArea>
          </Card>
        ))}
      </Slide>
    </Box>
  )
}

export default SlideshowWithCards
