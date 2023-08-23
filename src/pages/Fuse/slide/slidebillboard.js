import React from 'react'
import { Box, Grid, Card, ButtonBase, CardContent, Typography } from '@mui/material'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

const SlideshowWithCards = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide>
        <div>
          <Card sx={{ width: '100%', height: '300px', bgcolor: '#999' }}>
            {/* ใส่ Link ตรงนี้ */}
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Typography variant='h1' textAlign='center'>
                Billboard1
              </Typography>
            </ButtonBase>
          </Card>
        </div>
        <div>
          <Card sx={{ width: '100%', height: '300px', bgcolor: '#999' }}>
            {/* ใส่ Link ตรงนี้ */}
            <ButtonBase sx={{ width: '100%', height: '100%' }}>
              <Typography variant='h1' textAlign='center'>
                Billboard2
              </Typography>
            </ButtonBase>
          </Card>
        </div>
        {/* เพิ่มสไลด์เพิ่มเติมตามต้องการ */}
      </Slide>
    </Box>
  )
}

export default SlideshowWithCards
