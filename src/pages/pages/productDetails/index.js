import React, { useEffect, useState, useCallback } from 'react'
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
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProductCard from './Component/card'

import IconButton from '@mui/material/IconButton'
import { Carousel } from 'react-responsive-carousel'
import './Component/styled'
import ImageSlider from './ImageSlider'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function ProductDetails() {
  // ตัวแปรเก็บค่าข้อมูล
  const [quantity, setQuantity] = useState(1) // ตัวแปรเก็บค่าจำนวนสินค้า
  const [productOption, setProductOption] = useState([]) // ตัวแปรเก็บค่าตัวเลือกสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก

  console.log(options)

  // เก็บค่าข้อมูลตัวเลือกจาก radio
  const [selectedValues, setSelectedValues] = useState({})

  // เก็บค่า option ราคา
  const [price, setPrice] = useState({}) // ตัวแปรเก็บค่าทั้งหมด
  const [priceoption, setPriceOption] = useState({}) // ตัวแปรกรองข้อมูลราคา
  const [pricedisplay, setPriceDisplay] = useState('') // ตัวแปรเก็บค่า ที่ต้องจ่าย

  // รับค่า id product
  const router = useRouter() // เรียกใช้งาน Router
  const { product_id } = router.query
  const productId = product_id

  // console.log('รหัส Product', productId)
  //console.log('ข้อมูลตัวแปร Radio', selectedValues)
  // console.log('ข้อมูลราคาสินค้า ', pricedisplay)
  // console.log('ตัวเลือกราคา', price)
  // console.log('ตัวเลือกราคากรอง', priceoption)

  // ฟังก์ชันเพิ่มลดปริมาณสินค้า
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // ฟังก์ชันเก็บค่าข้อมูลจาก Radio
  const handleRadioChange = (event, optionGroupName) => {
    setSelectedValues({
      ...selectedValues,
      [optionGroupName]: event.target.value
    })
  }

  // ปรับโครงสร้างข้อมูล ราคา
  useEffect(() => {
    if (price) {
      const updatedPriceOption = {}

      for (const optionKey in price) {
        if (Object.hasOwnProperty.call(price, optionKey)) {
          const option = price[optionKey]
          const optionData = {}

          for (const value of option) {
            optionData[value.option_name] = value.value_name
          }

          updatedPriceOption[optionKey] = optionData
        }
      }

      setPriceOption(updatedPriceOption)
    }
  }, [price])

  // คำนวณราคาจากตัวเลือก
  const calculateSelectedPrice = useCallback(() => {
    const selectedOptionKeys = Object.keys(selectedValues)

    // เช็คว่ามีตัวเลือกที่ยังไม่ได้ถูกเลือกหรือไม่
    if (selectedOptionKeys.length < options.length - 2) {
      return 'กรุณาระบุตัวเลือกสินค้า'
    }

    for (const optionKey in priceoption) {
      const option = priceoption[optionKey]

      const isMatching = selectedOptionKeys.every(key => {
        return option[key] === selectedValues[key]
      })

      if (isMatching) {
        return parseFloat(option.Price).toFixed(2)
      }
    }

    return 'ไม่พบสินค้า'
  }, [options.length, priceoption, selectedValues])

  // ฟังก์ชันเก็บค่าราคาที่เลือก
  useEffect(() => {
    setPriceDisplay(calculateSelectedPrice()) // เก็บค่าราคาที่คำนวณได้ในตัวแปร pricedisplay
  }, [selectedValues, calculateSelectedPrice])

  // ดึงข้อมูลตัวเลือกสินค้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.productdetailv2`, {
          params: {
            product_id: productId
          }
        })

        // console.log('product Detail', response.data.message.options)
        setPrice(response.data.message.options)

        // ทำการเก็บค่า options
        const productOptions = response.data.message.AllOption
        if (productOptions) {
          const optionValues = Object.values(productOptions)
          setOptions(optionValues)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [productId])

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
              <Typography variant='h5' gutterBottom>
                {' '}
                Saru KX-75 Wireless Mechanical Keyboard{' '}
              </Typography>
              <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                {' '}
                GASKET MOUNTED DESIGN{' '}
              </Typography>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant='body1' style={{ marginLeft: '8px' }}>
                  ราคา: {calculateSelectedPrice()}
                </Typography>
              </div>
            </CardContent>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ minWidth: 300 }}>
                <FormControl component='fieldset'>
                  <Typography variant='subtitle1' gutterBottom>
                    Select an option:
                  </Typography>
                  {options
                    .filter(
                      optionGroup => optionGroup[0].option_name !== 'Price' && optionGroup[0].option_name !== 'Quantity'
                    )
                    .map(optionGroup => (
                      <div key={optionGroup[0].option_name}>
                        <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                          {optionGroup[0].option_name}:
                        </Typography>
                        <RadioGroup
                          row
                          defaultValue='null' // กำหนดค่าเริ่มต้นเป็นค่าว่าง
                          value={selectedValues[optionGroup[0].option_name]}
                          onChange={event => handleRadioChange(event, optionGroup[0].option_name)}
                        >
                          {optionGroup.map(option => {
                            const label = option.value_name || 'ไม่มี'

                            return (
                              <FormControlLabel
                                key={option.value_id}
                                value={option.value_name}
                                control={<Radio />}
                                label={label}
                              />
                            )
                          })}
                        </RadioGroup>
                      </div>
                    ))}
                </FormControl>
              </Box>
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
            <br />

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
            <br />
            <br />
            <br />
            <br />
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
