import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'

const Total = () => {
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
            Items in the Cart
          </Typography>
        </div>
        <div style={{ marginLeft: '15px', display: 'flex', alignItems: 'baseline' }}>
          <Typography variant='body1' style={{ color: 'gray' }} paragraph>
            Discount
          </Typography>
        </div>
      </CardContent>

      {/* ส่วนของ Total */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <Box style={{ marginLeft: '36px' }}> Total:</Box>
      </div>
      <br />
      <hr />
      <br />
    </Card>
  )
}

export default Total
