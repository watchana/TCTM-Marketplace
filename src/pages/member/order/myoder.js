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

// ** Component Import
import ShowOrder from './showorder'
import ShowOrderReq from './showorderReq'

// ** Axios Imports
import axios from 'axios'

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

        console.log('Api', response.data)
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
                  MyOrder
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    MyOrder
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Shopping sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Card variant='outlined'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='Product Order' value='1' />
                <Tab label='Requirement Order' value='2' />
              </TabList>
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

export default MyOrderPage
