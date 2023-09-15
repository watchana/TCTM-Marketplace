// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Shipping = ({}) => {
  return (
    <Card sx={{ width: '95%', p: 2.5, marginTop: 3, marginLeft: 3 }}>
      <Grid container spacing={2} rowSpacing={5}>
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              mx: 2,
              mt: 2.2,
              width: { xs: '80px', sm: '100%', md: '100%' },
              height: { xs: '80px', sm: '100%', md: '100%' },
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img src='https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg' alt='Product' style={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 }, marginLeft: 3 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='subtitle1'>Product Name </Typography>
              <Button startIcon={<DeleteIcon />} sx={{ alignItems: 'center' }}>
                {' '}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Description, color, size </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='outlined-number'
                label='Number'
                type='number'
                InputLabelProps={{
                  shrink: true
                }}
              />
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
