// ** React Imports
import { React, useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

const SlideshowWithProduct = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide autoplay={false}>
        <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
          <Grid item>
            <Card sx={{ width: '200px', height: '120px' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <Typography variant='h5'>Product</Typography>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '200px', height: '120px' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <Typography variant='h5'>Product</Typography>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '200px', height: '120px' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <Typography variant='h5'>Product</Typography>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '200px', height: '120px' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <Typography variant='h5'>Product</Typography>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ width: '200px', height: '120px' }}>
              {/* ใส่ Link ตรงนี้ */}
              <ButtonBase sx={{ width: '100%', height: '100%' }}>
                <Typography variant='h5'>Product</Typography>
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
