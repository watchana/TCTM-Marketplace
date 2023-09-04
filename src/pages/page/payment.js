import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Container,
    Button,
    AccordionSummary,
    Accordion,
    AccordionDetails,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select
  } from '@mui/material'

const Payment = () => {

    return (
        <Container maxWidth='lg'>
          <Grid container spacing={4}>
            {/* ส่วนเมนูซื้อและราคา */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant='h5' gutterBottom>
                    {' '}
                    Saru KX-75 Wireless Mechanical Keyboard{' '}
                  </Typography>
                  <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                    {' '}
                    GASKET MOUNTED DESIGN{' '}
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  </div>
                </CardContent>
    
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{ minWidth: 300 }}>
                    <FormControl component='fieldset'>
                      <Typography variant='subtitle1' gutterBottom>
                        Select an option:
                      </Typography>
                    </FormControl>
                  </Box>
                </div>
                <br />
    
                {/* ส่วนของปุ่ม เพิ่ม ลด สินค้า */}
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Box style={{ marginLeft: '30px' }}> ต้องการ:</Box>
                </div>
                <br />
    
                {/* ส่วนของปุ่ม Add To cart และ ซื้อสินค้า */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button sx={{ width: 175, margin: 2 }} variant='contained' color='primary'>
                    ซื้อสินค้า
                  </Button>
                </div>
                <br />
              </Card>
            </Grid>
          </Grid>
          <br />
        </Container>
      )
}

export default Payment