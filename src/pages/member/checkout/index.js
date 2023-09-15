// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deepOrange } from '@mui/material/colors'
import { useState } from 'react'
import Cardemail from './email'
import Shipping from './shipping'
import Deriverry from './deriverry'
import Paymant from './payment'
import Summary from './summary'

const Checkout = ({}) => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4' fontSize='1.3rem' fontWeight='bold' sx={{ textAlign: 'center', mb: 2 }}>
            Checkout
          </Typography>
          <Typography variant='caption' sx={{ textAlign: 'center', mb: 2 }}>
            Shipping charges and discount codes applied at checkout.
          </Typography>
        </Box>
        <Grid container spacing={1} justifyContent='space-between'>
          <Grid item xs={12} md={7.5}>
            {/** Avatar, Change */}
            <Grid container spacing={2} alignItems='center' sx={{ p: '10px 8px 2px' }}>
              <Grid item>
                <Avatar src='/broken-image.jpg' />
              </Grid>
              <Grid item>
                <Typography>John Doe</Typography>
              </Grid>
              <Grid item xs={6} md={9.4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant='subtitle1' style={{ marginRight: '5px' }}>
                  <EditIcon />
                </Typography>
                <Typography>Change address</Typography>
              </Grid>
              <Cardemail />
            </Grid>
            <Grid container spacing={2} alignItems='center' sx={{ p: '10px 10px 2px' }}>
              <Grid item>
                <Typography variant='h5' sx={{ p: '5px 5px 5px' }}>
                  Shipping Details
                </Typography>
              </Grid>
              <Shipping />
            </Grid>
            {/* <Grid container spacing={2} alignItems='center' sx={{ p: '10px 10px 2px' }}>
              <Grid item>
                <Typography variant='h5' sx={{ p: '5px 7px 5px' }}>
                  Payment
                </Typography>
              </Grid>
              <Paymant />
            </Grid> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid item>
              <Typography variant='h6' sx={{ p: '20px 0px 5px', width: '100%' }}>
                summary
              </Typography>
            </Grid>
            <Summary />
          </Grid>
          <Grid container spacing={2} alignItems='center' sx={{ width: '96%', p: 2.5, marginTop: 3, marginLeft: 1 }}>
            <Box sx={{ width: '62%', display: 'flex', justifyContent: 'center' }}>
              <Button href='/member/order/payment/' variant="contained" sx={{ bgcolor: 'red', width: '100%', p: '10px 10px 10px' }}>
                NEXT STEP
              </Button>
            </Box>
            <br />
            <Box sx={{ width: '62%', p: '10px 10px 10px', textAlign: 'center' }}>
              <Typography variant='subtitle2'>
                By clicking "Complete purchase", I confirm that I am aware and accept that I am obliged to pay for my
                order. I accept the Terms and Conditions and confirm that I have read the Privacy Policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Checkout
