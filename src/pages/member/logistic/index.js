// ** React Imports
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

//  ** MUI Imports
import { Box, Breadcrumbs, Card, Container, Divider, Grid, Tab, Hidden, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Component Import
import TrackingStatus from 'src/pages/member/logistic/trackorder'
import ShowOrderReq from 'src/pages/member/order/showorderReq'

// ** Axios Imports
import axios from 'axios'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

const MyOrderPage = () => {
  const router = useRouter() // use router
  const { invoice_id, usertype } = router.query

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [productdata, setProductData] = useState('') // product data
  const [trackNo, setTrackNo] = useState('')
  const [invoiceId, setInvoiceId] = useState('')

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoiceId
          }
        })

        // ตรวจสอบว่า Data array มีหรือไม่
        if (response.data.message.Data && response.data.message.Data.length > 0) {
          setTrackNo(response.data.message.Data[0].tracking_number)
        } else {
          // จัดการกรณีที่ Data เป็น empty หรือ undefined
          console.warn('Data array is empty or undefined in the API response')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoiceId])

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_order`, {
          params: {
            member_id: userId
          }
        })

        // Check if Data array exists and has elements
        if (response.data.message.Data && response.data.message.Data.length > 0) {
          setProductData(response.data.message.Data)
          setInvoiceId(response.data.message.Data[0].invoice_id)
        } else {
          // Handle the case when Data is empty or undefined
          console.warn('Data array is empty or undefined in the API response')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userId])

  // ฟังชันอัปเดทค่าข้อมูลจาก Component
  const updateProductData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_order`, {
        params: {
          member_id: userId
        }
      })
      setProductData(response.data.message.Data)
    } catch (error) {
      console.error(error)
    }
  }

  // Tab panel Control

  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
                  Delivery
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography
                      color='#fff'
                      variant='subtitle1'
                      sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                    >
                      Home
                    </Typography>
                  </Link>
                  <Typography
                    color='#fff'
                    variant='subtitle1'
                    sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                  >
                    MyOrder
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LocalShippingIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Card variant='outlined'>
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
                <Tab label='Product Order' value='1' />
                <Tab label='Requirement Order' value='2' />
              </Tabs>
            </Box>
            <TabPanel value='1'>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TrackingStatus productdata={productdata} updateProductData={updateProductData} trackNo={trackNo} />
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <ShowOrderReq userId={userId} />
              </Box>
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </Container>
  )
}

export default withAuth(MyOrderPage)
