// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deepOrange } from '@mui/material/colors'

const ShowOrder = ({}) => {
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '83%' }}>
                      <Box sx={{ width: '100%' }}>
                        <Grid item xs={9} md={10}>
                          <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
                            <Grid item xs={12}>
                              <Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 }}} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Card>
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
