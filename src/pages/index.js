// ** React Imports
import { React, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// ** Import components
import { useRouter } from 'next/router'
import { withAuth } from './pages/AuthCheck'
import SlideshowWithCards from './Fuse/slide/slidebillboard'
import SlideshowWithProduct from './Fuse/slide/slideproduct'
import SlideRecommended from './Fuse/slide/slideRecommended'

// ** Import Cookies
import Cookies from 'js-cookie'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
        {/** ส่วนของ Billboard */}
        <SlideshowWithCards />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 5 }}>
          <Typography variant='h4' fontSize='bold'>
            Products Brands
          </Typography>
          {/** ใส่ Link Product */}
          <Link href='#'>SHOW ALL BRANDS</Link>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/** ส่วนของ Slide Products! */}
          <SlideshowWithProduct />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 5 }}>
          <Typography variant='h4' fontSize='bold'>
            Recommended
          </Typography>
          {/** ใส่ Link Product */}
          <Link href='/pages/category'>SHOW ALL PRODUCTS</Link>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/** ส่วนของ Slide Recommended! */}
          <SlideRecommended />
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
