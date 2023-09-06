// ** React Imports
import { React, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// ** Import components
import { useRouter } from 'next/router'
import { withAuth } from '../@core/utils/AuthCheck'

// ** custom components
import SlideshowWithCards from 'src/views/homepage/SlideBillboard'
import SlideshowWithProduct from 'src/views/homepage/SlideProduct'
import SlideRecommended from 'src/views/homepage/SlideRecommended'

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
          <Typography variant='h6' fontSize='bold'>
            Recommended Shops
          </Typography>
          {/** ใส่ Link Product */}
          <Link href='#'>
            <Typography variant='body1' fontSize='bold'>
              SHOW ALL
            </Typography>
          </Link>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/** ส่วนของ Slide Products! */}
          <SlideshowWithProduct />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 5 }}>
          <Typography variant='h6' fontSize='bold'>
            Recommended Products
          </Typography>
          {/** ใส่ Link Product */}
          <Link href='/category'>
            <Typography variant='body1' fontSize='bold'>
              SHOW ALL
            </Typography>
          </Link>
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
