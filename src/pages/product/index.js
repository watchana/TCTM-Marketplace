// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'

// ** Material-UI Icons Imports
import IconButton from '@mui/material/IconButton'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

// ** Material Design Icons Imports
import Shopping from 'mdi-material-ui/Shopping'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios Import
import axios from 'axios'

// ** Components Imports
import { withAuth } from 'src/@core/utils/AuthCheck'

const ProductDetails = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [quantity, setQuantity] = useState(1) // ตัวแปรเก็บค่าจำนวนสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก
  const [selection, setSelection] = useState('') // ตัวแปร Selection เก็บค่าตัวเลือก (ข้อมูลที่ต้องส่ง)
  const [productdata, setProductData] = useState([]) // ตัวแปรเก็บข้อมูลสินค่า
  const [productimg, setProductImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ
  const [price, setPrice] = useState('') // ตัวแปรเก็บค่าข้อมูลราคาสินค้า
  const [productName, setProductName] = useState('') // ตัวแปรเก็บค่าชื่อสินค้า

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // console.log('productimg', productimg)
  console.log('productdata', productdata.product_id)

  // รับค่า id product
  const router = useRouter() // เรียกใช้งาน Router
  const { product_id } = router.query
  const productId = product_id

  // ฟังก์ชันจัดการการเปลี่ยนค่าของ Select
  const handleSelectChange = event => {
    const selectedValue = event.target.value
    setSelection(selectedValue)

    // หาค่า Price จากตัวเลือกที่เลือก
    const selectedPrice = selectedValue
      ? selectedValue.find(option => option.option_name === 'Price')?.value_name
      : null

    // อัปเดตค่า price
    setPrice(selectedPrice)

    // เก็บชื่อ product Name
    setProductName(productdata.product_name)
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
        setProductImg(response.data.message.images.Result)
        setProductData(response.data.message.data[0])
        setOptions(response.data.message.options)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [productId])

  // ฟังชัน ย้ายไปหน้า checkout
  const handleBuyNowClick = () => {
    if (!selection) {
      Swal.fire({
        icon: 'error',
        title: 'ระบุตัวเลือกสินค้า'
      })
    } else {
      // แปลงออบเจ็กต์ selection เป็นสตริง JSON
      const selectionString = JSON.stringify(selection)
      router.push(
        `/member/checkout/?productName=${productName}&price=${price}&quantity=${quantity}&selection=${selectionString}&sub_id=${productdata.sub_id}&product_id=${productdata.product_id}`
      )
    }
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='21px bold' color='#fff'>
                  Shop
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/category' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Shop
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Product
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Shopping sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
=========
      <Box sx={{ height: '100%' }}>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/category'>
              Category
            </Link>
          </Breadcrumbs>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <ImageSlider img={productimg} />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box>
                {/* ชื่อสินค้า */}
                <Card sx={{ marginBottom: 2 }}>
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
                <Card sx={{ marginBottom: 2 }}>
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
                        <Button sx={{ width: 175 }} variant='contained' color='primary' onClick={handleBuyNowClick}>
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
                <Typography>- {productdata.product_description}</Typography>
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
        {/* ---------------------------------------------------------------------------------- */}
        <Grid container spacing={2}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Box sx={{ width: '100%', height: '100%', bgcolor: '#fdf' }}>
              <Box sx={{ width: '100%', height: '80%' }}>
                <CardMedia
                  component='img'
                  image='/imgBillboard/bill1.jpeg'
                  alt='1'
                  sx={{ maxWidth: '100%', height: '100%' }}
                />
              </Box>
              <Box sx={{ width: '100%', height: '20%' }}>รูปอื่นๆ</Box>
            </Box>
          </Grid>
          {/* ---------- Details ---------- */}
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}></Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ width: '100%', height: '100%', bgcolor: '#a1c' }}>1</Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default withAuth(ProductDetails)
