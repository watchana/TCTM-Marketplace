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
  position: 'relative',

  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  [theme.breakpoints.down('xs')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  [theme.breakpoints.down('md')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  [theme.breakpoints.down('lg')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  [theme.breakpoints.down('xl')]: {
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
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}))

const NameMarket = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  console.log('setSlideData', slidedata)

  // ** Router ของ Next.js
  const router = useRouter()

  // React Multi Carousel Responsive
  const responsive = {
    desktopLarge: { breakpoint: { max: 3000, min: 2400 }, items: 5, partialVisibilityGutter: 40 },
    desktop: { breakpoint: { max: 2400, min: 1024 }, items: 5, partialVisibilityGutter: 30 },
    tablet: { breakpoint: { max: 1024, min: 900 }, items: 4, partialVisibilityGutter: 20 }
  }

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.market_recommend`)
        console.log('Api', response)
        setSlideData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Container maxWidth='xl'>
      <Box>
        <Carousel
          arrows={false}
          responsive={responsive}
          sliderItem={slidedata.length > 1 ? slidedata.length : undefined}
        >
          {slidedata.map((product, index) => (
            <Card key={index} sx={{ width: '170px', height: '100px' }}>
              <Button
                onClick={() => {
                  router.push(`/category_market/?sub_id=${product.sub_id}&sub_name=${product.sub_name}`)
                }}
                sx={{ width: '100%', height: '100%', padding: 0, borderRadius: '6px' }}
              >
                <ImageButton focusRipple>
                  <CardMedia
                    component='img'
                    image={`/imgStore/${product.sub_image}`}
                    alt='NameMarket'
                    sx={{ height: '100%', borderRadius: '6px' }}
                  />
                  <ImageBackdrop className='MuiImageBackdrop-root' />
                </ImageButton>
              </Button>
            </Card>
          ))}
        </Carousel>
      </Box>

      {/* ---------- NameMarket ---------- */}
      <Box sx={{ width: '100%', marginTop: { sm: '0px', md: '30px' }, paddingX: '5px' }}>
        {slidedata && slidedata.length > 0 ? (
          <Carousel
            arrows={false}
            responsive={responsive}
            sliderItem={slidedata.length > 1 ? slidedata.length : undefined}
          >
            {slidedata.map((product, index) => (
              <Card key={index} sx={{ width: '170px', height: '100px' }}>
                <Button
                  onClick={() => {
                    router.push(`/category_market/?sub_id=${product.sub_id}&sub_name=${product.sub_name}`)
                  }}
                  sx={{ width: '100%', height: '100%', padding: 0, borderRadius: '6px' }}
                >
                  <ImageButton focusRipple>
                    <CardMedia
                      component='img'
                      image={`/imgStore/${product.sub_image}`}
                      alt='NameMarket'
                      sx={{ height: '100%', borderRadius: '6px' }}
                    />
                    <ImageBackdrop className='MuiImageBackdrop-root' />
                  </ImageButton>
                </Button>
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
