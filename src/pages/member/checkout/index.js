// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deepOrange } from '@mui/material/colors'
import { useState } from 'react'
import Cardemail from './email'
import Shipping from './shipping'
import Deriverry from './deriverry'
import Paymant from './payment'
import Summary from './summary'

const Checkout = ({}) => {
  const [selectedOption, setSelectedOption] = useState('a') // เริ่มต้นด้วย 'a' หรือค่าเริ่มต้นที่คุณต้องการ

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box xs={12} sx={{ display: 'flex', flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>
        {/** Title */}
        <Typography
          variant='subtitle1'
          sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: -8 }}
        >
          <h1>Checkout</h1>
        </Typography>
        <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <h2>Shipping charges and discount codes applied at checkout.</h2>
        </Typography>
        <br />
        <Box sx={{ justifyContent: 'center', marginLeft: 25 }}>
          <br />
          {/** Email */}
          <Box xs={12} sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Box sx={{ width: '80%' }}>
              {/** Profile, name, chang */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Stack direction='row' spacing={2}>
                  <Avatar src='/broken-image.jpg' />
                  <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    John Doe
                  </Typography>
                </Stack>
                <Typography
                  variant='subtitle1'
                  sx={{ display: 'flex', justifyContent: 'flex-start', width: '28%', alignItems: 'center' }}
                >
                  <EditIcon />
                  Change address
                </Typography>
              </Box>
              {/** การ์ด 1 Email, Mobile, Address */}
              <Cardemail />
              <br />
              <Box sx={{ width: '100%' }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  Shipping Details{' '}
                </Typography>
                {/** การ์ด 2 Shipping Details */}
                <Shipping />
                <br />
                {/** การ์ด 3 delivery */}
                <Deriverry />
                <br />
                {/** การ์ด 4 Payment */}
                <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                  Payment{' '}
                </Typography>
                <Paymant />
                <br />
                {/** ปุ่มกดยืนยัน */}
                <Grid xs={12} sx={{ width: '95%', marginTop: 2 }}>
                  <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button fullWidth sx={{ bgcolor: 'gray', color: 'red' }}>
                      COMPLETE PURCHASE
                    </Button>
                  </Box>
                  <br />
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <Typography variant='subtitle2'>
                      By clicking "Complete purchase", I confirm that I am aware and accept that I am obliged to pay for
                      my order. I accept the Terms and Conditions and confirm that I have read the Privacy Policy.
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
            {/** การ์ด 5 Summary */}
            <Box>
              <Box xs={12} sx={{ width: '40%' }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '27.6%',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    mt: 1.5
                  }}
                >
                  Summary
                </Typography>
              </Box>
              <Summary />
              <br />
              {/** การ์ด 6 ส่วนลด */}
              <Card sx={{ width: '80%', p: 4 }}>
                <Box>
                  <Typography variant='subtitle1'>DISCOUNT CODE / GIFT CARD</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, alignItems: 'center' }}>
                    <TextField></TextField>
                    <Button sx={{ marginLeft: 3, alignItems: 'center' }}>Apply</Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Checkout
