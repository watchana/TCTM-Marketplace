// ** React Imports
import React, { useEffect, useRef, useState } from 'react'

// ** Material UI Imports
import {
  Box,
  Card,
  CardContent,
  Container,
  CardMedia,
  Divider,
  Grid,
  Hidden,
  Skeleton,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Material-UI Icons Imports
import PaymentIcon from '@mui/icons-material/Payment'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

// ** Material Design Icons Imports
import Truck from 'mdi-material-ui/Truck'
import ClockTimeFour from 'mdi-material-ui/ClockTimeFour'

// ** Axios Import
import axios from 'axios'

// React Multi Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Responsive image
import { useMediaQuery } from '@mui/material'

// ** Styled components
const BoxAdvert = styled(Box)(theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100px',
  cursor: 'grab',
  '&:hover': {
    transform: 'scale(1.1)',
    transition: 'all 0.3s ease'
  }
}))

const Billboard = () => {
  const [slidedata, setSlideData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dominantColors, setDominantColors] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.allbillboards`)
        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }

  // ตรวจสอบขนาดของหน้าจอ
  const isSmallScreen = useMediaQuery('(max-width: 600px)')

  return (
    <Container maxWidth='xl'>
      {/* ---------- Billboard ---------- */}
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={4}>
          {/* ---------- Main Billboard ---------- */}
          <Grid item xs={12} md={12} lg={9} mb={'6px'}>
            {isLoading ? ( // ตรวจสอบสถานะ isLoading เพื่อแสดงรูปโหลดหรือข้อความแสดงการโหลด
              <Skeleton variant='rectangular' />
            ) : (
              <Box align={'center'}>
                {slidedata && slidedata.length > 0 ? (
                  <Carousel arrows={false} autoPlaySpeed={3000} infinite showDots responsive={responsive}>
                    {slidedata
                      .map((item, index) => ({
                        index,
                        item
                      }))
                      .filter(({ item }) => item.bill_status === '1')
                      .map(({ index, item }) => (
                        <Card
                          key={index} // Use key={index} instead of key={index.id}
                          sx={{
                            width: 'auto',
                            height: 'auto'
                          }}
                        >
                          <Box
                            sx={{
                              width: 'auto',
                              height: { xs: '120px', sm: '250px', md: '350px', lg: '290px', xl: '350px' }
                            }}
                          >
                            <CardMedia
                              key={index} // Use key={index} instead of key={index.id}
                              component='img'
                              image={`imgBillboard/${item.bill_name}`}
                              alt={item.bill_name}
                              style={{ width: 'auto', height: '100%' }}
                              loading='lazy' // Add this line for lazy loading
                            />
                          </Box>
                        </Card>
                      ))}
                  </Carousel>
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '350px',
                      maxHeight: '350px',
                      borderRadius: '6px',
                      backgroundColor: '#3A46A7',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant='h6' color='#fff'>
                      No Image
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Grid>
          {/* ---------- Sub Billboard ---------- */}
          <Grid item xs={12} md={12} lg={3}>
            <Grid container spacing={2}>
              {/* ---------- Sub Billboard No 1 ---------- */}

              <Grid item xs={6} lg={12}>
                {slidedata && slidedata.length > 0 ? (
                  <Carousel responsive={responsive} infinite={false}>
                    {slidedata.length === '0' ? (
                      <Skeleton variant='rectangular' width='100%' height='150px' sx={{ borderRadius: '6px' }} />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: isSmallScreen ? '80px' : '180px', // Adjust the height based on screen size
                          maxHeight: { xs: 120, sm: 120, md: 180, lg: 170 },
                          borderRadius: '6px',
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          display: 'flex'
                        }}
                      >
                        {slidedata
                          .map((item, index) => ({
                            index,
                            item
                          }))

                          .filter(({ item }) => item.bill_status === '3')
                          .map(({ index, item }) => (
                            <Box
                              key={index}
                              sx={{
                                width: '100%',
                                height: 'auto', // Allow images to maintain aspect ratio
                                maxHeight: '180px', // Set a maximum height for the images
                                borderRadius: '6px'
                              }}
                            >
                              <CardMedia
                                component='img'
                                src={`/imgBillboard/${item.bill_name}`}
                                alt={`image`}
                                height='auto'
                                loading='lazy' // Add this line for lazy loading
                              />
                            </Box>
                          ))}
                      </Box>
                    )}
                  </Carousel>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3A46A7',
                      width: '100%',
                      height: '170px',
                      maxHeight: '170px',
                      borderRadius: '6px',
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      display: 'flex'
                    }}
                  >
                    <Typography variant='h6' color='#fff'>
                      No Image
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* ---------- Sub Billboard No 2 ---------- */}
              <Grid item xs={6} lg={12}>
                {slidedata && slidedata.length > 0 ? (
                  <Carousel responsive={responsive} infinite={false}>
                    {slidedata.length === '0' ? (
                      <Skeleton variant='rectangular' width='100%' height='170px' sx={{ borderRadius: '6px' }} />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: isSmallScreen ? '80px' : '170px', // Adjust the height based on screen size
                          maxHeight: { xs: 120, sm: 120, md: 180, lg: 170 },
                          borderRadius: '6px',
                          backgroundSize: '100% 100%',
                          backgroundPosition: 'center',
                          display: 'flex'
                        }}
                      >
                        {slidedata
                          .map((item, index) => ({
                            index,
                            item
                          }))

                          .filter(({ item }) => item.bill_status === '4')
                          .map(({ index, item }) => (
                            <Box
                              key={index}
                              sx={{
                                width: '100%',
                                height: 'auto', // Allow images to maintain aspect ratio
                                maxHeight: '180px', // Set a maximum height for the images
                                borderRadius: '6px'
                              }}
                            >
                              <CardMedia
                                component='img'
                                src={`/imgBillboard/${item.bill_name}`}
                                alt={`image`}
                                height='auto'
                                loading='lazy' // Add this line for lazy loading
                              />
                            </Box>
                          ))}
                      </Box>
                    )}
                  </Carousel>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#3A46A7',
                      width: '100%',
                      height: '170px',
                      maxHeight: '170px',
                      borderRadius: '6px',
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center',
                      display: 'flex'
                    }}
                  >
                    <Typography variant='h6' color='#fff'>
                      No Image
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ---------- Advert ---------- */}
      <Hidden mdDown>
        <Box mb={3} mt={5} sx={{ width: '100%', height: '100%' }}>
          <Card variant='outlined' sx={{ height: '100px' }}>
            <Grid container direction='row' justifyContent='space-around'>
              <Grid item>
                <BoxAdvert>
                  <Truck sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Fast Delivery
                    </Typography>
                    <Typography variant='body1'>Start from $ 10</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <MonetizationOnIcon sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Money Guarantee
                    </Typography>
                    <Typography variant='body1'>7 Days Back</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <ClockTimeFour sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      365 Days
                    </Typography>
                    <Typography variant='body1'>For free return</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
              <Divider orientation='vertical' flexItem sx={{ border: 1 }} />
              <Grid item>
                <BoxAdvert>
                  <PaymentIcon sx={{ fontSize: '50px', color: '#000', marginRight: 3 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h6' color='#000'>
                      Payment
                    </Typography>
                    <Typography variant='body1'>Secure system</Typography>
                  </Box>
                </BoxAdvert>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Hidden>
    </Container>
  )
}

export default Billboard
