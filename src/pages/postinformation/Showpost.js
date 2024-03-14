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
import { useMediaQuery } from '@mui/material'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

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

const ShowPost = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  // React Multi Carousel Responsive
  const responsive = {
    desktopLarge: { breakpoint: { max: 3000, min: 2300 }, items: 10, partialVisibilityGutter: 10 },
    desktop: { breakpoint: { max: 2300, min: 1400 }, items: 3, partialVisibilityGutter: 10 },
    tablet: { breakpoint: { max: 1400, min: 1300 }, items: 3, partialVisibilityGutter: 10 },
    mobile: { breakpoint: { max: 1300, min: 1000 }, items: 2, partialVisibilityGutter: 10 },
    smallMobile1: { breakpoint: { max: 1000, min: 500 }, items: 1, partialVisibilityGutter: 10 },
    smallMobile2: { breakpoint: { max: 500, min: 50 }, items: 1, partialVisibilityGutter: 10 }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.infromation.getallinfV5`)
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
            Information
          </Typography>
        </Box>
      </Box>
      {/* ---------- Show Product ---------- */}

      <Grid container sx={{ width: '100%', marginTop: '30px' }}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', marginTop: '30px' }}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {/* ========================== Map ========================== */}
                  {slidedata && slidedata.length > 0 ? (
                    slidedata.slice(0, 8).map((post, index) => (
                      <Card
                        key={index}
                        variant='outlined'
                        className='cardFadeIn' // เพิ่ม className นี้
                        sx={{
                          border: '0.5px solid lightgray',
                          width: { xs: '325px', sm: '300px' },
                          height: { xs: '380px', sm: '320px' },
                          boxShadow: 3,
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 10, border: '2px solid #2d2e81' },
                          margin: '10px'
                        }}
                        onClick={() => {
                          window.location.href = `/information-detail/?post_id=${post.post_id}`
                        }}
                      >
                        <CardMedia
                          component='img'
                          height='70%'
                          image={`/imageInfor/${post.image_file_infname}`}
                          alt='Post Image'
                          sx={{ objectFit: 'contain' }}
                        />
                        <Box sx={{ padding: 2, height: '30%' }}>
                          <Typography
                            variant='h5'
                            fontSize='18px'
                            sx={{
                              fontWeight: 'bold',
                              overflow: 'hidden',
                              whiteSpace: 'pre-wrap', // เพิ่ม pre-wrap เพื่อให้เว้นบรรทัด
                              wordWrap: 'break-word', // ให้ข้อความขยายตัวเมื่อหลุดขอบ
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2
                            }}
                          >
                            {post.post_name}
                          </Typography>

                          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                            <Typography
                              variant='body1'
                              fontSize='14px'
                              sx={{
                                color: '#c0c0c0',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                ml: 5
                              }}
                            >
                              {post.sub_name}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    ))
                  ) : (
                    <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                      No data
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 30, textAlign: 'center' }}>
        <Link href='/postinformation/Allpost' passHref>
          <Button variant='contained' color='primary'>
            Learn More . . .
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default ShowPost
