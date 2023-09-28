// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, ButtonBase, Card, Container, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Axios Import
import axios from 'axios'

// React Multi Carousel
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// ** Styles Imports
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15
    },
    '& .MuiImageMarked-root': {
      opacity: 0
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor'
    }
  }
}))

const Images = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white
}))

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}))

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}))

const NameMarket = () => {
  // set data and state
  const [slidedata, setSlideData] = useState([])

  console.log('slidedata', slidedata)

  // ** Router ของ Next.js
  const router = useRouter()

  // React Multi Carousel Responsive
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 6
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 3
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.home_page.market_recommend`)
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
      <Box sx={{ width: '100%', marginTop: { sm: '0px', md: '30px' }, paddingX: '10px' }}>
        {slidedata && slidedata.length > 0 ? (
          <Carousel arrows={false} responsive={responsive}>
            {slidedata.map((product, index) => (
              <Card key={index} sx={{ width: '170px', height: '200px', borderRadius: '6px' }}>
                <ImageButton focusRipple>
                  <CardMedia
                    component='img'
                    image={`/imgStore/${product.sub_image}`}
                    alt='NameMarket'
                    sx={{
                      width: '170px',
                      height: 'auto',
                      borderRadius: '6px',
                      objectFit: 'cover'
                    }}
                  />
                  <ImageBackdrop className='MuiImageBackdrop-root' />
                  <Images>
                    <Typography
                      component='span'
                      variant='subtitle1'
                      color='inherit'
                      sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: theme => `calc(${theme.spacing(1)} + 6px)`
                      }}
                      onClick={() => {
                        router.push(`/category_market/?sub_pay_name=${product.sub_pay_name}`)
                      }}
                    >
                      {product.sub_name}
                      <ImageMarked className='MuiImageMarked-root' />
                    </Typography>
                  </Images>
                </ImageButton>
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
