// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Card, Typography, Grid } from '@mui/material'

const ShowResultsAPI = ({ result }) => {
  if (result === 201) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Card
              sx={{
                p: 8,
                textAlign: 'center',
                width: '100%',
                maxHeight: '100vh'
              }}
            >
              <Typography variant='h3' gutterBottom>
                Product registration is complete.
              </Typography>
              <Typography variant='h4'>Please wait for approval from Digital2day Marketplace.</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  } else {
    return (
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBlock: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <Card sx={{ p: 8, textAlign: 'center', width: '100%', maxHeight: '100vh' }}>
              <Typography variant='h3' gutterBottom>
                Product registration is fail.
              </Typography>
              <Typography variant='h4'>Please try again.</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default ShowResultsAPI
