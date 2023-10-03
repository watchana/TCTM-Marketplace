// ** React Imports
import React from 'react'

// ** MUI Imports
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Shipping = ({ productName, price, quantity, parsedSelection, FirstImage }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h6' sx={{ color: '#000' }}>
            Shipping Details
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Grid container spacing={4} justifyContent='center'>
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                maxWidth: '200px',
                maxHeight: '200px'
              }}
            >
              <CardMedia
                component='img'
                image={`/imgTctmProduct/${FirstImage}`}
                alt='Product'
                height='100%'
                sx={{ width: '90%', objectFit: 'contain' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container spacing={2} direction='column'>
              <Grid item xs={12}>
                <Typography variant='subtitle1'>Product: {productName}</Typography>
              </Grid>
              <Grid item xs={12}>
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
                <Typography variant='subtitle2' color='#000'>
                  Total amount: x{quantity}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                  <Typography variant='h6' color='#000'>
                    Price $: {price}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Shipping
