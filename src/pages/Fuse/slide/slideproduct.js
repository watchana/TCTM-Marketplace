import React from 'react'
import { Box, Grid, Card, ButtonBase, CardContent, Typography } from '@mui/material'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { CardActionArea } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'

const SlideshowWithProduct = ({ productData }) => {
  console.log(productData)

  return (
    <Box sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
      <Grid spacing={5} container direction='row'>
        {productData.map((product, index) => (
          <Grid item key={index}>
            <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <CardActionArea href={`/product/${product.product_id}`}>
                    <CardMedia
                      component='img'
                      style={{ margin: 'auto', display: 'block' }}
                      height='auto'
                      image={`imgTctmProduct/${product.image_file_name}`}
                      alt='Cabill Board'
                    />
                  </CardActionArea>
                  {/* <Typography variant='h5'>{product.product_name}</Typography> */}
                  {/* แสดงข้อมูลอื่น ๆ ของสินค้าที่คุณต้องการ */}
                  {/* <Typography variant='body1'>{product.product_description}</Typography>
                    <Typography variant='body2'>Price: {product.product_price}</Typography> */}
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SlideshowWithProduct
