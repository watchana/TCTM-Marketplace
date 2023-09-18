// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Summary = ({ price, quantity, Shipping_cost, tax, discount }) => {
  // ตัวแปรคำนวณค่าก่อนแสดง
  const RealPrice = price * quantity // ราคาสินค้า
  const Realtex = parseFloat((tax * RealPrice).toFixed(2))
  const total = RealPrice + Shipping_cost + Realtex - discount

  // console.log('Real Price', RealPrice)

  return (
    <Card sx={{ width: '100%', p: 2.5, marginTop: 1, marginLeft: -4 }}>
      <Grid container spacing={3} rowSpacing={4} sx={{ pt: { md: 3 } }}>
        {/* <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Items in the Cart</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>250</Typography>
        </Grid> */}
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Shipping</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>{price}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>quantity</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>x{quantity}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle2'>Shipping cost</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>{Shipping_cost}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle2'>tax</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>{Realtex}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle2'>Discount Code MOQUPS</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>-{discount}</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container sx={{ marginTop: 3 }}>
        <Grid item xs={6} sm={6}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Total
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='h6'>{total}</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Summary
