// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Tab
} from '@mui/material'

// ** Material UI Tabs Imports
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** Material-UI Icons Imports
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

// ** Material Design Icons Imports
import Shopping from 'mdi-material-ui/Shopping'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios Import
import axios from 'axios'

// ** Components Imports
import { withAuth } from 'src/@core/utils/AuthCheck'

// Import auth token Decode
import { createToken, verifyToken } from 'src/@core/utils/auth'

const ProductDetails = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [quantity, setQuantity] = useState(1) // ตัวแปรเก็บค่าจำนวนสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก
  const [selection, setSelection] = useState('') // ตัวแปร Selection เก็บค่าตัวเลือก (ข้อมูลที่ต้องส่ง)
  const [productdata, setProductData] = useState([]) // ตัวแปรเก็บข้อมูลสินค่า
  const [price, setPrice] = useState('') // ตัวแปรเก็บค่าข้อมูลราคาสินค้า
  const [productName, setProductName] = useState('') // ตัวแปรเก็บค่าชื่อสินค้า
  const [productimg, setProductImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ
  const FirstImage = productimg && productimg[0] ? productimg[0].image_file_name : null // ตัวแปรเก็บข้อมูลรูปภาพตัวอย่าง

  // ตัวแปรเก็บการแสดงราคา
  const totalPrice = price * quantity

  const [valueTabs, setValueTabs] = useState('1')

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

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
        console.log(response.data.message.images)
        setProductData(response.data.message.data[0])
        setOptions(response.data.message.options)

        console.log('message', response.data.message)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [productId])

  // ตัวแปรเก็บค่าตัวเลือก
  let parsedSelection = null

  // แปลงออบเจ็กต์ selection เป็นสตริง JSON
  const selectionString = JSON.stringify(selection)

  if (selectionString && selectionString !== 'null' && selectionString !== 'undefined') {
    parsedSelection = JSON.parse(selectionString) // แปลงค่า selection เป็นออบเจ็กต์
  }

  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [userData, setUserData] = useState('') // ข้อมูล User
  const [name, setName] = useState('') // ข้อมูล Name

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    const nameFromLocalStorage = localStorage.getItem('name')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
      setName(nameFromLocalStorage)
    }
  }, [])

  const handleOrderClick = async e => {
    e.preventDefault()

    const data = {
      po_id: '-',
      invoice_filename: '-',
      descritp_tion: '-',
      product_id: product_id,
      member_id: userId,
      sub_id: productdata.sub_id,
      type: 'product',
      option: parsedSelection,
      amount: quantity,
      total: price * quantity
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.gen_invoice`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Send Data Success'
      })
      router.push(`/category`)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'error'
      })
      console.log(error)
    }
  }

  const handleChange = (event, newValue) => {
    setValueTabs(newValue)
  }

  //-----------------------------Slide Control Function------------------------//

  // Slide Controls Variable
  const [stateImages, setStateImages] = useState(0) // Images
  const [firstImage, setFirstImage] = useState(0) // FirstImage
  const [endImage, setEndImage] = useState(productimg.length) // EndImage
  const MaxLengthImages = productimg.length // MaxLengthImages
  const [presentState, setPresentState] = useState(0) // presentState

  // Button Slide Left
  const leftSlide = () => {
    if (firstImage !== 0) {
      let newFirstImage = firstImage - 1
      let newEndImage = endImage - 1
      setFirstImage(newFirstImage)
      setEndImage(newEndImage)
    }
  }

  // Button Slide Right
  const rightSlide = () => {
    if (endImage !== MaxLengthImages) {
      let newFirstImage = firstImage + 1
      let newEndImage = endImage + 1
      setFirstImage(newFirstImage)
      setEndImage(newEndImage)
    }
  }

  const indexCount = (index, firstImage) => {
    const total = index + firstImage
    setStateImages(index)
    setPresentState(total)
  }

  const slideLeftImage = () => {
    if (stateImages !== 0) {
      setStateImages(stateImages - 1)
      let newFirstImage = firstImage - 1
      let newEndImage = endImage - 1
      if (newEndImage < MaxLengthImages) {
        setFirstImage(newFirstImage)
        setEndImage(newEndImage)
      }
    } else {
      setStateImages(MaxLengthImages - 1)
      setFirstImage(MaxLengthImages - 4)
      setEndImage(MaxLengthImages)
    }
  }

  const slideRightImage = () => {
    if (stateImages !== MaxLengthImages - 1) {
      setStateImages(stateImages + 1)
      let newFirstImage = firstImage + 1
      let newEndImage = endImage + 1
      if (newEndImage <= MaxLengthImages) {
        setFirstImage(newFirstImage)
        setEndImage(newEndImage)
      }
    } else {
      setStateImages(0)
      setFirstImage(0)
      setEndImage(4)
    }
  }

  // ตั้งค่าจำนวนรูปที่แสดง
  useEffect(() => {
    if (MaxLengthImages > 4) {
      setEndImage(4)
    } else {
      setEndImage(MaxLengthImages)
    }
  }, [MaxLengthImages])

  // ** รับค่าจาก local Storage
  let username = '' // ตัวแปรเก็บค่าชื่อผู้ใช้
  let user_status = '' // ตัวแปรเก็บค่าสถานะ user
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('name')
    user_status = localStorage.getItem('User_Status')
  }

  const [role, setRole] = useState('')

  const Router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const decodedToken = verifyToken(token)

    if (decodedToken) {
      setRole(decodedToken.Role)
    } else {
      console.log('Invalid or expired token')
    }
  }, [])

  //-----------------------------Slide Control Function------------------------//

  return (
    <Container maxWidth='xl'>
      <Box sx={{ height: '100%' }}>
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
                  Product
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/category/' passHref>
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
          </Card>
        </Box>

        <Grid container spacing={4}>
          {/* --------------- รูปหลัก --------------- */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { sm: '300px', md: '460px' },
                marginBottom: '10px'
              }}
            >
              <Hidden smUp>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '5%',
                    height: '100%',
                    backgroundColor: '#ddd',
                    borderRadius: '10px'
                  }}
                >
                  <IconButton onClick={slideLeftImage} sx={{ color: '#000' }}>
                    <KeyboardArrowLeft />
                  </IconButton>
                </Box>
              </Hidden>
              <CardMedia
                component='img'
                image={
                  productimg[stateImages]?.image_file_name
                    ? `/imgTctmProduct/${productimg[presentState].image_file_name}`
                    : ''
                }
                alt={`Image ${stateImages + 1}`}
                height='100%'
                sx={{ width: '90%', objectFit: 'contain' }}
              />
              <Hidden smUp>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '5%',
                    height: '100%',
                    backgroundColor: '#ddd',
                    borderRadius: '10px'
                  }}
                >
                  <IconButton onClick={slideRightImage} sx={{ color: '#000' }}>
                    <KeyboardArrowRight />
                  </IconButton>
                </Box>
              </Hidden>
            </Box>
            {/* --------------- รูปย่อย --------------- */}
            <Hidden smDown>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <IconButton onClick={leftSlide} sx={{ backgroundColor: '#ddd' }}>
                  <KeyboardArrowLeft
                    sx={{
                      color: '#000',
                      '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                        transition: 'opacity 0.3s ease-in-out',
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease-in-out'
                      }
                    }}
                  />
                </IconButton>

                {/*----------------------- EZ ------------------------------------------ */}
                {productimg && productimg.length > 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100% ',
                      height: '100px',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                  >
                    {productimg.slice(firstImage, endImage).map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignContent: 'center',
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          scrollSnapType: 'x mandatory',
                          border: '1px solid #aaa',
                          borderRadius: '10px',
                          marginLeft: '15px'
                        }}
                      >
                        <CardMedia
                          component='img'
                          src={`/imgTctmProduct/${image.image_file_name}`}
                          alt={`Image ${index + 1}`}
                          onClick={() => indexCount(index, firstImage)}
                          sx={{
                            width: '100px',
                            display: 'inline-block',
                            cursor: 'pointer',
                            '&:hover': {
                              opacity: [0.9, 0.8, 0.7],
                              transition: 'opacity 0.3s ease-in-out',
                              transform: 'scale(1.1)',
                              transition: 'transform 0.3s ease-in-out'
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant='h6' sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center' }}>
                    No data
                  </Typography>
                )}
                {/*----------------------- END EZ ------------------------------------------ */}

                <IconButton onClick={rightSlide} sx={{ backgroundColor: '#ddd' }}>
                  <KeyboardArrowRight
                    sx={{
                      color: '#000',
                      '&:hover': {
                        opacity: [0.9, 0.8, 0.7],
                        transition: 'opacity 0.3s ease-in-out',
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease-in-out'
                      }
                    }}
                  />
                </IconButton>
              </Box>
            </Hidden>
          </Grid>

          {/* --------------- เลือกสินค้า --------------- */}
          <Grid item xs={12} md={5}>
            <Box sx={{ width: '100%' }}>
              {/* ========== ชื่อสินค้า ========== */}
              <Box sx={{ width: '100%' }}>
                <Typography variant='h3' fontSize='48px bold' color='#000'>
                  {productdata.product_name}
                </Typography>
              </Box>
              {/* ========== Brand ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography variant='h6' fontSize='21px' color='#000'>
                  Brand: {productdata.brand_name ? productdata.brand_name : 'No information'}
                </Typography>
              </Box>
              {/* ========== Option ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography variant='h6' fontSize='21px' color='#000'>
                  Option
                </Typography>
              </Box>
              <Box sx={{ width: '100%', marginTop: '10px' }}>
                <FormControl sx={{ maxWidth: '100%' }}>
                  <InputLabel id='label'>Option</InputLabel>
                  <Select labelId='label' id='select' value={selection} label='Select' onChange={handleSelectChange}>
                    {Object.values(options).map((optionArray, index) => (
                      <MenuItem key={index} value={optionArray}>
                        {optionArray.length === 0 ? (
                          <MenuItem disabled>No information</MenuItem>
                        ) : (
                          optionArray.map(
                            (option, subIndex) =>
                              option.option_name !== 'Price' &&
                              option.option_name !== 'Quantity' && (
                                <Typography key={subIndex}>
                                  {option.option_name} {option.value_name}{' '}
                                  {optionArray.length - 1 === subIndex ? '' : '|'}
                                </Typography>
                              )
                          )
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* ========== Quantity ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography variant='h6' fontSize='21px' color='#000'>
                  Quantity
                </Typography>
              </Box>
              <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                <IconButton
                  sx={{ width: '30px', height: '30px', borderRadius: '5px', backgroundColor: '#2d2e81' }}
                  onClick={decreaseQuantity}
                >
                  <RemoveIcon sx={{ color: '#fff' }} />
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
                  sx={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#2d2e81',
                    borderRadius: '5px'
                  }}
                  onClick={increaseQuantity}
                >
                  <AddIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
              {/* ========== Price ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography variant='h3' fontSize='32px' color='#2d2e81'>
                  {/* ${' '}
                  {selection
                    ? selection.find(option => option.option_name === 'Price')?.value_name
                    : 'Please specify product options.'} */}

                  {totalPrice || 'Please specify product options.'}
                </Typography>
              </Box>
              {/* ========== Button ========== */}
              <Box
                sx={{ width: '100%', marginTop: '20px' }}
                style={{ display: role === 'USER' || role === 'ADMIN' || role === 'TCTM' ? 'block' : 'none' }}
              >
                <Button
                  sx={{ width: 175 }}
                  variant='contained'
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleOrderClick}
                >
                  add to cart
                </Button>
              </Box>
              <Box sx={{ width: '100%', marginTop: '6px' }}>
                {/* ========== Button login for guest ========== */}
                <Box sx={{ width: '100%', marginTop: '20px' }} style={{ display: role === '' ? 'block' : 'none' }}>
                  <Link href='\login' passHref>
                    <Button sx={{ width: 175 }} variant='contained' startIcon={<ShoppingCartIcon />}>
                      Please Login
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ width: '100%', marginTop: '6px' }}></Box>

                <Typography variant='body1' fontSize='16px' color='#606060'>
                  Dispatched in 2-3 Days
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <TabContext value={valueTabs}>
              <Box sx={{ width: '100%', borderBottom: 2, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab label='Details' value='1' />
                  <Tab label='Specification' value='2' />
                  <Tab label='Ratings' value='3' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <Box sx={{ width: '100%', marginTop: '10px' }}>
                  <Typography variant='body1' fontSize='16px' color='#606060'>
                    {productdata.product_description}
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                {productdata.product_detail ? productdata.product_detail : 'No information'}
              </TabPanel>
              <TabPanel value='3'>
                {' '}
                <Box sx={{ width: '100%', marginTop: '10px' }}>No information</Box>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default ProductDetails
