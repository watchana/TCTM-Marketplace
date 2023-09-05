// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'

import { CardActionArea } from '@mui/material'

import axios from 'axios'

// ** MDI Icon Imports
import Magnify from 'mdi-material-ui/Magnify'
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'
import ChevronRight from 'mdi-material-ui/ChevronRight'

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
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/category/'>
              Category
            </Link>
          </Breadcrumbs>
        </Box>

        {/* >>>>> Category <<<<< */}
        <Box sx={{ width: '100%', marginY: 4 }}>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={3}>
              {/* ตัวกรอก เริ่ม */}
              <Hidden mdDown>
                <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start'>
                  <Grid item xl={12}>
                    <Typography
                      variant='h4'
                      sx={{
                        marginBottom: '29px',
                        fontWeight: 600,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      Category
                    </Typography>
                  </Grid>
                  <Grid item xl={12} sx={{ width: '100%' }}>
                    {products && products.length > 0 ? (
                      uniqueCategories.map(category => (
                        <Box key={category} sx={{ width: '90%', marginBottom: 1.5 }}>
                          <Button
                            variant='outlined'
                            fullWidth
                            key={category}
                            sx={{
                              backgroundColor: activeButton === category ? '#f9e2e5' : 'default'
                            }}
                            onClick={generateButtonClickHandler(category)}
                          >
                            {category}
                          </Button>
                        </Box>
                      ))
                    ) : (
                      <p>No products available.</p>
                    )}
                  </Grid>
                </Grid>
              </Hidden>
              {/* ตัวกรอก จบ */}
            </Grid>

            <Grid item xl={9} lg={9} md={9}>
              {/* list Product เริ่ม */}
              <Grid container direction='column' justifyContent='flex-start' alignItems='flex-start'>
                <Grid item xl={12}>
                  <Box
                    sx={{
                      width: '100%',
                      marginBottom: '29px',
                      display: 'flex',
                      flexDirection: { sm: 'row', xs: 'column' },
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ width: { sm: '50%', xs: '100%' } }}>
                      <Typography
                        variant='h4'
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        All Product
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xl={12}>
                  {/* Product เริ่ม */}
                  <Box sx={{ width: '100%' }}>
                    <Grid container spacing={3}>
                      {/* ======================================= map ========================================= */}
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                          <Grid item key={product.product_id}>
                            <Card
                              sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}
                              onClick={() => {
                                router.push(`/product/?product_id=${product.product_id}`)
                              }}
                            >
                              <CardActionArea>
                                <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                                  {/* ใส่รูป */}
                                  <CardMedia
                                    component='img'
                                    height='200px'
                                    image={`/imgTctmProduct/${product.image_file_name}`}
                                    sx={{ borderRadius: '10px' }}
                                  />
                                </Box>
                                <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                                  <Box>
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
                                  </Box>
                                  {/* <Box>
                                        <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                          $ {product.product_price}
                                        </Typography>
                                      </Box> */}
                                </Box>
                              </CardActionArea>
                            </Card>
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
                  {/* Product จบ */}
                </Grid>
              </Grid>
              {/* list Product จบ */}
            </Grid>
          </Grid>
        </Box>
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

export default Category
