// ** React Imports
import { React, useEffect, useState } from 'react'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'

const SlideRecommended = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* เพิ่มสไลด์ของคุณที่นี่ */}
      <Slide autoplay={false}>
        <Grid spacing={10} container direction='row' justifyContent='center' alignItems='center'>
          <Grid item>
            <Card>
              <ButtonBase sx={{ width: '200px', height: '280px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  {/* ใส่รูป */}
                  <Box sx={{ width: '100%', padding: '10px' }}>
                    <CardMedia
                      component='img'
                      image='/images/cards/TEST.jpg'
                      height='200px'
                      sx={{ bgcolor: '#333', borderRadius: '6px' }}
                    />
                  </Box>
                  {/* ใส่ชื่อ */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Product Name
                    </Typography>
                  </Box>
                  {/* ใส่ราคา */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      $ 10,000
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Card>
          </Grid>

          {/* ================================= ลบตั้งแต่ตรงนี้ ======================================== */}
          <Grid item>
            <Card>
              <ButtonBase sx={{ width: '200px', height: '280px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  {/* ใส่รูป */}
                  <Box sx={{ width: '100%', padding: '10px' }}>
                    <CardMedia
                      component='img'
                      image='/images/cards/TEST.jpg'
                      height='200px'
                      sx={{ bgcolor: '#333', borderRadius: '6px' }}
                    />
                  </Box>
                  {/* ใส่ชื่อ */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Product Name
                    </Typography>
                  </Box>
                  {/* ใส่ราคา */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      $ 10,000
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <ButtonBase sx={{ width: '200px', height: '280px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  {/* ใส่รูป */}
                  <Box sx={{ width: '100%', padding: '10px' }}>
                    <CardMedia
                      component='img'
                      image='/images/cards/TEST.jpg'
                      height='200px'
                      sx={{ bgcolor: '#333', borderRadius: '6px' }}
                    />
                  </Box>
                  {/* ใส่ชื่อ */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Product Name
                    </Typography>
                  </Box>
                  {/* ใส่ราคา */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      $ 10,000
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <ButtonBase sx={{ width: '200px', height: '280px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  {/* ใส่รูป */}
                  <Box sx={{ width: '100%', padding: '10px' }}>
                    <CardMedia
                      component='img'
                      image='/images/cards/TEST.jpg'
                      height='200px'
                      sx={{ bgcolor: '#333', borderRadius: '6px' }}
                    />
                  </Box>
                  {/* ใส่ชื่อ */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Product Name
                    </Typography>
                  </Box>
                  {/* ใส่ราคา */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      $ 10,000
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <ButtonBase sx={{ width: '200px', height: '280px' }}>
                <Box sx={{ width: '100%', height: '100%' }}>
                  {/* ใส่รูป */}
                  <Box sx={{ width: '100%', padding: '10px' }}>
                    <CardMedia
                      component='img'
                      image='/images/cards/TEST.jpg'
                      height='200px'
                      sx={{ bgcolor: '#333', borderRadius: '6px' }}
                    />
                  </Box>
                  {/* ใส่ชื่อ */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Product Name
                    </Typography>
                  </Box>
                  {/* ใส่ราคา */}
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 500,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      $ 10,000
                    </Typography>
                  </Box>
                </Box>
              </ButtonBase>
            </Card>
          </Grid>
          {/* ================================= ลบจนถึงตรงนี้ ======================================== */}
        </Grid>
        {/* เพิ่มสไลด์เพิ่มเติมตามต้องการ */}
      </Slide>
    </Box>
  )
}

export default SlideRecommended
