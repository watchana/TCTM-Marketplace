// ** React imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Card, Container, Grid, Hidden, Typography, Tab, Tabs } from '@mui/material'

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

// SEO
import MySeo from '../seo'
import { SeoBackofficetpage } from 'src/seo/homepage'

const BackOffice = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <MySeo
        title={'Backoffice'}
        description={SeoBackofficetpage.description}
        keywords={SeoBackofficetpage.keywords}
        content={SeoBackofficetpage.content}
      />
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
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant='scrollable'
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label='scrollable prevent tabs example'
                >
                  <Tab label='User' value='1' />
                  <Tab label='Market' value='2' />
                  <Tab label='Product' value='3' />
                  <Tab label='Billboard' value='4' />
                  <Tab label='Information' value='5' />
                  <Tab label='Service' value='6' />
                </Tabs>
              </Box>
              <TabPanel value='1'>
                <User />
              </TabPanel>
              <TabPanel value='2'>
                <Market />
              </TabPanel>
              <TabPanel value='3'>
                <Product />
              </TabPanel>
              <TabPanel value='4'>
                <Billboard />
              </TabPanel>
              <TabPanel value='5'>
                <InformationTable rows='' />
              </TabPanel>
              <TabPanel value='6'>
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
