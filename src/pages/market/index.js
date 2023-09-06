// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import { Select, MenuItem } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { get, set } from 'local-storage'
import { useRouter } from 'next/router'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Material-UI Icons Imports
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import StorefrontIcon from '@mui/icons-material/Storefront'

// ** Data Grid Columns
const columns = [
  { field: 'product_id', headerName: 'product ID  ', width: 90 },
  { field: 'product_name', headerName: 'Name ', width: 350 },
  { field: 'product_count', headerName: 'amount ', width: 180 }
]

const MyMarket = () => {
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

  // console.log('สถานะร้านค้า', productdata)

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
        title: 'คุณโดนแบน',
        text: 'คุณถูกแบนการเข้าใช้งาน'
      })

      // Redirect ไปหน้า /
      router.push('/')
    } else if (storeStatus === '1') {
      Swal.fire({
        icon: 'info',
        title: 'กรุณารอการดำเนินการ',
        text: 'บัญชีของคุณกำลังรอการอนุมัติ'
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
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              width: '100%',
              height: '100px',
              mb: '20px',
              p: '20px 25px 20px',
              bgcolor: '#FDEDE8',
              border: '1px solid #FDEDE8'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='1.3rem bold' color='#FA896B'>
                  My Market
                </Typography>
                <Stack spacing={-3}>
                  <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                    <Link underline='none' color='inherit' href='/'>
                      <Typography variant='body2'>Home</Typography>
                    </Link>
                    <Link underline='none' color='inherit'>
                      <Typography variant='body2'>Market</Typography>
                    </Link>
                  </Breadcrumbs>
                </Stack>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StorefrontIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Box sx={{ width: '100%', marginY: 8, paddingLeft: { xl: 6, lg: 6, md: 0 } }}>
          <Grid container spacing={6}>
            {/* ที่กรอกข้อมูล */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '7px', padding: 4 }}>
                <Grid container sx={{ marginBottom: 4 }}>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth variant='standard' sx={{ width: '90%' }}>
                      <Typography variant='h6' fontSize={18}>
                        Product Name
                      </Typography>
                      <TextField
                        size='small'
                        id='outlined-basic'
                        variant='outlined'
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth variant='standard' sx={{ width: '90%' }}>
                      <Typography variant='h6' fontSize={18}>
                        Product Category
                      </Typography>
                      <Select
                        size='small'
                        labelId='category-label'
                        id='category-select'
                        value={selectedCategory} // The selected category_id
                        onChange={handleCategoryChange} // Function to handle category change
                        label='Product Category'
                      >
                        {uniqueCategoryIds.map(categoryId => {
                          const selectedCategory = initialProductData.current.find(
                            category => category.category_id === categoryId
                          )

                          return (
                            <MenuItem key={categoryId} value={categoryId}>
                              {selectedCategory.category_name}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* ปุ่ม */}
                <Grid container>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: '90%',
                        display: 'flex',
                        direction: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: { sm: 2, xs: 2 }
                      }}
                    >
                      <Button variant='contained' color='primary' onClick={handleSearch}>
                        Search
                      </Button>
                      <Button variant='contained' color='primary' onClick={handleReset}>
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Box sx={{ width: '90%' }}>
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<Plus />}
                        onClick={() => {
                          router.push(`/market/add-product/?sub_id=${subId}`)
                        }}
                      >
                        Add Product
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* ผลรวม Product */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                    height: '163px',
                    bgcolor: '#fff',
                    borderRadius: '7px',
                    padding: 4
                  }}
                >
                  <Typography variant='h3' fontSize={34} align='center' sx={{ marginBottom: 4 }}>
                    Product List
                  </Typography>
                  <Typography variant='h2' fontSize={54} align='center'>
                    {productdata && productdata.length > 0 ? productdata.length : 0}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ตารางแสดงข้อมูล */}
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '7px' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='All Product' value='1' />
                <Tab label='Distribution' value='2' />
                <Tab label='Sell out' value='3' />
              </TabList>
            </Box>
            {/* ใส่ Data Grid */}
            <TabPanel value='1'>
              <Box sx={{ width: '100%', height: '100%' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    No Data
                  </div>
                )}
              </Box>
            </TabPanel>

            <TabPanel value='2'>Item Two</TabPanel>
            <TabPanel value='3'>Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  )
}

export default MyMarket
