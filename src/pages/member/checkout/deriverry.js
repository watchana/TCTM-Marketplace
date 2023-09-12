// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Deriverry = ({}) => {
  return (
    <Card xs={12} sx={{ marginTop: 3, width: '95%', p: 4 }}>
      <Grid container spacing={2} rowSpacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ width: '10%', display: 'flex' }}>
            <Grid item xs={9} md={10}>
              <Grid container spacing={2} sx={{ pt: { md: 5 }, marginLeft: 1 }}>
                <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 3, marginLeft: 4.4 } }}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'> Pick-up point </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display: 'flex', widows: '100%', justifyContent: 'start' }}>
              <Typography variant='subtitle2'> Shipping: 2-4 weeks </Typography>
              <Typography sx={{ marginLeft: 82 }} variant='subtitle1'>
                90 THB
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', marginTop: 6 }}>
          <Box sx={{ width: '10%', display: 'flex', justifyContent: 'space-between' }}>
            <Grid item xs={9} md={10}>
              <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 4 } }}>
                <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}></Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={2} rowSpacing={1} sx={{ pt: { md: 3, marginLeft: 4.4 } }}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'> Ship to </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'> Groceries Kiosk, 35 Illinois St, Toronto </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>
          <hr />
        </Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ width: '10%', display: 'flex' }}>
            <Grid item xs={9} md={10}>
              <Grid container spacing={2} sx={{ pt: { md: 5 }, marginLeft: 1 }}>
                <Radio disabled sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{ pt: { md: 3, marginLeft: -2 } }}>
              <Grid item xs={12}>
                <Typography variant='subtitle1'> Pick-up point </Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', widows: '100%', justifyContent: 'start' }}>
                <Typography variant='subtitle2'> Shipping: 3-5 weeks </Typography>
                <Typography sx={{ marginLeft: 78 }} variant='subtitle1'>
                  135 THB
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Card>
  )
}

export default Deriverry
