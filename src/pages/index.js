import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { withAuth } from './pages/AuthCheck'
import SlideshowWithCards from './Fuse/slide/slidebillboard'
import SlideshowWithProduct from './Fuse/slide/slideproduct'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
        <SlideshowWithCards />
        <Box sx={{ width: '100%', marginY: 5 }}>
          <Typography variant='h4'> New Products! </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <SlideshowWithProduct />
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
