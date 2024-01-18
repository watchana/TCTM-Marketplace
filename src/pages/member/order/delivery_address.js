// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Link, Radio, Stack, TextField, Typography } from '@mui/material'

const Delivery = ({ orderdata }) => {
  const addressdata = orderdata.orderdata // เก็บค่าข้อมูล

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '30px',
        padding: '15px 25px 20px',
        border: '2px solid #primary.main'
      }}
    >
      <Grid container spacing={3} rowSpacing={2} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={12}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Delivery Address
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Name </Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>
            {addressdata.user_first_name} {addressdata.user_last_name}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Phone Number</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>{addressdata.user_tel}</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3} rowSpacing={2} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={12}></Grid>
        <Grid item xs={6} sm={12}>
          <Typography variant='subtitle1'>Address</Typography>
        </Grid>
        <Grid item xs={6} sm={12}>
          <Typography variant='subtitle2'>{addressdata.user_address}</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3} rowSpacing={2} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={12}>
          <Typography variant='subtitle1'>Notes</Typography>
        </Grid>
        <Grid item xs={6} sm={12}>
          <Typography variant='subtitle2'>-</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3} rowSpacing={2} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={12}>
          <Typography variant='subtitle1'>Request of Shipping Quotation</Typography>
        </Grid>
        <Grid item xs={6} sm={12}>
          <Button>Shipping</Button>
        </Grid>
      </Grid>
      <hr />
    </Card>
  )
}

export default Delivery
