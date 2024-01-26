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

// ** Switch Alert Import
const SAlert = require('sweetalert2')

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

  // const handleLearnMoreClick = () => {
  //   SAlert.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       // ทำงานหลังจากกดปุ่ม "Yes, delete it!"
  //       SAlert.fire({
  //         title: 'Deleted!',
  //         text: 'Your file has been deleted.',
  //         icon: 'success'
  //       })

  //       // รีเฟรชหน้าเว็บ
  //       window.location.reload()
  //     }
  //   })
  // }

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
            justifyContent: 'flex-end',
            height: '70px',
            borderRadius: '6px',
            backgroundColor: '#3A46A7'
          }}
        >
          <DividerBox1 />
          <DividerBox2 />

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
            Information
          </Typography>
        </Box>
      </Box>
      {/* ---------- Show Product ---------- */}

      <Grid container sx={{ width: '100%', marginTop: '30px' }}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: '380px', borderRadius: '6px' }}>
            {slidedata && slidedata.length > 0 ? (
              <Carousel responsive={responsive} infinite={false}>
                {/* ========================== Map ========================== */}
                {slidedata.slice(0, 3).map((post, index) => (
                  <Card
                    key={index}
                    variant='outlined'
                    sx={{
                      border: '0.5px solid lightgray',
                      width: { xs: '310px', sm: '400px' },
                      height: { xs: '350px', sm: '450px' },
                      boxShadow: 3,
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 10, border: '2px solid #2d2e81' },

                      display: 'flex', // Added flex display
                      flexDirection: 'column' // Stack children vertically
                    }}
                    onClick={() => {
                      window.location.href = `market/information-detail/?post_id=${post.post_id}`
                    }}
                  >
                    <CardMedia
                      href={`/`}
                      component='img'
                      height='70%'
                      image={`/imageInfor/${post.image_file_infname}`}
                      alt='Product Image'
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
                      {/* <Typography

                          variant='h5'
                          fontSize='16px'
                          sx={{ color: '#BD1620', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                          สวัสดีจ้า
                        </Typography> */}

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
                          {post.sub_name}
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
