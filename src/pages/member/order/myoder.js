// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

//  ** MUI Imports
import { Box, Breadcrumbs, Card, Container, Grid, Tab, Hidden, Typography, Tabs } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material Design Icons Imports
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Component Import
import ShowOrder from './showorder'
import ShowOrderReq from './showorderReq'

// ** Axios Imports
import axios from 'axios'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

// SEO

import { SeoMyorderpage } from 'src/seo/homepage'
import MySeo from 'src/pages/seo'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const MyOrderPage = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [productdata, setProductData] = useState('') // product data

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_order`, {
          params: {
            member_id: userId
          }
        })

        // console.log('Api', response.data)
        setProductData(response.data.message.Data)
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

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

const theme = useTheme()

  return (
    <Container maxWidth='xl'>
      <MySeo
        title={'MyOrder'}
        description={SeoMyorderpage.description}
        keywords={SeoMyorderpage.keywords}
        content={SeoMyorderpage.content}
      />
      <Box>
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
                  MyOrder
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Home
                    </Typography>
                  </Link>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    MyOrder
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <ShoppingCartIcon sx={{ fontSize: 50, color: '#fff' }} />
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
                <ShowOrder productdata={productdata} updateProductData={updateProductData} />
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
