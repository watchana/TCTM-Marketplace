import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'
import Total from './total'
import Payment from './payment'
import Tablepayment from './tablepayment'

const indexpayment = () => {
  return (
    <Container>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        <Box sx={{ width: '40%', p: '20px' }}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} sx={{ p: '10px' }}>
              <Total />
            </Grid>
            <Grid item xs={12} md={12} sx={{ p: '10px' }}>
              <Payment />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', p: '18px 10px 10px' }}>
          <Tablepayment />
        </Box>
      </Box>
    </Container>
  )
}

export default indexpayment
