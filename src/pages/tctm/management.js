// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Tab, Card, Typography, Grid, Link, Stack, Breadcrumbs, Hidden } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

// ** Import axios
import axios from 'axios'

// ** Import Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

import MemberTable from 'src/views/tctm/MemberTable'
import SupplierTable from 'src/views/tctm/SupplierTable'
import ProductTable from 'src/views/tctm/ProductTable'
import PostTable from 'src/views/tctm/PostTable'
import ServiceTable from 'src/views/tctm/ServiceTable'

// Responsive image
import { useMediaQuery } from '@mui/material'

const ManagementPage = () => {
  const [value, setValue] = useState('1')
  const [dataUser, setDataUser] = useState([])
  const [dataMarket, setDataMarket] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [dataPost, setDataPost] = useState([])
  const [dataService, setDataService] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.userqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const marketResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.supplierqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.productsqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const postResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirementqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const serviceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showallservice`, {
          params: {
            ser_id: ser_id
          }
        })

        setDataUser(userResponse.data.message.Data || [])
        setDataMarket(marketResponse.data.message.Data || [])
        setDataProduct(productResponse.data.message.Data || [])
        setDataPost(postResponse.data.message.Data || [])
        setDataService(serviceResponse.data.message.Data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [value])

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            height: isSmallScreen ? '70px' : '80px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: '#2d2e81',
            border: '1px solid #primary.main'
          }}
        >
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={8} md={8}>
              <Typography variant='h5' color='#fff' sx={{ fontWeight: 'bold' }}>
                TCTM Management
              </Typography>

              <Typography color='#fff' variant='subtitle1' sx={{ cursor: 'pointer' }}>
                Membership approval management page
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ManageAccountsIcon sx={{ fontSize: 60, color: '#fff' }} />
              </Grid>
            </Hidden>
          </Grid>
        </Card>
      </Box>

      <Card sx={{ width: '100%' }}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='User' value='1' />
                <Tab label='Marketplace' value='2' />
                <Tab label='Product' value='3' />
                <Tab label='Post' value='4' />
                <Tab label='Sercive' value='5' />
              </TabList>
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
              <ServiceTable rows='' />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default ManagementPage
