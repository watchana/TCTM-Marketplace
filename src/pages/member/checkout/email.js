// ** React Imports
import React from 'react'

// ** Material UI Imports
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'

const CardEmail = ({ userData, userName }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3, marginBottom: 4 }}>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h6' sx={{ color: '#000' }}>
            {userName}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Grid container spacing={2} rowSpacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' fontSize='18px' sx={{ color: '#404040' }}>
              Email
            </Typography>
            <Typography variant='body1' fontSize='16 px'>
              {userData.user_email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' fontSize='18px' sx={{ color: '#404040' }}>
              Address
            </Typography>
            <Box sx={{ width: '75%' }}>
              <Typography variant='body1' fontSize='16 px'>
                {userData.user_address}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' fontSize='18px' sx={{ color: '#404040' }}>
              Mobile phone
            </Typography>
            <Typography variant='body1' fontSize='16 px'>
              {userData.user_tel}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardEmail
