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

// Import auth token Decode
import { createToken, verifyToken } from 'src/@core/utils/auth'

// Responsive image
import { useMediaQuery } from '@mui/material'

// Seo
import MySeo from '../seo'
import { SeoProductpage } from 'src/seo/homepage'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const ProductDetails = ({}) => {
  // ตัวแปรเก็บค่าข้อมูล
  const [quantity, setQuantity] = useState(1) // ตัวแปรเก็บค่าจำนวนสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก
  const [selection, setSelection] = useState('') // ตัวแปร Selection เก็บค่าตัวเลือก (ข้อมูลที่ต้องส่ง)
  const [productdata, setProductData] = useState([]) // ตัวแปรเก็บข้อมูลสินค่า
  const [price, setPrice] = useState('') // ตัวแปรเก็บค่าข้อมูลราคาสินค้า
  const [productName, setProductName] = useState('') // ตัวแปรเก็บค่าชื่อสินค้า
  const [productimg, setProductImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ
  const FirstImage = productimg && productimg[0] ? productimg[0].image_file_name : null // ตัวแปรเก็บข้อมูลรูปภาพตัวอย่าง
  const [loadingData, setLoadingData] = useState(0)

  const theme = useTheme()

  // ตัวแปรเก็บการแสดงราคา
  const totalPrice = price * quantity

  const [valueTabs, setValueTabs] = useState('1')

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // รับค่า id product
  const router = useRouter() // เรียกใช้งาน Router
  const { product_id } = router.query

  const productId = product_id

  const host = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_HOST || 'localhost:3000' // replace with your default value
  const currentPath = router.pathname
  const parameters = router.query

  const fullURL = `http://${host}${currentPath}/${Object.keys(parameters).length > 0 ? '?' : ''}${new URLSearchParams(
    parameters
  )}`

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
      if (!productId) {
        // console.error('productId is undefined or null')

        return
      }

      try {
        setLoadingData(0)

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.productdetailv2`, {
          params: {
            product_id: productId
          }
        })
        setLoadingData(1)
        setProductImg(response.data.message.images.Result)
        setProductData(response.data.message.data[0])
        setOptions(response.data.message.options)

        // // Now that we have received the product details, update the SEO details
      } catch (error) {}
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

    if (!parsedSelection) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill option'
      })

      return
    } else {
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

  const OptionData = Object.values(options).map((optionArray, index) =>
    optionArray.map(option => `${option.option_name}${option.value_name}`).join(', ')
  )

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const decodedToken = verifyToken(token)

    if (decodedToken) {
      setRole(decodedToken.Role)
    } else {
      console.log('Invalid or expired token')
    }
  }, [])

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '70px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: theme.palette.primary.dark,
              border: '1px solid #primary.main'
            }}
          >
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid item xs={12} sm={5} md={5}>
                <Typography sx={typography.h1.title} color='#fff'>
                  Product
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/category/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Shop
                    </Typography>
                  </Link>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    Product
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Shopping sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container spacing={1} sx={{ display: 'flex', alingItem: 'center', justifyContent: 'center' }}>
          <Hidden smUp>
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={slideLeftImage}>
                <KeyboardArrowLeft sx={{ color: '#000' }} />
              </IconButton>
            </Grid>
          </Hidden>
          {/* --------------- รูปหลัก --------------- */}
          <Grid item xs={9} md={7}>
            <Box
              title={productdata.product_name}
              alt={productdata.product_name}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: { sm: '300px', md: '460px' },
                marginBottom: '10px'
              }}
            >
              <CardMedia
                component='img'
                image={
                  productimg[stateImages]?.image_file_name
                    ? `/imgTctmProduct/${productimg[stateImages].image_file_name}`
                    : ''
                }
                loading='lazy' // Add this line for lazy loading
                alt={`Image ${stateImages + 1}`}
                sx={{
                  width: '70%',
                  objectFit: 'contain',
                  height: '70%',
                  display: 'flex',
                  aligeItem: 'center',
                  justifycontent: 'center'
                }}
              />
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
          <Hidden smUp>
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={slideRightImage}>
                <KeyboardArrowRight sx={{ color: '#000' }} />
              </IconButton>
            </Grid>
          </Hidden>
          {/* --------------- เลือกสินค้า --------------- */}
          <Grid item xs={12} md={5}>
            <Box sx={{ width: '100%' }}>
              {/* ========== ชื่อสินค้า ========== */}
              <Box sx={{ width: '100%' }}>
                <Typography sx={typography.h1.topic} color='#000'>
                  {productdata.product_name}
                </Typography>
              </Box>

              <MySeo
                title={productdata.product_name}
                details={OptionData}
                description={SeoProductpage.description}
                content={SeoProductpage.content}
                keywords={SeoProductpage.keywords}
                ogimg={
                  productimg[stateImages]?.image_file_name
                    ? `/imgTctmProduct/${productimg[stateImages].image_file_name}`
                    : ''
                }
                url={fullURL}
              />
              {/* ========== Brand ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography sx={typography.subtitle1.topic} color='#000'>
                  Brand: {productdata.product_brand ? productdata.product_brand : 'No information'}
                </Typography>
              </Box>
              {/* ========== Option ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography sx={typography.subtitle1.topic} color='#000'>
                  Option
                </Typography>
              </Box>
              <Box>
                <FormControl sx={{ marginTop: '10px', width: '100%' }}>
                  <InputLabel id='label'>Option</InputLabel>
                  <Select id='select' value={selection} label='Select' onChange={handleSelectChange}>
                    {Object.values(options).map((optionArray, index) => (
                      <MenuItem key={index} value={optionArray}>
                        {optionArray.length === 0 ? (
                          <MenuItem disabled>No information</MenuItem>
                        ) : (
                          optionArray.map((option, subIndex) => (
                            <span key={subIndex}>
                              {option.option_name !== 'Price' && option.option_name !== 'Quantity' && (
                                <React.Fragment>
                                  {`${option.option_name} ${option.value_name}`}
                                  {optionArray.length - 1 === subIndex ? '' : ' | '}
                                </React.Fragment>
                              )}
                            </span>
                          ))
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {/* ========== Quantity ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography sx={typography.subtitle1.topic} color='#000'>
                  Quantity
                </Typography>
              </Box>
              <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                <IconButton
                  sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                    backgroundColor: theme.palette.primary.dark
                  }}
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
                    backgroundColor: theme.palette.primary.dark,
                    borderRadius: '5px'
                  }}
                  onClick={increaseQuantity}
                >
                  <AddIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
              {/* ========== Price ========== */}
              <Box sx={{ width: '100%', marginTop: '20px' }}>
                <Typography sx={{ ...typography.h1.topic, color: 'primary.main' }}>
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
                  <Link href='/login' passHref>
                    <Button sx={{ width: 175 }} variant='contained' startIcon={<ShoppingCartIcon />}>
                      Please Login
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ width: '100%', marginTop: '6px' }}></Box>

                <Typography variant='caption' color='#606060'>
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
                  <Typography sx={typography.body2} color='#606060'>
                    {productdata.product_description?.split(/\b(https?:\/\/[^\s]+)/)?.map((part, index) =>
                      part.match(/(https?:\/\/[^\s]+)/) ? (
                        <a key={index} href={part} target='_blank' rel='noopener noreferrer'>
                          {part}
                        </a>
                      ) : (
                        <React.Fragment key={index}>{part}</React.Fragment>
                      )
                    )}
                  </Typography>
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <Typography sx={typography.body2} color='#606060'>
                  {productdata.product_detail ? productdata.product_detail : 'No information'}
                </Typography>
              </TabPanel>
              <TabPanel value='3'>
                <Typography sx={typography.body2} color='#606060'>
                  {productdata.product_detail ? productdata.product_detail : 'No information'}
                </Typography>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { product_id } = context.query

  // Fetch data based on product_id

  return {
    props: {
      // Data to be passed to the component
    }
  }
}

export default ProductDetails
