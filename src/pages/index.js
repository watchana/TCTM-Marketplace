import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { withAuth } from './pages/AuthCheck'
import SlideshowWithCards from './Fuse/slide/slidebillboard'
import SlideshowWithProduct from './Fuse/slide/slideproduct'
import { Button } from '@mui/material'
import Link from 'src/@core/theme/overrides/link'
import SlideshowWithCategory from './Fuse/slide/slidecategoer'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
        {/** ส่วนของ Billboard */}
        <SlideshowWithCards />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 5 }}>
          <Typography variant='h4'> Products! </Typography>
          {/** ใส่ Link Product */}
          <a href=''>View More</a> 
        </Box>
        <Box sx={{ width: '100%' }}>
          {/** ส่วนของ Slide Products! */}
          <SlideshowWithProduct />
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
