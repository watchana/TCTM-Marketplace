import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Breadcrumbs,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import Shopping from 'mdi-material-ui/Shopping'
import Menu from 'mdi-material-ui/Menu'

export const Category = ({ productData, SearchProduct, keyword }) => {
  const [filteredProducts, setFilteredProducts] = useState(keyword ? SearchProduct || null : productData || null)
  const [activeButton, setActiveButton] = useState(null) // เช็คสถานะปุ่มที่ถูกกด
  const [searchValue, setSearchValue] = useState('') // State เพื่อเก็บคำค้นหา
  const [searchResults, setSearchResults] = useState([]) // State เพื่อเก็บผลลัพธ์การค้นหา
  const [openDrawerLeftMenu, setOpenDrawerLeftMenu] = useState(false)

  // เก็บข้อมูลสินค้า
  const products = productData

  // ** Router ของ Next.js
  const router = useRouter()

  // ดึงค่าสินค้ามาแสดงทันทีที่ทำการค้นหา
  useEffect(() => {
    setFilteredProducts(keyword ? SearchProduct || null : productData || null)
  }, [SearchProduct, keyword, productData])

  // ตรวจสอบหาก filteredProducts เป็น undefined หรือ null
  if (filteredProducts === undefined || filteredProducts === null) {
    return (
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='body1'>No Data</Typography>
        </Box>
      </Container>
    )
  }

  //ฟังก์ชันจัดการ ปุ่มแยกประเภทผลิตภัณ
  const uniqueCategories = products ? [...new Set(products.map(product => product.category_name))] : [] // ตัวแปรจัดการการกรองข้อมูลปุ่มซํ้า

  const generateButtonClickHandler = category => () => {
    if (activeButton === category) {
      setActiveButton(null) // ยกเลิกการเลือกปุ่ม
      setFilteredProducts(products) // แสดงสินค้าทั้งหมด
      setSearchResults([]) // ล้างผลลัพธ์การค้นหา
    } else {
      const categoryProducts = products.filter(product => product.category_name === category)
      setFilteredProducts(categoryProducts)
      setActiveButton(category)
      setSearchResults([])
    }
    router.replace('category', undefined, { shallow: true })
  }

  const MenuCategory = category => (
    <>
      <Box sx={{ width: '240px', paddingLeft: { xs: 4, md: 0 } }}>
        <Box sx={{ padding: { xs: '20px 25px 8px', md: '0px 25px 8px' } }}>
          <Typography
            variant='h6'
            fontSize='14px'
            textAlign={{ xs: 'center', md: 'left' }}
            sx={{
              fontWeight: 600,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            Filter Category
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <List sx={{ width: '200px' }}>
            {products && products.length > 0 ? (
              uniqueCategories.map(category => (
                <ListItem disablePadding key={category}>
                  <ListItemButton
                    sx={{
                      borderRadius: '7px',
                      border: '1px solid #E5EAEF',
                      marginBottom: 2
                    }}
                    onClick={(generateButtonClickHandler(category), () => setOpenDrawerLeftMenu(false))}
                  >
                    <ListItemText sx={{ textAlign: 'center' }} primary={category} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </List>
        </Box>
      </Box>
    </>
  )

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '20px 25px 20px',
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
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Shop
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

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          {/* ---------- Filter by Category ---------- */}
          <Hidden mdDown>{MenuCategory()}</Hidden>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: { md: '0px 25px 8px ', sm: '0px' }, display: 'flex', alignItems: 'center' }}>
              <Hidden mdUp>
                <IconButton onClick={() => setOpenDrawerLeftMenu(true)}>
                  <Menu />
                </IconButton>
                <Drawer anchor='left' open={openDrawerLeftMenu} onClose={() => setOpenDrawerLeftMenu(false)}>
                  {MenuCategory()}
                </Drawer>
              </Hidden>
              <Typography
                variant='h6'
                fontSize='16px'
                sx={{
                  fontWeight: 600,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis'
                }}
              >
                Products
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: { xs: '10px', md: '25px' } }}>
              <Grid container spacing={3}>
                {/* ======================================= map ========================================= */}
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Grid item key={product.product_id}>
                      <Paper
                        elevation={5}
                        sx={{ width: '350px', height: '350px' }}
                        onClick={() => {
                          router.push(`/product/?product_id=${product.product_id}`)
                        }}
                      >
                        <Box sx={{ width: '100%', height: '100%' }}>
                          <CardActionArea>
                            <Box sx={{ width: '100%', height: '250px' }}>
                              {/* ใส่รูป */}
                              <CardMedia
                                component='img'
                                height='250px'
                                image={`/imgTctmProduct/${product.image_file_name}`}
                                sx={{ borderStartStartRadius: '10px' }}
                              />
                            </Box>
                            <Box sx={{ width: '100%', height: '100px', p: '10px' }}>
                              <Typography
                                variant='h6'
                                sx={{
                                  fontWeight: 600,
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {product.product_name}
                              </Typography>
                              <Box>
                                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                                  $ {product.product_price}
                                </Typography>
                              </Box>
                            </Box>
                          </CardActionArea>
                        </Box>
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                      }}
                    >
                      <Typography variant='body1'>ไม่พบสินค้า</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
