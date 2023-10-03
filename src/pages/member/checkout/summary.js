// ** React Imports
import React from 'react'

// ** Material UI Imports
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

const Summary = ({ price, quantity, Shipping_cost, discount, total, Realtex }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h6' sx={{ color: '#000' }}>
            Summary
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <Typography variant='subtitle1' fontSize='16px'>
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {price}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='subtitle1' fontSize='16px'>
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              x{quantity}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='subtitle1' fontSize='16px'>
              Shipping cost
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {Shipping_cost}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='subtitle1' fontSize='16px'>
              tax
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {Realtex}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='subtitle1' fontSize='16px'>
              Discount Code MOQUPS
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              -{discount}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Total
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography
              variant='subtitle1'
              fontSize='16px'
              textAlign='end'
              color='success.main'
              sx={{ fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {total}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Summary
