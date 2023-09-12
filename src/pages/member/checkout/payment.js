// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const Paymant = ({}) => {
    const [selectedOption, setSelectedOption] = useState('a') // เริ่มต้นด้วย 'a' หรือค่าเริ่มต้นที่คุณต้องการ

    const handleOptionChange = event => {
      setSelectedOption(event.target.value)
    }

  return (
    <Card xs={12} sx={{ width: '95%', p: 4 }}>
      <Grid>
        <Box>
          <Grid item xs={9} md={10}>
            <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 4 } }}>
              <Grid container spacing={2} sx={{ marginLeft: 1 }}>
                <Box>
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
                </Box>
                <Box sx={{ display: 'flex', widows: '100%', alignItems: 'center' }}>
                  <Grid container spacing={2} rowSpacing={2} sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'> Debit / Credit Card</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: 10 } }}>
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <Box sx={{ height: '33%', width: '70%' }}>
                      <TextField label='เลขบัตร' variant='outlined' fullWidth sx={{ marginLeft: 5 }} />
                    </Box>
                    <Box sx={{ height: '33%', width: '73%', display: 'flex', justifyContent: 'center' }}>
                      <TextField label='เดือน/ปี' variant='outlined' sx={{ marginLeft: 5, marginTop: 2 }} />
                      <TextField label='เลข 3 ตัว' variant='outlined' sx={{ marginLeft: 5, marginTop: 2 }} />
                    </Box>
                    <Box sx={{ height: '33%', width: '70%' }}>
                      <TextField label='ชื่อบัตร' variant='outlined' fullWidth sx={{ marginLeft: 5, marginTop: 4 }} />
                    </Box>
                  </Box>
                </Grid>
                <Box>
                  <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: -2, marginTop: 10 } }}>
                    <Box>
                      <Radio
                        disabled
                        checked={selectedOption === 'b'}
                        onChange={handleOptionChange}
                        value='a'
                        name='payment-option'
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 28 },
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex', widows: '100%', alignItems: 'center' }}>
                  <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    sx={{ justifyContent: 'space-between', display: 'flex', marginTop: 0.5 }}
                  >
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'> PayPal</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ width: '100%', justifyContent: 'center', marginLeft: 5, marginRight: 5 }}>
                  <hr />
                </Box>
                <Box>
                  <Grid container spacing={2} rowSpacing={1} sx={{ pt: { marginLeft: -2 } }}>
                    <Box>
                      <Radio
                        disabled
                        checked={selectedOption === 'c'}
                        onChange={handleOptionChange}
                        value='a'
                        name='payment-option'
                        sx={{
                          '& .MuiSvgIcon-root': { fontSize: 28 },
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box sx={{ display: 'flex', widows: '100%', alignItems: 'center' }}>
                  <Grid
                    container
                    spacing={2}
                    rowSpacing={2}
                    sx={{ justifyContent: 'space-between', display: 'flex', marginTop: -3 }}
                  >
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'> ApplePay </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <br />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Card>
  )
}

export default Paymant
