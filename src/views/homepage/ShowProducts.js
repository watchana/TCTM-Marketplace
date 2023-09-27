// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Material UI Imports
import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardContent,
  Container,
  CardActionArea,
  CardMedia,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
  Typography
} from '@mui/material'
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

const ShowProducts = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  // React Multi Carousel Responsive
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 5
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.best_selling`)
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
              Category
            </Typography>
          </Link>
        </Box>
      </Box>
      {/* ---------- Show Product ---------- */}
      <Box sx={{ width: '100%', marginTop: '30px' }}>
        <Grid container spacing={4}>
          <Hidden mdDown>
            <Grid item md={2}>
              <Box
                sx={{
                  width: '220px',
                  height: '280px',
                  borderRadius: '6px',
                  backgroundImage: 'url(/imgBillboard/CaBill.png)',
                  backgroundSize: '220px 280px',
                  backgroundPosition: 'center',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* <Typography
                  variant='h5'
                  fontSize='32px'
                  sx={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}
                >
                  Best selling products
                </Typography> */}
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={10}>
            <Box sx={{ width: '100%', height: '280px', borderRadius: '6px' }}>
              {slidedata && slidedata.length > 0 ? (
                <Carousel responsive={responsive} infinite={false}>
                  {/* ========================== Map ========================== */}
                  {slidedata.map((product, index) => (
                    <Card key={index} variant='outlined' sx={{ width: '200px', height: '280px', boxShadow: 3 }}>
                      <CardMedia
                        component='img'
                        height='70%'
                        image={`/imgTctmProduct/${product.image_file_name}`}
                        alt='Product Image'
                      />
                      <Box sx={{ padding: 1, height: '30%' }}>
                        <Typography
                          variant='h5'
                          fontSize='18px'
                          sx={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {product.product_name}
                        </Typography>
                        <Typography variant='h5' fontSize='16px' sx={{ color: '#000' }}>
                          $ {product.min_price} - {product.max_price}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                          <Typography
                            variant='body1'
                            fontSize='14px'
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
        </Grid>
      </Box>
    </Container>
  )
}

export default ShowProducts
