import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'
import Total from './total'
import Payment from './payment'
import Tablepayment from './TablePayment'

//**  Next Import
import { useRouter } from 'next/router'

//** Axios Import
import axios from 'axios'

const OrderReq = () => {
  // ใช้งาน Router
  const router = useRouter() // use router
  const { sub_id, invoice_id } = router.query

  // ตัวแปรเก็บค่าข้อมูล
  const [productdata, setProductData] = useState('') // ข้อมูล ธนาคาร
  const [megaProductdata, setMegaProductData] = useState('') // ข้อมูล สินค้า

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
    <Container>
      <Box>
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
              <Tablepayment productdata={productdata} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default OrderReq
