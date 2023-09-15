// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Summary = ({}) => {
  return (
    <Card sx={{ width: '100%', p: 2.5, marginTop: 1, marginLeft: -4  }}>
      <Grid container spacing={3} rowSpacing={4} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Items in the Cart</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>250</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Shipping</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>250</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle2'>Savings applied</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>-30</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle2'>Discount Code MOQUPS</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>-10</Typography>
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
          <Typography variant='h6'>210</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Summary
