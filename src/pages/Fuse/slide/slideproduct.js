import React from 'react'
import { Box, Grid, Card, ButtonBase, CardContent, Typography } from '@mui/material'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

const SlideshowWithProduct = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide>
        <Grid spacing={5} container direction='row' justifyContent='center' alignItems='center'>
          <Grid item>
            <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </ButtonBase>
            </Card>
          </Grid>
        </Grid>
        {/* เพิ่มสไลด์เพิ่มเติมตามต้องการ */}
      </Slide>
    </Box>
  )
}

export default SlideshowWithProduct
