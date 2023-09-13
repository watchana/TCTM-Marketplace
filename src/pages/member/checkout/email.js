// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Cardemail = ({}) => {
  return (
    <Card sx={{ width: '95%', p: 2.5, marginTop: 3, marginLeft: 3 }}>
      <Grid container spacing={2} rowSpacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2'>Email</Typography>
          <Typography variant='subtitle1'>Jhon Doe@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2'>Address</Typography>
          <Box sx={{ width: '75%' }}>
            <Typography variant='subtitle1'>Ha**** 32 ***50IL*****</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='subtitle2'>Mobile phone</Typography>
          <Typography variant='subtitle1'>+66 89 919 9218</Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Cardemail
