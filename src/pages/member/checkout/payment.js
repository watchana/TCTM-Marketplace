// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const Payment = ({}) => {
  const [selectedOption, setSelectedOption] = useState('a') // เริ่มต้นด้วย 'a' หรือค่าเริ่มต้นที่คุณต้องการ

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }

  return (
    <Card
      sx={{
        width: '95%',
        p: 2.5,
        marginTop: 3,
        marginLeft: 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      className='payment-container'
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Radio
              checked={selectedOption === 'a'}
              onChange={handleOptionChange}
              value='a'
              name='payment-option'
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 28 },
                marginRight: 1
              }}
            />
            <Typography variant='subtitle1'>Debit / Credit Card</Typography>
          </Box>
          <TextField label='Card Number' variant='outlined' sx={{ width: '80%', marginLeft: 12 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px 50px 10px' }}>
            <TextField label='Expiry Month/Year' variant='outlined' sx={{ width: '40%' }} />
            <TextField label='CVV' variant='outlined' sx={{ width: '40%', marginRight: 9 }} />
          </Box>
          <TextField label='Cardholder Name' variant='outlined' sx={{ width: '80%', marginLeft: 12 }} />
        </Grid>
        <Divider sx={{ width: '100%' }} />
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
            <Radio
              disabled
              checked={selectedOption === 'b'}
              onChange={handleOptionChange}
              value='b'
              name='payment-option'
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 28 },
                marginRight: 1
              }}
            />
            <Typography variant='subtitle1'>PayPal</Typography>
          </Box>
        </Grid>
        <Divider sx={{ width: '100%' }} />
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
            <Radio
              disabled
              checked={selectedOption === 'c'}
              onChange={handleOptionChange}
              value='c'
              name='payment-option'
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 28 },
                marginRight: 1
              }}
            />
            <Typography variant='subtitle1'>ApplePay</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Payment
