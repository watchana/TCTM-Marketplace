// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Total = ({ productoption, orderdata }) => {
  const [optiondata, setOptionData] = useState('') // Option Data

  // ฟังชันแปลงค่า option เป็น text
  const extractOptionData = useCallback(() => {
    if (Array.isArray(productoption)) {
      const extractedData = productoption.map(item => {
        if (item && item.option_name && item.value_name) {
          return `${item.option_name}: ${item.value_name}`
        } else {
          return ''
        }
      })
      const optionDataString = extractedData.join(', ')
      setOptionData(optionDataString)
    }
  }, [productoption])

  useEffect(() => {
    extractOptionData()
  }, [productoption, extractOptionData])

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
          <Typography variant='subtitle2'>{orderdata.product_name}</Typography>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Option</Typography>
        </Grid>
        {/* ข้อมูล option */}
        <Grid sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>{optiondata}</Typography>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Typography variant='subtitle1'>Amount</Typography>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Typography variant='subtitle2'>x {orderdata.amount}</Typography>
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
          <Typography variant='subtitle2'>$ {orderdata.price_total}</Typography>
        </Grid>
      </Grid>
      <hr />
    </Card>
  )
}

export default Total
