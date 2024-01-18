// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container, Breadcrumbs, Grid, Hidden, Typography, Card, CardContent, Button, Box } from '@mui/material'

// ** Material-UI Icons Imports
import CreditCardIcon from '@mui/icons-material/CreditCard'

// ** Material Design Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Component Imports
import Payment from './payment'
import TablePayment from './tablepayment'

//** Axios Import
import axios from 'axios'

const OrderReq = () => {
  // ใช้งาน Router
  const router = useRouter() // use router
  const { sub_id, invoice_id } = router.query

  // ตัวแปรเก็บค่าข้อมูล
  const [productData, setProductData] = useState('') // ข้อมูล ธนาคาร
  // const [megaProductdata, setMegaProductData] = useState('') // ข้อมูล สินค้า

  // console.log('invoice_id', invoice_id)

  // เก็บค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.checkout.market_number_bank`, {
          params: {
            sub_id: sub_id,
            invoice_id: invoice_id
          }
        })

        // console.log('Api', response.data.message.Invoice[0])
        setProductData(response.data.message.Data[0])
        setMegaProductData(response.data.message.Invoice[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [sub_id, invoice_id])

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
                  Payment
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px' sx={{ cursor: 'pointer' }}>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/member/order/myoder/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px' sx={{ cursor: 'pointer' }}>
                      my order
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Payment
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CreditCardIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Payment invoice_id={invoice_id} sub_id={sub_id} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '100%' }}>
              <TablePayment productData={productData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default OrderReq
