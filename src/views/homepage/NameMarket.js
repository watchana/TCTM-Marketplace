// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, ButtonBase, Card, Container, CardMedia, Typography, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Axios Import
import axios from 'axios'

// React Multi Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// ** Styles Imports
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: '100% !important',
    height: 75
  },
  position: 'relative',
  [theme.breakpoints.up('sm')]: {
    width: '100% !important',
    height: 100
  },
  [theme.breakpoints.up('lg')]: {
    width: '100% !important',
    height: 100
  },

  [theme.breakpoints.up('xl')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },

  '&:hover, &.Mui-focusVisible': {
    '& img': {
      transform: 'scale(1.1)' // ปรับตัวเลขตรงนี้เพื่อควบคุมการขยาย
    }
  }
}))

// พิ้นหลัง สีเทา
const ImageBackdrop = styled('span')(({ theme }) => ({}))

const NameMarket = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  // ** Router ของ Next.js
  const router = useRouter()

  // React Multi Carousel Responsive
  const responsive = {
    desktopLarge: { breakpoint: { max: 3000, min: 2300 }, items: 6, partialVisibilityGutter: 10 },
    desktop: { breakpoint: { max: 2300, min: 1250 }, items: 5, partialVisibilityGutter: 10 },
    tablet: { breakpoint: { max: 1250, min: 800 }, items: 4, partialVisibilityGutter: 10 },
    mobile: { breakpoint: { max: 800, min: 0 }, items: 3, partialVisibilityGutter: 10 }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.home_page.market_recommend`)

        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth='xl'>
      {/* ---------- NameMarket ---------- */}
      <Box sx={{ width: '100%' }}>
        {slidedata && slidedata.length > 0 ? (
          <Carousel
            arrows={false}
            responsive={responsive}
            sliderItem={slidedata.length > 1 ? slidedata.length : undefined}
          >
            {slidedata.map((product, index) => (
              <Card
                key={index}
                sx={{
                  margin: '0 2px', // Add margin for spacing
                  maxWidth: '500px',
                  maxHeight: '65px'
                }}
              >
                <Link href={`/category_market/?sub_id=${product.sub_id}&sub_name=${product.sub_name}`} passHref>
                  <ButtonBase
                    spacing={4}
                    component='a'
                    sx={{ width: '100%', height: '120px', padding: 0, borderRadius: '6px' }}
                  >
                    <ImageButton
                      focusRipple
                      style={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'flex-start' // Align at the top vertically
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={`/imgStore/${product.sub_image}`}
                        alt='NameMarket'
                        style={{ objectFit: 'contain', maxWidth: '70%', maxHeight: '70%' }}
                        loading='lazy' // Add this line for lazy loading

                      />
                      <ImageBackdrop className='MuiImageBackdrop-root' />
                    </ImageButton>
                  </ButtonBase>
                </Link>
              </Card>
            ))}
          </Carousel>
        ) : (
          <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
            No data
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default NameMarket
