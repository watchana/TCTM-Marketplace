// ** React Imports
import React from 'react'

// ** MUI Imports
import { Avatar, Box, Button, Card, Divider, Grid, Radio, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Shipping = ({}) => {
  return (
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
                  <Button>
                    {' '}
                    <DeleteIcon />
                  </Button>
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
  )
}

export default Shipping
