// pages/ProductDetails.js
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Box
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProductCard from 'src/views/Home/card'
import IconButton from '@mui/material/IconButton'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ImageSlider from 'src/views/product_details/imgslider'
import { useState } from 'react'

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
  }
]

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        {/* ส่วนรูปภาพ */} {/* อยู่ไฟล์ viwe/imgslider */}
        <Grid item xs={12} sm={8}>
          <Card sx={{ mb: 2 }}>
            <ImageSlider />
          </Card>
        </Grid>
        {/* ส่วนเมนูซื้อและราคา */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant='h5' gutterBottom> Saru KX-75 Wireless Mechanical Keyboard </Typography>
              <Typography variant='body1' style={{ color: 'gray' }} paragraph> GASKET MOUNTED DESIGN </Typography>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant='body1' style={{ color: 'gray', textDecoration: 'line-through' }}> 
                  ฿8,660
                </Typography>
                <Typography variant='body1' style={{ marginLeft: '8px' }}>
                  ฿8,270
                </Typography>
              </div>
            </CardContent>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <select id='color-select' style={{ width: '350px', height: '30px' }}>
                <option value='black'>Black</option>
                <option value='white'>White</option>
              </select>
            </div>
            <br />

            {/* ส่วนของปุ่ม เพิ่ม ลด สินค้า */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Box style={{ marginLeft: '30px' }}> ต้องการ:</Box>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  marginLeft: '10px',
                  marginRight: '10px'
                }}
              >
                <IconButton
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                    color: 'black'
                  }}
                  onClick={decreaseQuantity}
                >
                  -
                </IconButton>
                <Box
                  style={{
                    width: '50px',
                    height: '30px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black'
                  }}
                >
                  {quantity}
                </Box>
                <IconButton
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                    color: 'black'
                  }}
                  onClick={increaseQuantity}
                >
                  +
                </IconButton>
              </div>
            </div>
            <br/>

            {/* ส่วนของปุ่ม Add To cart และ ซื้อสินค้า */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                sx={{ width: 175, margin: 2 }}
                variant='contained'
                color='primary'
                startIcon={<ShoppingCartIcon />}
              >
                เพิ่มไปยังรถเข็น
              </Button>
              <Button sx={{ width: 175, margin: 2 }} variant='contained' color='primary'>
                ซื้อสินค้า
              </Button>
            </div>
            <br />

            {/* ระยะเวลาจัดส่ง */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant='body1' style={{ color: 'gray', marginLeft: '20px' }}>
                ระยะเวลาจัดส่ง :
              </Typography>
              <Typography variant='body1' style={{ color: 'gray', marginLeft: '10px' }}>
                จะจัดส่งภานในระยะเวลา 3-10 วัน
              </Typography>
            </div>
            <br /><br /><br /><br />
          </Card>
        </Grid>
      </Grid>
      <br />
      {/* ส่วนของรายละเอียด */}
      <div style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography> รายอะเอียดสินค้า </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                - คีย์บอร์ดแมคคานิคอลดีไซน์เรียบหรู ใช้งานคล้ายคีย์บอร์ดแบบ 100% มาพร้อมปุ่มถึง 82 ปุ่ม
                แต่ยังคงความกระทัดรัด ให้ประสบการณ์การใช้งานที่ดีเยี่ยม
                ไร้ซึ่งสกรูในการเจาะบนท็อปเคสทำให้แยกส่วนออกมาคัสต้อมได้อย่างง่ายดาย
                มีปุ่มควบคุมระดับเสียงให้ใช้งานได้สะดวกมากขึ้น และยังปรับระดับความสว่างของคีย์บอร์ดได้
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2a-content' id='panel2a-header'>
              <Typography> สเป็คสินค้า </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                - Dimension : 33x14x4 cm <br />
                - Weight : 981 g <br />
                - Form Factor : 75% (82 Keys with Knob) <br />
                - Body Material :Plastic ABS <br />
                - Plate Material : Aluminium <br />
                - Keycap : PBT Doubleshot <br />
                - Switch : Gateron Pro Yellow (Pre-Lubed) <br />
                - Stabilizer : Plate mount Stabilizer (Pre-lubed) <br />
                - Backlight : South Facing RGB <br />
                - HotSwapplable : Support 3 pin & 5 pin MX Switch <br />
                - Lighting : 16.8 Million Color (22 Style Color mode) <br />
                - Connectivity : USB-C , USB Dongle(Wireless) , Bluetooth 5.0 <br />
                - Mounting : Gasket Mount <br />
                - Battery Capacity: 2,500 mAh - Cable Length : 140 cm <br />- Package Dimension : 38x23x7 cm - Package
                Weight : 1.4 kg
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <Typography> คะแนนของสินค้า </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>-</Typography>
            </AccordionDetails>
          </Accordion>
        </Card>
        <br />
        <card>
          <Typography variant='h5' gutterBottom>
            สินค้าเพิ่มเติม
          </Typography>
        </card>
        <card>
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
        </card>
      </div>
    </Container>
  )
}
