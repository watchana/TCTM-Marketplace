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
  Chip,
  Tabs
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
import OrdersReq from './ordersReq'
import Requirement from './requirement'
import Information from './information'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// SEO
import MySeo from '../seo'
import { SeoManagementMarketpage } from 'src/seo/homepage'

// Responsive image
import { useMediaQuery } from '@mui/material'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const MyMarket = () => {
  // set tabpanel State
  const [value, setValue] = useState('1')

  const theme = useTheme()

  // ** Switch Alert Import
  const Swal = require('sweetalert2')
  const router = useRouter()

  // ดึงข้อมูลจาก Local Storage
  const userId = get('Member_Id') // Id ผู้ใช้จาก local Storage

  // เซตข้อมูลลงตัวแปร
  const [productdata, setProductData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [storeStatus, setStoreStatus] = useState('')
  const [marketname, setMarketname] = useState('')
  const [subId, setSubId] = useState('') // เก็บค่า Sub Id

  // ตัวแปรควบคุม State
  const [searchText, setSearchText] = useState('') //state สำหรับเก็บข้อมูลการค้นหา
  const [shouldFetchData, setShouldFetchData] = useState(true) // state control fate data

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const initialProductData = useRef([]) // เก็บค่าเริ่มต้นของข้อมูลสินค้า

  //-------------------------------------------ฟังก์ชันจัดการค่าซํ้าใน Select Search--------------------------------------//

  // สร้าง Map สำหรับเก็บ category_id และ category_name
  const categoryMap = new Map()

  initialProductData.current.forEach(product => {
    categoryMap.set(product.category_id, product.category_name)
  })

  // แปลงค่า Map เป็นอาร์เรย์ของอ็อบเจ็กต์
  const uniqueCategoryIds = Array.from(categoryMap.entries()).map(([category_id, category_name]) => ({
    category_id,
    category_name
  }))

  //-------------------------------------------จบฟังก์ชันจัดการค่าซํ้าใน Select Search--------------------------------------//

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

    // ค้นหาข้อมูลโดยใช้ selectedCategory (เป็น category_id)
    const categoryId = event.target.value
    const filteredData = initialProductData.current.filter(product => product.category_id === categoryId)
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

  // ฟังก์ชันลบข้อมูล
  const handleDelete = primary => {
    Swal.fire({
      title: 'You Want to Delete Data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          table: 'tabproducts',
          primary: primary
        }

        if (primary !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.delete.ban`, data)
            .then(function (response) {
              Swal.fire({
                icon: 'success',
                title: 'Delete Success'
              })

              setShouldFetchData(true)
            })
            .catch(function (error) {
              console.log(error)

              Swal.fire({
                icon: 'error',
                title: 'Erroe'
              })
            })
        } else {
          console.log('Error')
        }
      } else if (result.isDenied) {
        console.log('cancelled Error')
      }
    })
  }

  // ฟังก์ชันเปลี่ยนสถานะ - ขาย
  const handleSellingClick = async (e, product_id) => {
    e.preventDefault()

    const data = {
      product_id: product_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.product.active_sell_product`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Send Data Success'
      })
      setShouldFetchData(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error'
      })
      console.log(error)
    }
  }

  // ฟังก์ชันเปลี่ยนสถานะ - ยกเลิกการขาย
  const handleUnsellingClick = (e, product_id) => {
    e.preventDefault()

    Swal.fire({
      title: 'You Want to Unselling This Product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          product_id: product_id
        }
        if (product_id !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}TCTM.product.active_not_sell_product`, data)
            .then(function (response) {
              console.log(response)
              Swal.fire({
                icon: 'success',
                title: 'Unselling Success'
              })
              setShouldFetchData(true)
            })
            .catch(function (error) {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Erroe'
              })
            })
        } else {
          console.log('Error')
        }
      } else if (result.isDenied) {
        console.log('cancelled Error')
      }
    })
  }

  // ** Data Grid Columns
  const columns = [
    { field: 'category_name', headerName: 'Category  ', width: 90 },
    { field: 'product_name', headerName: 'Name ', width: 350 },
    { field: 'product_count', headerName: 'Amount ', width: 180 },
    {
      field: 'product_status',
      headerName: 'Status ',
      width: 180,
      renderCell: params => {
        const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
        let chipColor = 'default'
        let chipLabel = ''

        if (subStatus === '2') {
          chipColor = 'success'
          chipLabel = 'Selling'
        } else if (subStatus === '3') {
          chipColor = 'info'
          chipLabel = 'Promote'
        } else if (subStatus === '1') {
          chipColor = 'warning'
          chipLabel = 'Wait TCTM Approve'
        } else if (subStatus === '4') {
          chipColor = 'default'
          chipLabel = 'UnSelling..'
        } else {
          chipColor = 'default'
          chipLabel = 'Unknown'
        }

        return <Chip label={chipLabel} color={chipColor} />
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      width: 120,
      renderCell: params => (
        <Button
          variant='contained'
          color='success'
          className='btn btn-danger'
          style={{ marginRight: '5px' }}
          onClick={() => {
            router.push(`/market/product_detail/?product_id=${params.row.product_id}`)
          }}
        >
          Detail
        </Button>
      )
    },
    {
      field: 'Selling',
      headerName: 'Selling',
      width: 120,
      renderCell: params => (
        <Button
          variant='contained'
          color='success'
          className='btn btn-danger'
          style={{ marginRight: '5px' }}
          onClick={e => handleSellingClick(e, params.row.product_id)}
          disabled={params.row.product_status !== '4'}
        >
          Selling
        </Button>
      )
    },
    {
      field: 'UnSelling',
      headerName: 'UnSelling',
      width: 120,
      renderCell: params => (
        <Button
          variant='contained'
          color='warning'
          className='btn btn-danger'
          style={{ marginRight: '5px' }}
          onClick={e => handleUnsellingClick(e, params.row.product_id)}
        >
          Unselling
        </Button>
      )
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 120,
      renderCell: params => (
        <Button
          variant='contained'
          color='error'
          className='btn btn-danger'
          style={{ marginRight: '5px' }}
          onClick={e => handleDelete(params.row.product_id, e)}
        >
          Delete
        </Button>
      )
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 120,
      renderCell: params => (
        <Button
          variant='contained'
          color='primary'
          className='btn btn-danger'
          style={{ marginRight: '5px' }}
          onClick={() => router.push(`/market/editproduct/?product_id=${params.row.product_id}`)}
        >
          Edit
        </Button>
      )
    }
  ]

  const SearchMenu = () => {
    return (
      <Grid container spacing={3}>
        <MySeo
          title={`Management : ` + 'Products'}
          description={SeoManagementMarketpage.description}
          keywords={SeoManagementMarketpage.keywords}
          content={SeoManagementMarketpage.content}
        />
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
              {uniqueCategoryIds && uniqueCategoryIds.length > 0 ? (
                uniqueCategoryIds.map(category => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Data</MenuItem>
              )}
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
        setMarketname(response.data.message.MarketData[0].sub_name)

        initialProductData.current = response.data.message.Data
        setProductData(initialProductData.current)
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

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
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
                  Management : {marketname}
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Home
                    </Typography>
                  </Link>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    Market Management
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <StorefrontIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/* ---------- content ---------- */}
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
                <Tab label='Products' value='1' />
                <Tab label='Product Orders' value='2' />
                <Tab label='Product Requirement Orders' value='3' />
                <Tab label='Requirement ' value='4' />
                <Tab label='Information ' value='5' />
              </Tabs>
            </Box>
            <TabPanel value='1'>
              <Box sx={{ padding: '10px 10px 15px' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'column' }} spacing={4}>
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
              <OrdersReq subId={subId} />
            </TabPanel>
            <TabPanel value='4'>
              <Requirement sub_id={subId} />
            </TabPanel>
            <TabPanel value='5'>
              <Information sub_id={subId} />
            </TabPanel>
          </TabContext>
        </Card>
      </Box>
    </Container>
  )
}

export default withAuth(MyMarket)
