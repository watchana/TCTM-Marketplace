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

const SlideshowWithCards = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: 'cover',
            height: '300px'
          }}
        >
          <Card sx={{ width: '80%', height: '300px' }}>
            {/* ใส่ Link ตรงนี้ */}
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Typography variant='h1' textAlign='center'>
                Billboard1
              </Typography>
            </ButtonBase>
          </Card>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundSize: 'cover',
            height: '300px'
          }}
        >
          <Card sx={{ width: '80%', height: '300px' }}>
            {/* ใส่ Link ตรงนี้ */}
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Typography variant='h1' textAlign='center'>
                Billboard2
              </Typography>
            </ButtonBase>
          </Card>
        </Box>
        {/* เพิ่มสไลด์เพิ่มเติมตามต้องการ */}
      </Slide>
    </Box>
  )
}

export default SlideshowWithCards
