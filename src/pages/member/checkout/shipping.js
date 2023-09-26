// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Shipping = ({ productName, price, quantity, parsedSelection, FirstImage }) => {
  return (
    <Card sx={{ width: '95%', p: 3, marginTop: 1, marginLeft: 3 }}>
      <Grid container spacing={2} rowSpacing={5}>
        <Grid item xs={12} md={1.6}>
          <Box
            sx={{
              width: { xs: '100px', sm: '100%', md: '100%' },
              height: { xs: '100px', sm: '100%', md: '100%' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src={`/imgTctmProduct/${FirstImage}`}
              alt='Product'
              style={{
                maxWidth: '100px',
                maxHeight: '100px'
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={10.4}>
          <Grid container spacing={1} rowSpacing={3} sx={{ pt: { md: 1 }, marginLeft: 3 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='subtitle1'>Product Name: {productName} </Typography>
              <Button startIcon={<DeleteIcon />} sx={{ alignItems: 'center' }}>
                {' '}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Option: </Typography>
              {parsedSelection && parsedSelection.length > 0 ? (
                parsedSelection.map((option, index) => {
                  if (option.option_name !== 'Price' && option.option_name !== 'Quantity') {
                    return (
                      <Typography key={index} variant='body2'>
                        {option.option_name}: {option.value_name}
                      </Typography>
                    )
                  }

                  return null // ไม่แสดงข้อมูลเมื่อ option_name เป็น "Price" หรือ "Quantity"
                })
              ) : (
                <Typography variant='body2'>No data</Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle2'>Total amount: x{quantity} </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='subtitle1' sx={{ color: 'success.main', order: -1 }}>
                  Save 25%
                </Typography>
                <Typography variant='subtitle2' sx={{ textDecoration: 'line-through', mr: 1, marginLeft: 4 }}>
                  $ 250
                </Typography>
                <Typography variant='subtitle1' sx={{ color: 'error.main', marginRight: 4 }}>
                  $ 185
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Shipping
