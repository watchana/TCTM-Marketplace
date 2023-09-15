// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CardActionArea from '@mui/material/CardActionArea'

// ** MUI List Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import axios from 'axios'
import { withAuth } from 'src/@core/utils/AuthCheck'

// ** MDI Icon Imports
import Magnify from 'mdi-material-ui/Magnify'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'

// ** Material-UI Icons Imports
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'

const Category = ({ productData, SearchProduct, keyword }) => {
  const [filteredProducts, setFilteredProducts] = useState(keyword ? SearchProduct || null : productData || null)
  const [activeButton, setActiveButton] = useState(null) // เช็คสถานะปุ่มที่ถูกกด
  const [searchValue, setSearchValue] = useState('') // State เพื่อเก็บคำค้นหา
  const [searchResults, setSearchResults] = useState([]) // State เพื่อเก็บผลลัพธ์การค้นหา

  // เก็บข้อมูลสินค้า
  const products = productData

  // console.log('สินค้า', products)

  // ** Router ของ Next.js
  const router = useRouter()

  // ดึงค่าสินค้ามาแสดงทันทีที่ทำการค้นหา
  useEffect(() => {
    setFilteredProducts(keyword ? SearchProduct || null : productData || null)
  }, [SearchProduct, keyword, productData])

  // console.log('ข้อมูล filtered Products', filteredProducts)
  // console.log('ข้อมูล SearchProduct', SearchProduct)
  // console.log('ข้อมูล keyword', keyword)

  // ตรวจสอบหาก filteredProducts เป็น undefined หรือ null
  if (filteredProducts === undefined || filteredProducts === null) {
    return (
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='body1'>No Data</Typography>
        </Box>
      </Container>
    )
  }

  //ฟังก์ชันจัดการ ปุ่มแยกประเภทผลิตภัณ
  const uniqueCategories = products ? [...new Set(products.map(product => product.category_name))] : [] // ตัวแปรจัดการการกรองข้อมูลปุ่มซํ้า

  const generateButtonClickHandler = category => () => {
    if (activeButton === category) {
      setActiveButton(null) // ยกเลิกการเลือกปุ่ม
      setFilteredProducts(products) // แสดงสินค้าทั้งหมด
      setSearchResults([]) // ล้างผลลัพธ์การค้นหา
    } else {
      const categoryProducts = products.filter(product => product.category_name === category)
      setFilteredProducts(categoryProducts)
      setActiveButton(category)
      setSearchResults([])
    }
    router.replace('category', undefined, { shallow: true })
  }

  // console.log('ข้อมูลสินค้า', products)

  return (
    <Container maxWidth='xl'>
      <Box>
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
                  Category
                </Typography>
                <Stack spacing={-3}>
                  <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                    <Link underline='none' color='inherit' href='/'>
                      <Typography variant='body2'>Home</Typography>
                    </Link>
                    <Link underline='none' color='inherit'>
                      <Typography variant='body2'>Category</Typography>
                    </Link>
                  </Breadcrumbs>
                </Stack>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LocalAtmIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        {/* >>>>> Category <<<<< */}
        <Card>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Hidden mdDown>
              <Box
                sx={{
                  width: { xs: '300px', md: '300px' },
                  borderRight: { xs: 'none', sm: '1px solid rgb(229, 234, 239)' }
                }}
              >
                <Box sx={{ p: '24px 24px 8px ' }}>
                  <Typography
                    variant='subtitle1'
                    textAlign='center'
                    sx={{
                      fontWeight: 600,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Filter by Category
                  </Typography>
                </Box>
                <Box sx={{ p: '8px 0px', position: 'relative' }}>
                  <List sx={{ px: '24px' }}>
                    {products && products.length > 0 ? (
                      uniqueCategories.map(category => (
                        <ListItem disablePadding key={category}>
                          <ListItemButton
                            sx={{
                              borderRadius: '7px',
                              border: '1px solid #E5EAEF',
                              mb: 2
                            }}
                            onClick={generateButtonClickHandler(category)}
                          >
                            <ListItemText primary={category} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    ) : (
                      <p>No products available.</p>
                    )}
                  </List>
                </Box>
              </Box>
            </Hidden>

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: '24px 24px 8px ' }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 600,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Products
                </Typography>
              </Box>
              <Box sx={{ width: '100%', padding: { xs: 0, sm: 4 } }}>
                <Grid container spacing={3}>
                  {/* ======================================= map ========================================= */}
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Grid item key={product.product_id}>
                        <Paper
                          elevation={5}
                          sx={{ width: '350px', height: '350px' }}
                          onClick={() => {
                            router.push(`/product/?product_id=${product.product_id}`)
                          }}
                        >
                          <Box sx={{ width: '100%', height: '100%' }}>
                            <CardActionArea>
                              <Box sx={{ width: '100%', height: '250px' }}>
                                {/* ใส่รูป */}
                                <CardMedia
                                  component='img'
                                  height='250px'
                                  image={`/imgTctmProduct/${product.image_file_name}`}
                                  sx={{ borderStartStartRadius: '10px' }}
                                />
                              </Box>
                              <Box sx={{ width: '100%', height: '100px', p: '10px' }}>
                                <Typography
                                  variant='h6'
                                  sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {product.product_name}
                                </Typography>
                                <Box>
                                  <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                    $ {product.product_price}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardActionArea>
                          </Box>
                        </Paper>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '200px'
                        }}
                      >
                        <Typography variant='body1'>ไม่พบสินค้า</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export const getServerSideProps = async ({ query }) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.allproducts`)
    const productData = response.data.message.Data || []

    if (!query.keyword) {
      // ถ้าไม่มี keyword ใน query parameters ให้ส่งข้อมูลสินค้าทั้งหมดกลับไป
      return {
        props: {
          productData: productData
        }
      }
    }

    // ถ้ามี keyword ใน query parameters
    const keyword = query.keyword

    const filteredProducts = productData.filter(product =>
      product.product_name.toLowerCase().includes(keyword.toLowerCase())
    )

    // console.log('ค่า key', keyword)
    // console.log('ค่า ข้อมูล', filteredProducts)

    return {
      props: {
        productData: productData,
        SearchProduct: filteredProducts,
        keyword: keyword
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        productData: [],
        SearchProduct: [],
        keyword: ''
      }
    }
  }
}

export default withAuth(Category)
