import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'

const Total = ({ megaProductdata }) => {
  return (
    <Card>
      <CardContent>
        <div
          style={{
            marginTop: '10px',
            marginLeft: '15px',
            display: 'flex',
            alignItems: 'column'
          }}
        >
          <Typography variant='subtitle1' gutterBottom>
            Product Name : {megaProductdata.product_name || ''}
          </Typography>
        </div>
        <div style={{ marginLeft: '15px', display: 'flex', alignItems: 'baseline' }}>
          <Typography variant='body1' style={{ color: 'gray' }} paragraph>
            Count : {megaProductdata.product_amount || ''}
          </Typography>
        </div>
      </CardContent>

      {/* ส่วนของ Total */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Box style={{ marginLeft: '36px' }}> Total: {megaProductdata.price_total || ''} </Box>
      </div>
      <br />
      <hr />
      <br />
    </Card>
  )
}

export default Total
