// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'

import Container from '@mui/material/Container'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import axios from 'axios'

// ** MDI Icon Imports
import ArrowLeftThin from 'mdi-material-ui/ArrowLeftThin'

const Category = productData => {
  const [filteredProducts, setFilteredProducts] = useState(productData.productData) // เก็บข้อมูลที่ถูกกรอก
  const [activeButton, setActiveButton] = useState(null) // เช็คสถานะปุ่มที่ถูกกด

  if (!productData || productData.length === 0) {
    // ตรวจสอบว่า productData เป็นค่าว่าง หรือไม่เป็น Array หรือมีข้อมูลสินค้า 0 รายการ
    return <p>No products available.</p>
  }

  // เก็บข้อมูลสินค้า
  const products = productData.productData

  //ปุ่มแยกประเภทผลิตภัณ
  // เครื่องตัด
  const handleCuttingMachineClick = () => {
    const cuttingMachineProducts = products.filter(product => product.category_name === 'engraving / cutting machine')
    setFilteredProducts(cuttingMachineProducts)
    setActiveButton('cuttingMachine')
  }

  // เครื่องอคลิลิค
  const handleAcrylicMachineClick = () => {
    const acrylicMachineProducts = products.filter(product => product.category_name === 'acrylic machine')
    setFilteredProducts(acrylicMachineProducts)
    setActiveButton('acrylicMachine')
  }

  // เครื่องเลเซอร์
  const handleLaserMachineClick = () => {
    const laserMachineProducts = products.filter(product => product.category_name === 'laser marking machine.')
    setFilteredProducts(laserMachineProducts)
    setActiveButton('laserMachine')
  }

  // other
  const handleOtherMachineClick = () => {
    const otherMachineProducts = products.filter(product => product.category_name === 'other')
    setFilteredProducts(otherMachineProducts)
    setActiveButton('otherMachine')
  }
  console.log(products)

  return (
    <>
      <Container maxWidth='xl'>
        <Box>
          <Link href='/' passHref color='inherit'>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
              <ArrowLeftThin />
              <Typography variant='body2' sx={{ fontWeight: 600, marginTop: '1px' }}>
                All Product
              </Typography>
            </Box>
          </Link>

          {/* >>>>> Category Name <<<<< */}
          <Box item sx={{ width: '100%', marginY: 4 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 600,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              Category Name
            </Typography>
          </Box>

          {/* >>>>> Filters <<<<< */}
          <Box sx={{ marginBottom: 6 }}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant='contained'
                  sx={{
                    width: '120px',
                    height: '40px',
                    backgroundColor: activeButton === 'cuttingMachine' ? '#4287f5' : 'default'
                  }}
                  onClick={handleCuttingMachineClick}
                >
                  cutting machine
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  sx={{
                    width: '120px',
                    height: '40px',
                    backgroundColor: activeButton === 'acrylicMachine' ? '#4287f5' : 'default'
                  }}
                  onClick={handleAcrylicMachineClick}
                >
                  acrylic machine
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  sx={{
                    width: '120px',
                    height: '40px',
                    backgroundColor: activeButton === 'laserMachine' ? '#4287f5' : 'default'
                  }}
                  onClick={handleLaserMachineClick}
                >
                  laser marking
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  sx={{
                    width: '120px',
                    height: '40px',
                    backgroundColor: activeButton === 'otherMachine' ? '#4287f5' : 'default'
                  }}
                  onClick={handleOtherMachineClick}
                >
                  Other
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* >>>>> list Products <<<<< */}
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={10}>
              {/* ======================================= map ========================================= */}
              {filteredProducts.map((product, index) => (
                <Grid item key={product.product_id}>
                  <Card sx={{ width: '190px', height: '280px', bgcolor: '#fff', borderRadius: '10px' }}>
                    <CardActionArea>
                      <Box sx={{ width: '100%', height: '70%', padding: '10px 7px 3px' }}>
                        {/* ใส่รูป */}
                        <CardMedia
                          component='img'
                          height='200px'
                          image={`/imgTctmProduct/${product.image_file_name}`}
                          sx={{ borderRadius: '10px' }}
                        />
                      </Box>
                      <Box sx={{ width: '100%', height: '30%', paddingLeft: 2.5, paddingTop: 2 }}>
                        <Box>
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
                        </Box>
                        <Box>
                          <Typography variant='body1' sx={{ fontWeight: 600 }}>
                            $ {product.product_price}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.allproducts`)
    const productData = response.data.message.Data

    // log('DDDD', response)

    return {
      props: {
        productData: productData // ส่งข้อมูลในรูปแบบ Array
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        productData: []
      }
    }
  }
}

export default Category
