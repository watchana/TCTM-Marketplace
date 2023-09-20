// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Breadcrumbs, Button, Card, Container, Chip, Divider, Grid, Hidden, Typography } from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios import
import axios from 'axios'
import Total from './details_total'
import Delivery from './delivery_address'
import Paymant from './payment_details'

const Orders_Detail = () => {
  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='21px bold' color='#fff'>
                  Orders Detail
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Market Management
                  </Typography>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    detail
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/** เลขออเดอร์ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              border: '2px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h5' fontSize='18px bold'>
                  Orders #425455245
                </Typography>
                <Typography variant='subtitle2' fontSize='14px' sx={{ p: '0px 4px 0px' }}>
                  Below are the details order
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container>
          <Grid item sm={12} md={5}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Total />
                </Box>
              </Grid>
              <Grid item sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Delivery />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} md={7} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '100%' }}>
              <Paymant />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Orders_Detail
