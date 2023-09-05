// pages/index.js
import React from 'react'
import { Grid, Box, TablePagination, TextField, Stack, Pagination, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import ProductImageCard from './category'
import SlideshowWithCategory from 'src/views/homepage/SlideCategory'

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
        <SlideshowWithCategory />
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
      <Grid container spacing={6}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {productsPreview.map((item, index) => (
            <Box sx={{ flex: '0 0 calc(25% - 20px)', padding: '10px', minWidth: '352px' }} key={index}>
              <Card sx={{ width: '100%' }}>
                {/* แสดงรูปภาพสินค้า */}
                <CardMedia
                  component='img'
                  height='200'
                  image={item.image}
                  style={{ cursor: 'pointer', maxWidth: '100%' }}
                />

                <CardContent>
                  {/* แสดงชื่อสินค้า */}
                  <Typography variant='body1' component='div' fontWeight='bold' style={{ cursor: 'pointer' }}>
                    {item.name}
                  </Typography>

                  {/* แสดงราคาสินค้า */}
                  <Typography variant='body1' color='text.primary'>
                    Price: {item.price} THB
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Grid>
    </div>
  )
}

export default Home

const productsPreview = [
  {
    name: 'พระกายแก้ว',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '3,000,000',
    image: '/img/20W_Fiber_Laser_Engrave_KX-200.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'นาฬิกาหยุดเวลา',
    description: 'ไม่รู้ไม่ชี้',
    price: '4,500,000',
    image: '/img/CNC_5_Axis_Router_Rotary_Table_Horizontal.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'พระนาราย',
    description: 'เป็นได้แค่นั้นละ',
    price: '8,542,000',
    image: '/img/CNC_Laser_5axis_net.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ทศกัน',
    description: 'ยักไก่ๆ',
    price: '9,758,420',
    image: '/img/CNC_Router_milling_S4.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 1',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '15,000',
    image: '/img/CNC_5_Axis.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 2',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '15,000',
    image: '/img/CNC_Router_Milling_Z.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 3',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '15,000',
    image: '/img/CNC_Router_Milling_ZXR.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 4',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '15,000',
    image: '/img/UV_Laser_Engraving_Machine.jpg' // ตั้งค่า path รูปภาพ
  }
]
