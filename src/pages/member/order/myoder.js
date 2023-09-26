// ** React Imports
import React, { useEffect, useState } from 'react'

//  ** MUI Imports
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Box sx={{ marginBlock: 4 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          MyOrderPage
        </Typography>
      </Box>
      <Divider />
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Product Order' value='1' />
            <Tab label='Requirment Order' value='2' />
            <Tab label='Item Three' value='3' />
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
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </Box>
  )
}

export default MyOrderPage
