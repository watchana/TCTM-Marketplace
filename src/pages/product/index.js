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
  const [productOption, setProductOption] = useState([]) // ตัวแปรเก็บค่าตัวเลือกสินค้า
  const [options, setOptions] = useState([]) // ตัวแปรเก็บค่า ตัวเลือก
  const [selection, setSelection] = useState('') // ตัวแปร Selection เก็บค่าตัวเลือก (ข้อมูลที่ต้องส่ง)
  const [productdata, setProductData] = useState([]) // ตัวแปรเก็บข้อมูลสินค่า
  const [productimg, setProductImg] = useState([]) // ตัวแปรเก็บข้อมูลรูปภาพ

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
