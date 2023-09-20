// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Total = () => {
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
            Product Details
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Product Name</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>VALVE STEAM DECK</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Option</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>256 GB</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Amount</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>x 1</Typography>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={3} rowSpacing={2} sx={{ pt: { md: 3 } }}>
        <Grid item xs={6} sm={12}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Total summary
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Total</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>$ 737.81</Typography>
        </Grid>
      </Grid>
      <hr />
    </Card>
  )
}
export default Total
