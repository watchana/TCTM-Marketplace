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
    // <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    //   <Box xs={12} sx={{ display: 'flex', flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>
    //     <Box sx={{ justifyContent: 'center', marginLeft: 25 }}>
    //       <br />
    //       {/** Email */}
    //       <Box xs={12} sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
    //         <Box sx={{ width: '80%' }}>
    //           {/** Profile, name, chang */}
    //           {/** การ์ด 1 Email, Mobile, Address */}
    //           <Cardemail />
    //           <br />
    //           <Box sx={{ width: '100%' }}>
    //             <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
    //               Shipping Details{' '}
    //             </Typography>
    //             {/** การ์ด 2 Shipping Details */}
    //             <Shipping />
    //             <br />
    //             {/** การ์ด 3 delivery */}
    //             <Deriverry />
    //             <br />
    //             {/** การ์ด 4 Payment */}
    //             <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 3 }}>
    //               Payment{' '}
    //             </Typography>
    //             <Paymant />
    //             <br />
    //             {/** ปุ่มกดยืนยัน */}
    //             <Grid xs={12} sx={{ width: '95%', marginTop: 2 }}>
    //               <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
    //                 <Button fullWidth sx={{ bgcolor: 'gray', color: 'red' }}>
    //                   COMPLETE PURCHASE
    //                 </Button>
    //               </Box>
    //               <br />
    //               <Box sx={{ height: '100%', width: '100%' }}>
    //                 <Typography variant='subtitle2'>
    //                   By clicking "Complete purchase", I confirm that I am aware and accept that I am obliged to pay for
    //                   my order. I accept the Terms and Conditions and confirm that I have read the Privacy Policy.
    //                 </Typography>
    //               </Box>
    //             </Grid>
    //           </Box>
    //         </Box>
    //         {/** การ์ด 5 Summary */}
    //         <Box>
    //           <Box xs={12} sx={{ width: '40%' }}>
    //             <Typography
    //               variant='subtitle1'
    //               sx={{
    //                 display: 'flex',
    //                 justifyContent: 'flex-start',
    //                 width: '27.6%',
    //                 alignItems: 'center',
    //                 fontWeight: 'bold',
    //                 mt: 1.5
    //               }}
    //             >
    //               Summary
    //             </Typography>
    //           </Box>
    //           <Summary />
    //           <br />
    //           {/** การ์ด 6 ส่วนลด */}
    //           <Card sx={{ width: '80%', p: 4 }}>
    //             <Box>
    //               <Typography variant='subtitle1'>DISCOUNT CODE / GIFT CARD</Typography>
    //               <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3, alignItems: 'center' }}>
    //                 <TextField></TextField>
    //                 <Button sx={{ marginLeft: 3, alignItems: 'center' }}>Apply</Button>
    //               </Box>
    //             </Box>
    //           </Card>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>

    <Grid container spacing={2} style={{ height: '100%' }}>
      <Grid item xs={12}>
        <Typography variant='subtitle1' style={{ textAlign: 'center' }}>
          <h1>Checkout</h1>
          <Typography variant='caption'>
            <h2>Shipping charges and discount codes applied at checkout.</h2>
          </Typography>
        </Typography>
      </Grid>
      <Grid item container xs={12} style={{ height: '100%' }}>
        <Grid item xs={8}>
          {/** Avater, Change */}
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <Avatar src='/broken-image.jpg' />
            </Grid>
            <Grid item>
              <Typography>John Doe</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                <EditIcon />
                Change address
              </Typography>
            </Grid>
          </Grid>
          <Cardemail />
        </Grid>
        <Grid item xs={4} style={{ backgroundColor: 'lightgreen' }}>
          3
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Checkout
