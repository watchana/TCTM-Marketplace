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
  Select,
  Breadcrumbs,
  Link
} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

// ** Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ProductCard from './Component/card'

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
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/pages/category/'>
              Category
            </Link>
          </Breadcrumbs>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <ImageSlider />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box>
                {/* ชื่อสินค้า */}
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant='h5' gutterBottom>
                      Saru KX-75 Wireless Mechanical Keyboard
                    </Typography>
                    <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                      GASKET MOUNTED DESIGN
                    </Typography>
                    <Typography variant='h6'>฿{calculateSelectedPrice()}</Typography>
                  </CardContent>
                </Card>

                {/* เลือกประเภทสินค้า */}
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <FormControl component='fieldset'>
                      <Typography variant='h6' gutterBottom>
                        Select an option:
                      </Typography>
                      {options
                        .filter(
                          optionGroup =>
                            optionGroup[0].option_name !== 'Price' && optionGroup[0].option_name !== 'Quantity'
                        )
                        .map(optionGroup => {
                          const uniqueOptions = Array.from(new Set(optionGroup.map(option => option.value_name))) // กรองค่าที่ไม่ซ้ำกัน

                          return (
                            <div key={optionGroup[0].option_name}>
                              <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                                {optionGroup[0].option_name}:
                              </Typography>
                              <RadioGroup
                                row
                                defaultValue='null'
                                value={selectedValues[optionGroup[0].option_name]}
                                onChange={event => handleRadioChange(event, optionGroup[0].option_name)}
                              >
                                {uniqueOptions.map(optionName => {
                                  const label = optionName || 'ไม่มี'

                                  return (
                                    <FormControlLabel
                                      key={optionName}
                                      value={optionName}
                                      control={<Radio />}
                                      label={label}
                                    />
                                  )
                                })}
                              </RadioGroup>
                            </div>
                          )
                        })}
                    </FormControl>
                  </CardContent>
                </Card>

                {/* ส่วนของปุ่ม เพิ่ม ลด สินค้า */}
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Quantity:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                    </Box>
                  </CardContent>
                </Card>

                {/* ปุ่ม add to cart AND buy now */}
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Grid container spacing={4}>
                      <Grid item>
                        <Button sx={{ width: 175 }} variant='outlined' startIcon={<ShoppingCartIcon />}>
                          add to cart
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button sx={{ width: 175 }} variant='contained' color='primary'>
                          buy now
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography variant='body1' style={{ color: 'gray' }}>
                      Delivery time :
                    </Typography>
                    <Typography variant='body1' style={{ color: 'gray' }}>
                      Will be delivered within 3-10 days.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* รายละเอียด */}
        <Box sx={{ marginY: 2 }}>
          <Card>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography> Product details </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  - Mechanical keyboard with a sleek design Use like a 100% keyboard with 82 keys. but still compact
                  Provides a great user experience There are no screws to drill on the top case, so it's easy to take
                  apart the custom parts. There is a volume control button to use more conveniently. and can also adjust
                  the brightness of the keyboard
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2a-content' id='panel2a-header'>
                <Typography> Product specification </Typography>
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
                <Typography> Product Ratings </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>-</Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Box>

        {/* สินค้าอื่นๆ */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant='h5' gutterBottom>
            Other Products
          </Typography>

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
        </Box>
      </Box>
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
