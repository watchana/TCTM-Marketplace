// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Material UI Imports
import { Box, Card, Container, CardMedia, Grid, Hidden, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Axios Import
import axios from 'axios'

// ** React-Multi Carousel 👋
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { useMediaQuery } from '@mui/material'

// ** Styles Components
const DividerBox1 = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '120px',
  marginRight: '20px',
  marginTop: '-24px',
  backgroundColor: '#F7F7F7',
  transform: 'rotate(40deg)',
  zIndex: '1'
}))

const DividerBox2 = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '120px',
  marginRight: '30px',
  marginTop: '-24px',
  backgroundColor: '#F7F7F7',
  transform: 'rotate(40deg)',
  zIndex: '1'
}))

const ShowProducts2 = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  // React Multi Carousel Responsive
  const responsive = {
    desktopLarge: { breakpoint: { max: 3000, min: 2300 }, items: 5 },
    desktop: { breakpoint: { max: 2300, min: 1400 }, items: 5 },
    tablet: { breakpoint: { max: 1400, min: 1100 }, items: 4 },
    mobile: { breakpoint: { max: 1100, min: 900 }, items: 3 },
    smallMobile1: { breakpoint: { max: 900, min: 750 }, items: 5 },
    smallMobile2: { breakpoint: { max: 750, min: 450 }, items: 4 },
    smallMobile3: { breakpoint: { max: 450, min: 50 }, items: 3 }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.home_page.product_recommend`)
        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box sx={{ width: '100%', marginTop: '30px', boxShadow: 3 }}>
        <Box
          sx={{
            height: isSmallScreen ? '50px' : '60px',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#3A46A7',
            borderRadius: '6px',
            border: '1px solid #primary.main'
          }}
        >
          <DividerBox1 />
          <DividerBox2 />
          <Link href='/category' passHref>
            <Typography
              variant='h5'
              fontSize='32px'
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.3rem' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '12px',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              Recommended
            </Typography>
          </Link>
        </Box>
      </Box>
      {/* ---------- Show Product ---------- */}
      <Box sx={{ width: '100%', marginTop: '30px' }}>
        <Grid
          container
          spacing={4}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'nowrap' }}
        >
          <Grid item xs={12} md={10}>
            <Box sx={{ borderRadius: '6px' }}>
              {slidedata && slidedata.length > 0 ? (
                <Carousel responsive={responsive} infinite={false}>
                  {slidedata.map((product, index) => (
                    <Card
                      title={product.product_name}
                      key={index}
                      variant='outlined'
                      onClick={() => {
                        window.location.href = `product/?product_id=${product.product_id}`
                      }}
                      sx={{
                        border: '0.5px solid lightgray',
                        width: { xs: '98px', sm: '140px', md: '200px' },
                        height: { xs: '165px', sm: '185px', md: '285px' },
                        maxHeight: '285.5px',
                        boxShadow: 3,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        '&:hover': { boxShadow: 10, border: '2px solid #2d2e81' }
                      }}
                    >
                      <CardMedia
                        component='img'
                        height={{ xs: '50%', md: '50%' }}
                        image={`/imgDigitalProduct/${product.image_file_name}`}
                        alt={product.image_file_name}
                        sx={{
                          objectFit: 'contain',
                          padding: '8px' // Adjust the padding as needed
                        }}
                        loading='lazy' // Add this line for lazy loading

                      />
                      <Box sx={{ padding: 1, height: { xs: '80px', md: '120px' } }}>
                        <Typography
                          variant='h5'
                          fontSize={{ xs: '14px', md: '16px' }}
                          sx={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            marginBottom: '4px'
                          }}
                        >
                          {product.product_name}
                        </Typography>
                        <Typography
                          variant='h5'
                          fontSize={{ xs: '12px', md: '14px' }}
                          sx={{
                            color: '#BD1620',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          $
                          {product.min_price === product.max_price
                            ? `${product.min_price}`
                            : `${product.min_price} - ${product.max_price}`}
                        </Typography>
                        <Typography
                          variant='body1'
                          fontSize={{ xs: '10px', md: '12px' }}
                          sx={{
                            color: '#c0c0c0',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.sub_name}
                        </Typography>
                      </Box>
                    </Card>
                  ))}
                </Carousel>
              ) : (
                <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                  No data
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item>
            <Hidden mdDown>
              <Box
                sx={{
                  position: 'relative',
                  width: '205.5px',
                  height: '280px',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/imgBillboard/Nodata2.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  <Typography variant='h5' fontSize='32px'>
                    Best selling products
                  </Typography>
                </Box>
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ShowProducts2
