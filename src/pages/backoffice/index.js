// ** React imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Card, Container, Grid, Hidden, Typography, Tab } from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

// ** Import custom components
import User from 'src/views/backoffice/user'
import Market from 'src/views/backoffice/market'
import Product from 'src/views/backoffice/product'
import Billboard from 'src/views/backoffice/billboard'
import InformationTable from 'src/views/backoffice/InformationTable'
import Service from 'src/views/backoffice/Service'

// ** Auth Check import
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

const BackOffice = () => {
  const [activeTab, setActiveTab] = useState('user')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '80px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography
                  color='#fff'
                  variant='h5'
                  sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' } }}
                >
                  Back office
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ManageAccountsIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        <Card variant='outlined'>
          <Box sx={{ width: '100%' }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
                  <Tab label='User' value='user' />
                  <Tab label='Market' value='market' />
                  <Tab label='Product' value='product' />
                  <Tab label='Billboard' value='billboard' />
                  <Tab label='Information' value='Information' />
                  <Tab label='Service' value='Service' />
                </TabList>
              </Box>
              <TabPanel value='user'>
                <User />
              </TabPanel>
              <TabPanel value='market'>
                <Market />
              </TabPanel>
              <TabPanel value='product'>
                <Product />
              </TabPanel>
              <TabPanel value='billboard'>
                <Billboard />
              </TabPanel>
              <TabPanel value='Information'>
                <InformationTable rows='' />
              </TabPanel>
              <TabPanel value='Service'>
                <Service />
              </TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default withAuth(BackOffice)
