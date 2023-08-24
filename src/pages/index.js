import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
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
        <Card sx={{ width: '100%', height: '300px', bgcolor: '#999' }}>
          {/* ใส่ Link ตรงนี้ */}
          <ButtonBase sx={{ width: '100%', height: '100%' }}>
            <Typography variant='h1' textAlign='center'>
              Billboard
            </Typography>
          </ButtonBase>
        </Card>
        <Box sx={{ width: '100%', marginY: 5 }}>
          <Typography variant='h4'>Products!</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid spacing={5} container direction='row' justifyContent='center' alignItems='center'>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                <Link passHref href='./designs/category'>
                  <ButtonBase sx={{ width: '100%', height: '100%' }}>
                    <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                      <Typography variant='h5'>Category</Typography>
                    </CardContent>
                  </ButtonBase>
                </Link>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                {/* ใส่ Link ตรงนี้ */}
                <ButtonBase sx={{ width: '100%', height: '100%' }}>
                  <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                    <Typography variant='h5'>Product</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                {/* ใส่ Link ตรงนี้ */}
                <ButtonBase sx={{ width: '100%', height: '100%' }}>
                  <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                    <Typography variant='h5'>Product</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ width: '244px', height: '160px', bgcolor: '#999' }}>
                {/* ใส่ Link ตรงนี้ */}
                <ButtonBase sx={{ width: '100%', height: '100%' }}>
                  <CardContent sx={{ width: '100%', height: '100%', padding: 17 }}>
                    <Typography variant='h5'>Product</Typography>
                  </CardContent>
                </ButtonBase>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Dashboard)
