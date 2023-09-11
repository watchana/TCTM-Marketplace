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

const ShowOrder = ({}) => {
  const [selectedOption, setSelectedOption] = useState('a') // เริ่มต้นด้วย 'a' หรือค่าเริ่มต้นที่คุณต้องการ

  const handleOptionChange = event => {
    setSelectedOption(event.target.value)
  }

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
              {/** Address */}
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
              <br />
              {/** ส่วนของ Shipping Details */}
              <Box sx={{ width: '100%' }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                  Shipping Details{' '}
                </Typography>
                <Card xs={12} sx={{ marginTop: 3, width: '95%', p: 4 }}>
                  <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={3} md={2}>
                      <Box
                        sx={{
                          mx: 2,
                          mt: 2.2,
                          width: { xs: '10vw', sm: 100, md: 100, lg: 150 },
                          height: { xs: '10vh', sm: 100, md: 100, lg: 150 },
                          position: 'relative',
                          justifyContent: 'space-between'
                        }}
                      >
                        <img src='imgTctmProduct/PNG_X58_BLACK-00.png' alt='Product' />
                      </Box>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '83%' }}>
                      <Box sx={{ width: '100%' }}>
                        <Grid item xs={9} md={10}>
                          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
                            <Grid item xs={12}>
                              <Typography variant='subtitle1'>Product Name </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant='subtitle2'>Description, color, size </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField></TextField>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                        <Box sx={{ height: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                          <Grid item xs={9} md={10}>
                            <Grid
                              item
                              xs={12}
                              sm={11}
                              sx={{
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                marginTop: 3
                              }}
                            >
                              <DeleteIcon />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ height: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                          <Grid item xs={12} sm={9}>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                textDecoration: 'line-through',
                                marginTop: 4,
                                marginRight: 4,
                                marginLeft: 4
                              }}
                            >
                              250
                            </Typography>
                          </Grid>
                          <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid item xs={12} sm={2}>
                              <Typography
                                variant='subtitle1'
                                sx={{
                                  display: 'flex',
                                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                  marginTop: 3,
                                  marginRight: 4,
                                  marginLeft: -5
                                }}
                              >
                                250
                              </Typography>
                            </Grid>
                          </Box>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                          <Typography
                            variant='subtitle1'
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: -10,
                              marginRight: 4,
                              marginLeft: -5
                            }}
                          >
                            Save 25%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Card>
                <br />
                {/** delivery */}
                <Card xs={12} sx={{ marginTop: 3, width: '95%', p: 4 }}>
                  <Grid container spacing={2} rowSpacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Box sx={{ width: '6%' }}>
                        <Grid item xs={9} md={10}>
                          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 4 } }}>
                            <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                              <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                      <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 3, marginLeft: 4.4 } }}>
                        <Grid item xs={12}>
                          <Typography variant='subtitle1'> Pick-up point</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='subtitle2'> Shipping: 2-4 weeks </Typography>
                        </Grid>
                        <Grid
                          sx={{ display: 'flex', widows: '100%', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
                        >
                          <Typography sx={{ marginLeft: 45 }} variant='subtitle1'>
                            {' '}
                            150 THB{' '}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box></Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', marginTop: 6 }}>
                      <Box sx={{ width: '6%', display: 'flex', justifyContent: 'space-between' }}>
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
                    <hr />
                    <Box sx={{ display: 'flex', width: '100%' }}>
                      <Box sx={{ width: '6%', display: 'flex' }}>
                        <Grid item xs={9} md={10}>
                          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 4 } }}>
                            <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                              <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }, justifyContent: 'space-between' }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Grid container spacing={2} rowSpacing={1} sx={{ pt: { md: 3, marginLeft: 4.4 } }}>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1'> Pick-up point </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant='subtitle2'> Shipping: 3-5 weeks </Typography>
                          </Grid>
                          <Grid
                            sx={{
                              display: 'flex',
                              widows: '100%',
                              justifyContent: { xs: 'flex-start', sm: 'flex-end' }
                            }}
                          >
                            <Typography sx={{ marginLeft: 49 }} variant='subtitle1'>
                              {' '}
                              135 THB{' '}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Card>
                <br />
                <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                  Payment{' '}
                </Typography>
                <Card xs={12} sx={{ width: '95%', p: 4 }}>
                  <Grid>
                    <Box>
                      <Grid item xs={9} md={10}>
                        <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 4 } }}>
                          <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                            <Radio
                              checked={selectedOption === 'a'}
                              onChange={handleOptionChange}
                              value='a'
                              name='payment-option'
                              sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}
                            />
                            Debit / Credit Card
                            <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                              <Box sx={{ height: '100%', width: '100%' }}>
                                <Box sx={{ height: '33%', width: '70%' }}>
                                  <TextField label='เลขบัตร' variant='outlined' fullWidth sx={{ marginLeft: 5 }} />
                                </Box>
                                <Box sx={{ height: '33%', width: '73%', display: 'flex', justifyContent: 'center' }}>
                                  <TextField label='เดือน/ปี' variant='outlined' sx={{ marginLeft: 5, marginTop: 2 }} />
                                  <TextField
                                    label='เลข 3 ตัว'
                                    variant='outlined'
                                    sx={{ marginLeft: 5, marginTop: 2 }}
                                  />
                                </Box>
                                <Box sx={{ height: '33%', width: '70%' }}>
                                  <TextField
                                    label='ชื่อบัตร'
                                    variant='outlined'
                                    fullWidth
                                    sx={{ marginLeft: 5, marginTop: 4 }}
                                  />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10, marginTop: 30 } }}>
                              <Radio
                                value='disabled'
                                disabled
                                sx={{
                                  '& .MuiSvgIcon-root': { fontSize: 28 },
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              />
                              PayPal
                            </Grid>
                            <hr /> {/* เพิ่มเส้น hr ตรงนี้ */}
                            <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                              <Radio
                                value='disabled'
                                disabled
                                sx={{
                                  '& .MuiSvgIcon-root': { fontSize: 28 },
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              />
                              ApplePay
                            </Grid>
                          </Grid>
                          <br />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Card>
                <br />
                <Grid xs={12} sx={{ width: '95%', marginTop: 2 }}>
                  <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button fullWidth sx={{ bgcolor: 'gray', color: 'red' }}>
                      COMPLETE PURCHASE
                    </Button>
                  </Box>
                  <br/>
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <Typography variant='subtitle2'>
                      By clicking "Complete purchase", I confirm that I am aware and accept that I am obliged to pay for
                      my order. I accept the Terms and Conditions and confirm that I have read the Privacy Policy.
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
            {/** Summary */}
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
              <Card sx={{ width: '80%', p: 4 }}>
                <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant='subtitle1'>Items in the Cart</Typography>
                    </Box>
                    <Box>
                      <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <Typography variant='subtitle2'> 250 </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant='subtitle1'>Shipping </Typography>
                    </Box>
                    <Box>
                      <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <Typography variant='subtitle2'> 250 </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant='subtitle2'>Savings applied </Typography>
                    </Box>
                    <Box>
                      <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <Typography variant='subtitle2'> -30 </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant='subtitle2'>Discount Code MOQUPS </Typography>
                    </Box>
                    <Box>
                      <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                        <Typography variant='subtitle2'> -10 </Typography>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <hr />
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                  <Box>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                      Total
                    </Typography>
                  </Box>
                  <Box>
                    <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                      <Typography variant='h6'> 210 </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Card>
              <br />
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

export default ShowOrder
