import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { withAuth } from './pages/AuthCheck'

const Dashboard = () => {
  const router = useRouter()

  return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
        <Card sx={{ width: '100%', height: '300px', bgcolor: '#999', paddingTop: 20 }}>
          <Typography variant='h1' textAlign='center'>
            Billboard
          </Typography>
        </Card>
        <Box sx={{ width: '100%', marginY: 5 }}>
          <Typography variant='h4'>Products!</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid spacing={5} container direction='row' justifyContent='center' alignItems='center'>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                  <Typography variant='h5'>Product</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
