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

// const images = [
//   'https://imagen.research.google/main_gallery_images/cactus.jpg',
//   'https://imagen.research.google/main_gallery_images/an-alien-octopus-floats.jpg',
//   'https://imagen.research.google/main_gallery_images/android-mascot-made-from-bamboo.jpg',
//   'https://imagen.research.google/main_gallery_images/a-robot-couple-fine-dining.jpg',
//   'https://imagen.research.google/main_gallery_images/teddy-bear-swimming-butterfly.jpg',
//   'https://imagen.research.google/main_gallery_images/a-brain-riding-a-rocketship.jpg',
//   'https://imagen.research.google/main_gallery_images/a-dog-looking-curiously.jpg',
//   'https://imagen.research.google/main_gallery_images/the-toronto-skyline-with-google-brain-logo.jpg',
//   'https://gweb-research-imagen.web.app/compositional/A%20photo%20of%20a%20fuzzy%20panda%20wearing%20a%20sunglasses%20and%20black%20leather%20jacket%20skateboarding%20on%20a%20beach./0_.jpeg'
// ]

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
    desktopLarge: { breakpoint: { max: 3000, min: 2300 }, items: 10, partialVisibilityGutter: 10 },
    desktop: { breakpoint: { max: 2300, min: 1400 }, items: 5, partialVisibilityGutter: 10 },
    tablet: { breakpoint: { max: 1400, min: 1100 }, items: 4, partialVisibilityGutter: 10 },
    mobile: { breakpoint: { max: 1100, min: 600 }, items: 3, partialVisibilityGutter: 10 },
    smallMobile1: { breakpoint: { max: 600, min: 500 }, items: 3, partialVisibilityGutter: 10 },
    smallMobile2: { breakpoint: { max: 500, min: 50 }, items: 2, partialVisibilityGutter: 10 }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.product_recommend`)
        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth='xl'>
      <Box sx={{ width: '100%', marginTop: '30px', boxShadow: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            height: '70px',
            borderRadius: '6px',
            backgroundColor: '#3A46A7'
          }}
        >
          <DividerBox1 />
          <DividerBox2 />
          <Link href='/category' passHref>
            <Typography
              variant='h5'
              fontSize='32px'
              sx={{
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
            <Box sx={{ width: '100%', height: '270px', borderRadius: '6px' }}>
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
                        width: { xs: '160px', md: '200px' },
                        height: { xs: '250px', md: '285px' },
                        maxHeight: '285.5px',
                        boxShadow: 3,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        '&:hover': { boxShadow: 10, border: '2px solid #2d2e81' }
                      }}
                    >
                      <CardMedia
                        component='img'
                        height='75%'
                        image={`/imgTctmProduct/${product.image_file_name}`}
                        alt='product image'
                        sx={{
                          objectFit: 'contain',
                          padding: '8px' // Adjust the padding as needed
                        }}
                      />
                      <Box sx={{ padding: 1, height: '30%', overflow: 'hidden' }}>
                        <Typography
                          variant='h5'
                          fontSize='16px' // Adjusted font size for better responsiveness
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
                          fontSize='14px' // Adjusted font size for better responsiveness
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
                          fontSize='12px' // Adjusted font size for better responsiveness
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
