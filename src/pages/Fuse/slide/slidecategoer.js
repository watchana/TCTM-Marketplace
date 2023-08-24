import React from 'react'
import { Box, Grid, Card, ButtonBase, CardContent, Typography } from '@mui/material'
import { Slide } from 'react-slideshow-image' // นำเข้าไลบรารี Slide ที่คุณใช้
import 'react-slideshow-image/dist/styles.css' // Import สไตล์ของไลบรารี Slide
import ProductImageCard from '../category/category'

const productsPreview = [
  {
    name: 'เครื่องยิงเลเซอร์',
    description: 'เป็นตัวประหลาดสักอย่างนี้ละ',
    price: '3,000,000',
    image: '/img/20W_Fiber_Laser_Engrave_KX-200.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'เครื่องอคริลิก',
    description: 'ไม่รู้ไม่ชี้',
    price: '4,500,000',
    image: '/img/CNC_5_Axis_Router_Rotary_Table_Horizontal.jpg' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'เครื่องแพ็คแพ็กภัณฑ์',
    description: 'เป็นได้แค่นั้นละ',
    price: '8,542,000',
    image: '/img/CNC_Laser_5axis_net.png' // ตั้งค่า path รูปภาพ
  },
  {
    name: 'เครื่องตัดโฟม',
    description: 'ยักไก่ๆ',
    price: '9,758,420',
    image: '/img/CNC_Router_milling_S4.jpg' // ตั้งค่า path รูปภาพ
  }
]

const SlideshowWithCategory = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Slide>
        <div className='card-list'>
          <Grid container spacing={6} justifyContent='flex-end'>
            {productsPreview.map((product, index) => (
              <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
                {/** คือการส่ง Props ไปที่หน้า category */}
                <ProductImageCard product={product} name={product.name} image={product.image} />  
              </Grid>
            ))}
          </Grid>
        </div>
      </Slide>
    </Box>
  )
}

export default SlideshowWithCategory
