// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** Material-UI Icons Imports
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** MDI Icon Imports
import CircleSmall from 'mdi-material-ui/CircleSmall'

const PosrtDetail = () => {
  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              width: '100%',
              height: '100px',
              mb: '20px',
              p: '20px 25px 20px',
              bgcolor: '#FDEDE8',
              border: '1px solid #FDEDE8'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='1.3rem bold' color='#FA896B'>
                  Blog Detail
                </Typography>
                <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                  <Link underline='none' color='inherit' href='/'>
                    <Typography variant='body2'>Home</Typography>
                  </Link>
                  <Link underline='none' color='inherit' href='/member/ports/'>
                    <Typography variant='body2'>Posts</Typography>
                  </Link>
                  <Link underline='none' color='inherit'>
                    <Typography variant='body2'>Blog posts</Typography>
                  </Link>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}

export default PosrtDetail
