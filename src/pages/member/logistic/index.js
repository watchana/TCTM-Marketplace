// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

//  ** MUI Imports
import { Box, Breadcrumbs, Card, Container, Divider, Grid, Tab, Hidden, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports
import Shopping from 'mdi-material-ui/Shopping'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

// ** Axios Imports
import axios from 'axios'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

const Mylogisticpage = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='21px bold' color='#fff'>
                  Logistic
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Logistic
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LocalShippingIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Card variant='outlined'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='Item One' value='1' />
                <Tab label='Item Two' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>Item One</TabPanel>
            <TabPanel value='2'>Item Two</TabPanel>
            <TabPanel value='3'>Item Three</TabPanel>
          </TabContext>
        </Card>
      </Box>
    </Container>
  )
}

export default withAuth(Mylogisticpage)
