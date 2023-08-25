// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import axios from 'axios'

// ** MDI Icon Imports
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'

const Category = ({ productData, SearchProduct, keyword }) => {
  const [filteredProducts, setFilteredProducts] = useState(keyword ? SearchProduct || null : productData || null)
  const [activeButton, setActiveButton] = useState(null) // เช็คสถานะปุ่มที่ถูกกด
  const [searchValue, setSearchValue] = useState('') // State เพื่อเก็บคำค้นหา
  const [searchResults, setSearchResults] = useState([]) // State เพื่อเก็บผลลัพธ์การค้นหา

  // เก็บข้อมูลสินค้า
  const products = productData

  // ** Router ของ Next.js
  const router = useRouter()

  // ดึงค่าสินค้ามาแสดงทันทีที่ทำการค้นหา
  useEffect(() => {
    setFilteredProducts(keyword ? SearchProduct || null : productData || null)
  }, [SearchProduct, keyword, productData])

  // console.log('ข้อมูล filtered Products', filteredProducts)
  console.log('ข้อมูล SearchProduct', SearchProduct)
  console.log('ข้อมูล keyword', keyword)

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

  // ฟังก์ชันค้นหา
  const handleSearch = value => {
    setSearchValue(value)

    // ทำการค้นหาผลลัพธ์ในรายการสินค้าที่มี image_file_name ที่ตรงกับคำค้นหา
    const searchResults =
      products && products.length > 0
        ? products.filter(product => product.product_name.toLowerCase().includes(value.toLowerCase()))
        : []

    setSearchResults(searchResults)
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
    router.replace('/designs/category', undefined, { shallow: true })
  }
  console.log('ไข้อมูลสินค้า', products)

  return (
    <>
      <Container maxWidth='xl'>
        <Box>
          <Link href='/' passHref color='inherit'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <ArrowLeftThin />
              <Typography variant='body2' sx={{ fontWeight: 600, marginTop: '1px' }}>
                All Product
              </Typography>
            </Box>
          </Link>

          {/* >>>>> Category Name <<<<< */}
          <Box item sx={{ width: '100%', marginY: 4 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              Category Name
            </Typography>
          </Box>

          {/* >>>>> Filters <<<<< */}
          <Box sx={{ marginBottom: 6 }}>
            <Grid container spacing={2}>
              {products && products.length > 0 ? (
                uniqueCategories.map(category => (
                  <Grid item key={category}>
                    <Button
                      key={category}
                      variant='contained'
                      sx={{
                        width: '120px',
                        height: '40px',
                        backgroundColor: activeButton === category ? '#4287f5' : 'default'
                      }}
                      onClick={generateButtonClickHandler(category)}
                    >
                      {category}
                    </Button>
                  </Grid>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </Grid>
          </Box>

          <Autocomplete
            id='search-autocomplete'
            options={searchResults} // รายการผลลัพธ์การค้นหา
            getOptionLabel={product => product.product_name}
            renderInput={params => <TextField {...params} label='Search' variant='outlined' />}
            onInputChange={(event, value) => handleSearch(value)} // เมื่อผู้ใช้ป้อนคำค้นหา
          />

          {/* >>>>> list Products <<<<< */}
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={10}>
              {/* ======================================= map ========================================= */}
              {searchResults.length > 0
                ? searchResults.map((product, index) => (
                    <Grid item key={product.product_id}>
                      <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
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
                            <Box>
                              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                $ {product.product_price}
                              </Typography>
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : filteredProducts.map((product, index) => (
                    <Grid item key={product.product_id}>
                      <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
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
                            <Box>
                              <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                $ {product.product_price}
                              </Typography>
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
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
