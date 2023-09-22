// ** React Imports
import React, { useEffect, useState } from 'react'

//  ** MUI Imports
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import ShowOrder from './showorder'

// ** Axios Imports
import axios from 'axios'

const MyOrderPage = ({ MyOrderMenu }) => {
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

        // console.log('Api', response.data.message)
        setProductData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userId])

  const [tabValue, setTabValue] = useState('1')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue.toString()) // ให้แน่ใจว่าค่าถูกแปลงเป็น string
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ marginBlock: 4 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          MyOrderPage
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <TabList
            value={tabValue}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              backgroundColor: 'primary.light',
              '& .MuiTab-root.Mui-selected': {
                color: 'white',
                backgroundColor: 'primary.main'
              },
              borderRadius: '10px',
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': { opacity: 0.3 },
                '@media (min-width: 960px)': {
                  display: 'none'
                }
              }
            }}
          >
            {MyOrderMenu.map(item => (
              <Tab value={item.value.toString()} label={item.label} key={item.value} sx={{ fontSize: 18 }} />
            ))}
          </TabList>
          {MyOrderMenu.map(item => (
            <TabPanel value={item.value.toString()} key={item.value} sx={{ m: -3 }}>
              <ShowOrder productdata={productdata} />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  )
}

// SSR
export async function getServerSideProps() {
  // ? Menu
  const MyOrderMenu = [
    {
      label: 'ทั้งหมด',
      value: 1
    },
    {
      label: 'รอชำระเงิน',
      value: 2
    },
    {
      label: 'ที่ต้องจัดส่ง',
      value: 3
    },
    {
      label: 'ที่ต้องได้รับ',
      value: 4
    },
    {
      label: 'สำเร็จ',
      value: 5
    },
    {
      label: 'ยกเลิก',
      value: 6
    }
  ]

  const MyOrderProduct = [
    {
      id: 1,
      productName: 'เสื้อยืด',
      storeName: 'Uniqlo',
      trackNo: '123456789',
      productPrice: 100,
      productOption: 'สีดำ',
      qty: 1,
      productTotal: 100,
      productImage: '/imgTctmProduct/PNG_X58_BLACK-00.png'
    },
    {
      id: 2,
      productName: 'กางเกงยีนส์',
      trackNo: '123456780',
      storeName: 'Adidas',
      productPrice: 200,
      productOption: 'สีดำ',
      qty: 2,
      productTotal: 400,
      productImage: '/imgTctmProduct/AW_Present_NubwoX_X25.jpg'
    },
    {
      id: 3,
      productName: 'เสื้อยืด',
      trackNo: '123456781',
      storeName: 'Nike',
      productPrice: 100,
      productOption: 'สีดำ',
      qty: 1,
      productTotal: 100,
      productImage: '/imgTctmProduct/550x6002.jpg'
    }
  ]

  return {
    props: {
      MyOrderMenu
    }
  }
}

export default MyOrderPage
