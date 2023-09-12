// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'

const Cardemail = ({}) => {
  return (
    <Card xs={12} sx={{ width: '95%', p: 4 }}>
      <Grid item xs={9} md={10} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
            <Grid item xs={12} sx={{ pt: { marginLeft: 20 } }}>
              <Typography variant='subtitle2'>Email</Typography>
              <Typography variant='subtitle1'>Jhon Doe@gmail.com</Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ pt: { marginLeft: 20 } }}>
              <Typography variant='subtitle2'>Mobile phone </Typography>
              <Typography variant='subtitle1'>+66 89 919 9218 </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '50%' }}>
          <Typography variant='subtitle2'>Address </Typography>
          <Box sx={{ width: '40%' }}>
            <Typography variant='subtitle1'>Ha**** 32 ***50IL***** </Typography>
          </Box>
        </Box>
      </Grid>
    </Card>
  )
}

export default Cardemail
