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
  Typography
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
import Orders from './orders'
import Requirement from './requirement'

// ** Data Grid Columns
const columns = [
  { field: 'product_id', headerName: 'ID  ', width: 90 },
  { field: 'product_name', headerName: 'Name ', width: 350 },
  { field: 'product_count', headerName: 'amount ', width: 180 }
]

const MyMarket = () => {
  // set tabpanel State
  const [value, setValue] = useState('1')

  // ** Switch Alert Import
  const Swal = require('sweetalert2')
  const router = useRouter()

  // ดึงข้อมูลจาก Local Storage
  const userId = get('Member_Id') // Id ผู้ใช้จาก local Storage

  // เซตข้อมูลลงตัวแปร
  const [productdata, setProductData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [storeStatus, setStoreStatus] = useState('')
  const [subId, setSubId] = useState('') // เก็บค่า Sub Id

  // ตัวแปรควบคุม State
  const [searchText, setSearchText] = useState('') //state สำหรับเก็บข้อมูลการค้นหา

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const initialProductData = useRef([]) // เก็บค่าเริ่มต้นของข้อมูลสินค้า

  // เก็บค่าข้อมูลประเภทสินค้าที่ไม่ซํ้ากัน
  const uniqueCategoryIds = Array.from(
    new Set(initialProductData.current ? initialProductData.current.map(category => category.category_id) : [])
  )

  // ฟังก์ชันตรวจสอบสถานะร้านค้าก่อนใช้งานหน้านี้
  useEffect(() => {
    if (storeStatus === '0') {
      Swal.fire({
        icon: 'error',
        title: 'You are banned.',
        text: 'You are prohibited from accessing.'
      })

      // Redirect ไปหน้า /
      router.push('/')
    } else if (storeStatus === '1') {
      Swal.fire({
        icon: 'info',
        title: 'Please wait for processing.',
        text: 'Your account is waiting for approval.'
      })

      // Redirect ไปหน้า /
      router.push('/')
    } else if (storeStatus === '2') {
    }
  }, [storeStatus, router, Swal])

  // ฟังก์ชันจัดการ Select Dropdown
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value)
    const filteredData = initialProductData.current.filter(product => product.category_id === event.target.value)
    setProductData(filteredData)
  }

  // ฟังก์ชันค้นหาข้อมูล
  const handleSearch = () => {
    const filteredData = productdata.filter(item => item.product_name.toLowerCase().includes(searchText.toLowerCase()))
    setProductData(filteredData)
  }

  // ฟังก์ชันรีเซตข้อมูล
  const handleReset = () => {
    setProductData(initialProductData.current)
    setSearchText('')
    setSelectedCategory('')
  }

  const SearchMenu = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <FormControl fullWidth size='small' variant='outlined' sx={{ maxHeight: '42px', height: '42px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>Category</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={selectedCategory}
              onChange={handleCategoryChange}
              label='Category'
            >
              {uniqueCategoryIds.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={8} xs={8}>
          <TextField
            fullWidth
            size='small'
            label='Search'
            variant='outlined'
            value={searchText}
            onChange={e => {
              handleSearch(e.target.value)
              setSearchText(e.target.value)
            }}
          />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={4} xs={4}>
          <Button fullWidth size='small' variant='outlined' onClick={handleReset} sx={{ height: '100%' }}>
            Reset
          </Button>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button
              variant='contained'
              color='primary'
              startIcon={<Plus />}
              onClick={() => {
                router.push(`/market/add-product/?sub_id=${subId}`)
              }}
              sx={{ width: { xs: '100%', md: '180px' }, height: '100%' }}
            >
              Add Product
            </Button>
          </Stack>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 1 }}>
            <Typography variant='body1' fontSize='1.5rem bold' color='#000'>
              {productdata && productdata.length > 0 ? productdata.length : 0} Products
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )
  }

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.mymarket.allproductinmarket`, {
          params: {
            member_id: userId
          }
        })

        // console.log('หาค่า Sub_id', response.data.message.MarketData[0].sub_id)
        setSubId(response.data.message.MarketData[0].sub_id)
        setStoreStatus(response.data.message.MarketData[0].sub_status)

        initialProductData.current = response.data.message.Data
        setProductData(initialProductData.current)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userId])

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
                  Management
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Market Management
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
                <Tab label='Products' value='1' />
                <Tab label='Orders' value='2' />
                <Tab label='Requirement ' value='3' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Box sx={{ padding: '10px 10px 15px' }}>
                <Grid container direction='columns' spacing={4}>
                  <Grid item sx={{ width: '100%' }}>
                    {SearchMenu()}
                  </Grid>
                  <Grid item sx={{ width: '100%' }}>
                    {initialProductData.current && initialProductData.current.length > 0 ? (
                      <DataGrid
                        rows={productdata}
                        columns={columns}
                        getRowId={row => row.product_id}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5
                            }
                          }
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                      />
                    ) : (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h6' fontSize='24px bold'>
                          There are no products.
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            <TabPanel value='2'>
              <Orders subId={subId} />
            </TabPanel>
            <TabPanel value='3'>
              <Requirement sub_id={subId} />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </Container>
  )
}

export default MyMarket
