// pages/index.js
import React from 'react'
import { Grid, Box, TablePagination, TextField, Stack, Pagination, Button } from '@mui/material'
import ProductCard from '../views/Home/card'
import ProductImageCard from '../views/Home/category'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const Home = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [product, setProduct] = useState('') // ตัวแปรเก็บค่า product
  const [productname, setProductName] = useState('') // ตัวแปรเก็บค่า ชื่อ product
  const [description, setDescription] = useState('') // ตัวแปรเก็บค่า description
  const [price, setPrice] = useState('') // ตัวแปรเก็บค่า price
  const [image, setImage] = useState('') // ตัวแปรเก็บค่า image

  console.log('ข้อมูล Product', product)

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.allproducts`)

        const productData = response.data.message.Data
        const names = productData.map(product => product.product_name)
        const description = productData.map(product => product.product_description)
        const price = productData.map(product => product.product_price)

        console.log('ทดสอบ', response.data.message.Data)
        setProduct(response.data.message.Data)

        // setProductName(names)
        // setDescription(description)
        // setPrice(price)
        // console.log('ข้อมูลสินค้า', response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // ฟังก์ชันกรองข้อมูล
  const [selectedFilter, setSelectedFilter] = useState(null)

  const handleFilterClick = filter => {
    if (selectedFilter === filter) {
      // ถ้าคลิกซ้ำกับตัวเดิม ให้ยกเลิกการเลือก
      setSelectedFilter(null)
    } else {
      // ถ้าคลิกตัวใหม่ ให้เลือกตัวนั้น
      setSelectedFilter(filter)
    }
  }

  // ฟังก์ชัน pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage

  return (
    <div className='container'>
      <div className='container'>
        <h1 className='title'> Category </h1>
        <div className='card-list'>
          <Grid container spacing={6} justifyContent='flex-end'>
            {productsPreview.map((product, index) => (
              <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
                <ProductImageCard name={product.name} image={product.image} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Box>
        <hr />
      </Box>
      <Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={1.5}>
            <Button
              variant={selectedFilter === 'Sort by' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('Sort by')}
              fullWidth
            >
              Sort by
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <Button
              variant={selectedFilter === 'New' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('New')}
              fullWidth
            >
              New
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <Button
              variant={selectedFilter === 'Sales' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('Sales')}
              fullWidth
            >
              Sales
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <Button
              variant={selectedFilter === 'Size' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('Size')}
              fullWidth
            >
              Size
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={1.5}>
            <Button
              variant={selectedFilter === 'Color' ? 'contained' : 'outlined'}
              onClick={() => handleFilterClick('Color')}
              fullWidth
            >
              Color
            </Button>
          </Grid>
        </Grid>
      </Box>
      <h1 className='title'> ร้านค้าออนไลน์ </h1>
      <Stack direction='column' spacing={2}>
        <div className='card-list'>
          <Grid container spacing={6}>
            {product ? (
              product.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card>
                    {/* แสดงรูปภาพสินค้า */}
                    <CardMedia component='img' height='200' image={item.image} style={{ cursor: 'pointer' }} />

                    <CardContent>
                      {/* แสดงชื่อสินค้า */}
                      <Typography variant='h6' component='div' style={{ cursor: 'pointer' }}>
                        {item.product_name}
                      </Typography>

                      {/* แสดงคำอธิบายสินค้า */}
                      {/* <Typography variant='body2' color='text.secondary'>
                        {item.product_description}
                      </Typography> */}

                      {/* แสดงราคาสินค้า */}
                      <Typography variant='body1' color='text.primary' fontWeight='bold'>
                        Price: {item.product_price} THB
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant='body2' color='text.secondary'>
                ไม่มีข้อมูล
              </Typography>
            )}
          </Grid>
        </div>
      </Stack>
    </div>
  )
}

export default Home

const productsPreview = [
  {
    name: 'พระกายแก้ว',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: 100,
    image: '../../../img/2023-08-18 090802.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'นาฬิกาหยุดเวลา',
    description: 'ไม่รู้ไม่ชี้',
    price: 200,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'พระนาราย',
    description: 'เป็นได้แค่นั้นละ',
    price: 100,
    image: '../../../img/2023-08-18 090802.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ทศกัน',
    description: 'ยักไก่ๆ',
    price: 200,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  }
]
