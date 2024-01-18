// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** Material UI Imports
import { Box, Card, Container, CardMedia, Grid, Hidden, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Axios Import
import axios from 'axios'

// ** React-Multi Carousel 👋
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Paper from 'src/@core/theme/overrides/paper'

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

const AllPost = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  // React Multi Carousel Responsive
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinfV5`)
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
            justifyContent: 'center',
            height: '70px',
            borderRadius: '6px',
            backgroundColor: '#3A46A7'
          }}
        >
          <Typography
            variant='h5'
            fontSize='32px'
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              textAlign: 'center',
              padding: '12px'
            }}
          >
            Knowledge Of Product
          </Typography>
        </Box>
      </Box>

      {/* ---------- Show Product ---------- */}
      <Box sx={{ width: '100%', marginTop: '30px' }}>
        <Grid container>
          <Grid item xs={12} md={10} ml={30}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {/* ========================== Map ========================== */}
              {slidedata && slidedata.length > 0 ? (
                slidedata.map((post, index) => (
                  <Card
                    key={index}
                    variant='outlined'
                    className='cardFadeIn' // เพิ่ม className นี้
                    sx={{
                      border: '0.5px solid lightgray',
                      width: { xs: '325px', sm: '375px' },
                      height: { xs: '380px', sm: '460px' },
                      boxShadow: 3,
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 10, border: '2px solid #2d2e81' },
                      margin: '10px'
                    }}
                    onClick={() => {
                      window.location.href = `product/?product_id=${post.post_id}`
                    }}
                  >
                    <CardMedia
                      component='img'
                      height='70%'
                      image={`/post_image/${post.image_file_infname}`}
                      alt='Post Image'
                      sx={{ objectFit: 'contain' }}
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
                        {post.post_name}
                      </Typography>
                      <Typography
                        variant='h5'
                        fontSize='16px'
                        sx={{
                          color: '#BD1620',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        สวัสดีจ้า
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
                          ใครทำอะไรที่ไหน
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography
                  variant='h6'
                  sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center', width: '100%' }}
                >
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

export default AllPost
