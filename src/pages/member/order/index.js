// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Breadcrumbs,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Hidden,
  useMediaQuery
} from '@mui/material'

// ** Material-UI Icons Imports
import CreditCardIcon from '@mui/icons-material/CreditCard'

// ** Material Design Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

//** Axios Import
import axios from 'axios'

//** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// ** Component Imports
import Total from './total'
import Payment from './payment'

import TablePayment from './tablepayment'
import CheckoutForm from '../checkout/stripe_checkout'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const Indexpayment = () => {
  // ใช้งาน Router
  const router = useRouter() // use router
  const data = router.query

  const modifiedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.endsWith('=') ? value.slice(0, -1) : value])
  )

  const dataArray = Object.values(modifiedData)
    .map(str => {
      try {
        return JSON.parse(str)
      } catch (error) {
        console.error('Error parsing JSON:', error)

        return null
      }
    })
    .filter(Boolean)

  // const parsedData = JSON.parse(data)

  // ตัวแปรเก็บค่าข้อมูล
  const [productData, setProductData] = useState([]) // ข้อมูล ธนาคาร
  const [megaProductData, setMegaProductData] = useState([]) // ข้อมูล สินค้า

  const theme = useTheme()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = dataArray.map(async (item, index) => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.checkout.market_number_bank`, {
              params: {
                sub_id: item?.sub_id,
                invoice_id: item?.invoice_id
              }
            })

            return response.data.message // Return the response
          } catch (error) {
            console.error(error)

            return null // Handle error case
          }
        })

        const results = await Promise.all(promises)

        // สร้าง arrays สำหรับข้อมูลทั้งหมดที่ได้จากการเรียก API
        const allProductData = results.map(request => request?.Data[0] || null)
        const allMegaProductData = results.map(request => request?.Invoice[0] || null)

        // อัปเดต state ใหม่ด้วยค่าที่ได้จากการเรียก API ทั้งหมด
        setProductData(allProductData)
        setMegaProductData(allMegaProductData)
      } catch (error) {
        console.error(error)
      }
    }

    if (dataArray && dataArray.length >= 0) {
      fetchData()
    }
  }, [dataArray.length])

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
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
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={8} md={8}>
              <Typography sx={typography.h1.title} color='#fff'>
                Payment
              </Typography>
              <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                <Link href='/' passHref>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    Home
                  </Typography>
                </Link>
                <Link href='/member/order/myoder/' passHref>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    my order
                  </Typography>
                </Link>
                <Typography sx={typography.subtitle1.title} color='#fff'>
                  Payment
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Hidden smDown>
              <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CreditCardIcon sx={{ fontSize: 50, color: '#fff' }} />
              </Grid>
            </Hidden>
          </Grid>
        </Card>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Total productData={productData} megaProductData={megaProductData} dataArray={dataArray} />

          {/* <Payment invoice_id={invoice_id} sub_id={sub_id} /> */}
        </Grid>
        <Grid item xs={12} md={8}>
          <TablePayment productData={productData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default withAuth(Indexpayment)
