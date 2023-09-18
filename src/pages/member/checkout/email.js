// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Cardemail = ({ userData }) => {
  return (
    <Card sx={{ width: '95%', p: 2.5, marginTop: 3, marginLeft: 3 }}>
      <Grid container spacing={2} rowSpacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2' sx={{ marginLeft: 3 }}>
            Email
          </Typography>
          <Typography variant='subtitle1' sx={{ marginLeft: 3 }}>
            {userData.user_email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2'>Address</Typography>
          <Box sx={{ width: '75%' }}>
            <Typography variant='subtitle1'>{userData.user_address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2' sx={{ marginLeft: 3 }}>
            Mobile phone
          </Typography>
          <Typography variant='subtitle1' sx={{ marginLeft: 3 }}>
            {userData.user_tel}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Cardemail
