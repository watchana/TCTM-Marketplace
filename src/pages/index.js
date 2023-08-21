// pages/index.js
import React from 'react'
import { Grid, Box, TablePagination, TextField, Stack, Pagination } from '@mui/material'
import ProductCard from '../views/Home/card'
import ProductImageCard from '../views/Home/category'
import { useState } from 'react'
// import productsData from '../../dummy/productsdummy';

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
const productsData = [
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
    name: 'ชิ้นที่ 3',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 4',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 5',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 6',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 7',
    description: 'ไม่รู้ไม่ชี้',
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 8',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 9',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 10',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 11',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 12',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 13',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 14',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 15',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'ชิ้นที่ 16',
    description: 'ไม่รู้ไม่ชี้',
    price: 500,
    image: '/images/product2.jpg' // ตั้งค่า path รูปภาพ
  }
]

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(12)

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1) // รีเซ็ตหน้าเป็นหน้าแรกเมื่อเปลี่ยนจำนวนแถวต่อหน้า
  }

  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const visibleProducts = productsData.slice(startIndex, endIndex)

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
          <Grid item xs={12} sm={6} md={3}>
            <TextField label='ช่องที่ 1' variant='outlined' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label='ช่องที่ 2' variant='outlined' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label='ช่องที่ 3' variant='outlined' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField label='ช่องที่ 4' variant='outlined' fullWidth />
          </Grid>
        </Grid>
      </Box>
      <h1 className='title'> ร้านค้าออนไลน์ </h1>
      <Stack direction='column' spacing={2}>
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            count={Math.ceil(productsData.length / rowsPerPage)} // คำนวณจำนวนหน้า
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
        <div className='card-list'>
          <Grid container spacing={6}>
            {visibleProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Stack>
    </div>
  )
}

export default Home
