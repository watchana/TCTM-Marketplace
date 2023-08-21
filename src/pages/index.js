// pages/index.js
import React from 'react'
import { Grid, Box } from '@mui/material'
import ProductCard from '../views/Home/card'
import ProductImageCard from '../views/Home/category'
// import productsData from '../../dummy/productsdummy';

const productsData = [
  {
    name: 'พระกายแก้ว',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: 100,
    image: '../../../img/2023-08-18 090802.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'นาริฬาหยุดเวลา',
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
  }
]

const Home = () => {
  return (
    <div className='container'>
      <div className='container'>
        <h1 className='title'> Category </h1>
        <div className='card-list'>
          <Grid container spacing={6} justifyContent='flex-end'>
            {productsData.map((product, index) => (
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
      <h1 className='title'> ร้านค้าออนไลน์ </h1>
      <div className='card-list'>
        <Grid container spacing={6}>
          {productsData.map((product, index) => (
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
    </div>
  );
};

export default Home