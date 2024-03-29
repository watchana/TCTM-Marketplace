// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Tab, Card, Typography, Grid, Link, Stack, Breadcrumbs, Hidden, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

// ** Import axios
import axios from 'axios'

// ** Import Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

import MemberTable from 'src/views/digital/MemberTable'
import SupplierTable from 'src/views/digital/SupplierTable'
import ProductTable from 'src/views/digital/ProductTable'
import PostTable from 'src/views/digital/PostTable'
import ServiceTable from 'src/views/digital/ServiceTable'
import ServicePostTable from 'src/views/digital/ServicePostTable'

// Responsive image
import { useMediaQuery } from '@mui/material'

// SEO
import MySeo from '../seo'
import { SeoDigitalManagementpage } from 'src/seo/homepage'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const ManagementPage = () => {
  const [value, setValue] = useState('1')
  const [dataUser, setDataUser] = useState([])
  const [dataMarket, setDataMarket] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [dataPost, setDataPost] = useState([])
  const [dataService, setDataService] = useState([])
  const [dataservicereq, setdataservicereq] = useState([])

  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.userqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const marketResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.supplierqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.productsqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const postResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.requirementqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const postService = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.service.showalluserservice`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const postServicereq = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.requirement_ser_queue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        setDataUser(userResponse.data.message.Data || [])
        setDataMarket(marketResponse.data.message.Data || [])
        setDataProduct(productResponse.data.message.Data || [])
        setDataPost(postResponse.data.message.Data || [])
        setDataService(postService.data.message.Data || [])
        setdataservicereq(postServicereq.data.message.Data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [value])

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <>
      <MySeo
        title={`Digital2day Management`}
        description={SeoDigitalManagementpage.description}
        keywords={SeoDigitalManagementpage.keywords}
        content={SeoDigitalManagementpage.content}
      />
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            height: isSmallScreen ? '70px' : '90px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: theme.palette.primary.dark,
            border: '1px solid #primary.main'
          }}
        >
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={8} md={8}>
              <Typography sx={typography.h1.title} color='#fff'>
                Digital2day Management
              </Typography>

              <Typography sx={typography.subtitle1.title} color='#fff'>
                Membership approval management page
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

      <Card sx={{ width: '100%' }}>
        <Box>
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
                <Tab label='Marketplace' value='2' />
                <Tab label='Product' value='3' />
                <Tab label='Post' value='4' />
                <Tab label='Service' value='5' />
                <Tab label='ServicePost' value='6' />
              </Tabs>
            </Box>
            <TabPanel value='1'>
              <MemberTable rows={dataUser} />
            </TabPanel>
            <TabPanel value='2'>
              <SupplierTable rows={dataMarket} />
            </TabPanel>
            <TabPanel value='3'>
              <ProductTable rows={dataProduct} />
            </TabPanel>
            <TabPanel value='4'>
              <PostTable rows={dataPost} />
            </TabPanel>
            <TabPanel value='5'>
              <ServiceTable rows={dataService} />
            </TabPanel>
            <TabPanel value='6'>
              <ServicePostTable rows={dataservicereq} />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default ManagementPage
