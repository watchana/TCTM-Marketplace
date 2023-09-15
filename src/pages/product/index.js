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
  Link,
  Stack,
  Hidden
} from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'

// ** MDI Icon Imports
import Magnify from 'mdi-material-ui/Magnify'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'

// ** Material-UI Icons Imports
import IconButton from '@mui/material/IconButton'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import ProductCard from 'src/@core/components/product/product-card'

import { Carousel } from 'react-responsive-carousel'
import '../../views/product/Components/styled'
import ImageSlider from '../../views/product/ImageSlider'
import { useRouter } from 'next/router'
import { withAuth } from 'src/@core/utils/AuthCheck'
import axios from 'axios'

const ProductDetails = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [quantity, setQuantity] = useState(1) // ตัวแปรเก็บค่าจำนวนสินค้า
  const [productOption, setProductOption] = useState([]) // ตัวแปรเก็บค่าตัวเลือกสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก
  const [selection, setSelection] = useState('') // ตัวแปร Selection เก็บค่าตัวเลือก (ข้อมูลที่ต้องส่ง)
  const [productdata, setProductData] = useState([]) // ตัวแปรเก็บข้อมูลสินค่า
  const [productimg, setProductImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ

  // console.log('productimg', productimg)
  // console.log('selection', selection)

  // รับค่า id product
  const router = useRouter() // เรียกใช้งาน Router
  const { product_id } = router.query
  const productId = product_id

  // ฟังก์ชันจัดการการเปลี่ยนค่าของ Select
  const handleSelectChange = event => {
    setSelection(event.target.value)
  }

  // ฟังก์ชันเพิ่มลดปริมาณสินค้า
  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // ดึงข้อมูลตัวเลือกสินค้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.productdetailv2`, {
          params: {
            product_id: productId
          }
        })

        // console.log('หาข้อมูล', response.data.message.images.Result)
        setProductImg(response.data.message.images.Result)
        setProductData(response.data.message.data[0])
        setOptions(response.data.message.options)
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
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              width: '100%',
              height: '100px',
              mb: '20px',
              p: '20px 25px 20px',
              bgcolor: '#FDEDE8',
              border: '1px solid #FDEDE8'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='1.3rem bold' color='#FA896B'>
                  Product
                </Typography>
                <Stack>
                  <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                    <Link underline='none' color='inherit' href='/'>
                      <Typography variant='body2'>Home</Typography>
                    </Link>
                    <Link underline='none' color='inherit' href='/category/'>
                      <Typography variant='body2'>Category</Typography>
                    </Link>
                    <Link underline='none' color='inherit'>
                      <Typography variant='body2'>Product</Typography>
                    </Link>
                  </Breadcrumbs>
                </Stack>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LocalAtmIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Card sx={{ padding: 6, border: '1px solid rgb(229, 234, 239)' }}>
          <Grid container spacing={2}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <ImageSlider img={productimg} />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box>
                {/* ชื่อสินค้า */}
                <Card sx={{ marginBottom: 2, border: '1px solid rgb(229, 234, 239)' }}>
                  <CardContent>
                    <Typography variant='h5' gutterBottom>
                      {productdata.product_name}
                    </Typography>
                    <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                      Brand : {productdata.product_brand}
                    </Typography>
                    <Typography variant='h6'>
                      ฿
                      {selection
                        ? selection.find(option => option.option_name === 'Price')?.value_name
                        : 'กรุณาระบุตัวเลือกสินค้า'}
                    </Typography>
                  </CardContent>
                </Card>

                {/* เลือกประเภทสินค้า */}
                <Card sx={{ marginBottom: 2, border: '1px solid rgb(229, 234, 239)' }}>
                  <CardContent>
                    <FormControl component='fieldset'>
                      <Typography variant='h6' gutterBottom>
                        Select an option:
                      </Typography>
                      {/* ตัวเลือกเก็บค่าราคา */}
                      <FormControl fullWidth>
                        <InputLabel id='label'>Option</InputLabel>
                        <Select
                          labelId='label'
                          id='select'
                          value={selection}
                          label='Select'
                          onChange={handleSelectChange}
                        >
                          {Object.values(options).map((optionArray, index) => (
                            <MenuItem key={index} value={optionArray}>
                              {optionArray.length === 0 ? (
                                <MenuItem disabled>ไม่มีข้อมูล</MenuItem>
                              ) : (
                                optionArray.map(
                                  (option, subIndex) =>
                                    option.option_name !== 'Price' &&
                                    option.option_name !== 'Quantity' && (
                                      <span key={subIndex}>
                                        {option.option_name}: {option.value_name}{' '}
                                      </span>
                                    )
                                )
                              )}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FormControl>
                  </CardContent>
                </Card>

                {/* ส่วนของปุ่ม เพิ่ม ลด สินค้า */}
                <Card sx={{ marginBottom: 2, border: '1px solid rgb(229, 234, 239)' }}>
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
                <Card sx={{ marginBottom: 2, border: '1px solid rgb(229, 234, 239)' }}>
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
        </Card>

        {/* รายละเอียด */}
        <Box sx={{ marginY: 2 }}>
          <Card>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                <Typography> Product details </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  - {productdata.product_description}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2a-content' id='panel2a-header'>
                <Typography> Product specification </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {/* - Dimension : 33x14x4 cm <br />
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
                  Weight : 1.4 kg */}
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
        {/* <Box sx={{ marginBottom: 2 }}>
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
        </Box> */}
      </Box>
    </Container>
  )
}

export default withAuth(ProductDetails)

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
