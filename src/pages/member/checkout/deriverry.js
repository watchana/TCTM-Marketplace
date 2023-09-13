// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Delivery = ({}) => {
  return (
    <Card sx={{ width: '95%', p: 2.5, marginTop: 3, marginLeft: 3 }}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
            <Typography variant='subtitle1' sx={{ marginLeft: 2 }}>
              Pick-up point
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle2' sx={{ marginLeft: 13 }}>Shipping: 2-4 weeks</Typography>
          <Typography variant='subtitle1'>90 THB</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Radio disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
          <Typography variant='subtitle1' sx={{ marginLeft: 1.8 }}>
            Ship to:
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle2' sx={{ marginLeft: 13 }}>Groceries Kiosk, 35 Illinois St, Toronto</Typography>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Radio disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
          <Typography variant='subtitle1' sx={{ marginLeft: 2 }}>
            Home delivery
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='subtitle2' sx={{ marginLeft: 13 }}>Shipping: 3-5 weeks</Typography>
          <Typography variant='subtitle1'>135 THB</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Delivery
