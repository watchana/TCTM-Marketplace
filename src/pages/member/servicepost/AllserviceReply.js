// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
  Typography,
  Chip
} from '@mui/material'

// ** Material UI Tabs Imports
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material-UI Icons Imports
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import StorefrontIcon from '@mui/icons-material/Storefront'

// ** Material Design Icons Imports
import Plus from 'mdi-material-ui/Plus'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

// ** Local Storage Import
import { get } from 'local-storage'

// ** Components Imports
// import Orders from './orders'
// import OrdersReq from './ordersReq'
// import Requirement from './requirement'
// import Information from './information'
import ServicereplyChat from './ServicereplyChat'
import ServiceAddPost from './ServiceAddPost'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

const MyMarket = () => {
  // set tabpanel State
  const [value, setValue] = useState('1')

  // ** Switch Alert Import
  const Swal = require('sweetalert2')
  const router = useRouter()

  // ดึงข้อมูลจาก Local Storage
  const userId = get('Member_Id') // Id ผู้ใช้จาก local Storage

  // เซตข้อมูลลงตัวแปร

  const [serId, setSerId] = useState('') // เก็บค่า Sub Id

  const [shouldFetchData, setShouldFetchData] = useState(true) // state control fate data

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const initialProductData = useRef([]) // เก็บค่าเริ่มต้นของข้อมูลสินค้า

  //-------------------------------------------ฟังก์ชันจัดการค่าซํ้าใน Select Search--------------------------------------//

  //-------------------------------------------จบฟังก์ชันจัดการค่าซํ้าใน Select Search--------------------------------------//

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.service.allpostservice`, {
          params: {
            member_id: userId
          }
        })

        // console.log('หาค่า Sub_id', response.data.message.MarketData[0].sub_id)
        setSerId(response.data.message.MarketData[0].ser_id)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()

    if (shouldFetchData) {
      fetchData()
      setShouldFetchData(false)
    }
  }, [userId, shouldFetchData])

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
                  My Service
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    My Service
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StorefrontIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/* ---------- content ---------- */}
        <Card variant='outlined'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='Service' value='1' />
                <Tab label='Service Reply' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <ServiceAddPost />
            </TabPanel>
            <TabPanel value='2'>
              <ServicereplyChat ser_id={serId} />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </Container>
  )
}

export default withAuth(MyMarket)
