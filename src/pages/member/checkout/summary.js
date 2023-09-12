// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Summary = ({}) => {
  return (
    <Card sx={{ width: '80%', p: 4 }}>
      <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle1'>Items in the Cart</Typography>
          </Box>
          <Box>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Typography variant='subtitle2'> 250 </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle1'>Shipping </Typography>
          </Box>
          <Box>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Typography variant='subtitle2'> 250 </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle2'>Savings applied </Typography>
          </Box>
          <Box>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Typography variant='subtitle2'> -30 </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant='subtitle2'>Discount Code MOQUPS </Typography>
          </Box>
          <Box>
            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Typography variant='subtitle2'> -10 </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <hr />
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Box>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Total
          </Typography>
        </Box>
        <Box>
          <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
            <Typography variant='h6'> 210 </Typography>
          </Grid>
        </Box>
      </Grid>
    </Card>
  )
}

export default Summary
