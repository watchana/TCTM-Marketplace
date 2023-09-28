import React, { useState, useRef } from 'react'
import { Container, Grid, Divider, Typography, Card, CardContent, Button, Box } from '@mui/material'

const Total = ({ megaProductData }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant='body1'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              whiteSpace: 'normal'
            }}
          >
            Product: {megaProductData.product_name || ''}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography variant='body1'>Count : {megaProductData.product_amount || ''}</Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' fontSize='21px' color='#000'>
            Total:
          </Typography>
          <Typography variant='h6' fontSize='21px' color='#000'>
            $ {megaProductData.price_total || ''}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Total
