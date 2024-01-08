// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button, Card, Container, Grid, Hidden, Typography } from '@mui/material'

// ** Material-UI Icons Imports

// ** Material Design Icons Imports
import PaymentIcon from '@mui/icons-material/Payment'

// ** Custom Components
import CardEmail from './email'
import Shipping from './shipping'
import Summary from './summary'

// ** Axios Import
import axios from 'axios'

// ** Utils Imports
import { withAuth } from 'src/@core/utils/AuthCheck'

const Checkout = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // เรียกใช้งาน Router
  const { productName, price, quantity, selection, sub_id, product_id, FirstImage } = router.query // รับค่าข้อมูล จาก Router

  // ตัวแปรรับค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [userData, setUserData] = useState('') // ข้อมูล User
  const [name, setName] = useState('') // ข้อมูล Name

  // ตัวแปรเก็บค่าใช้จ่าย และส่วนลด
  const Shipping_cost = 50 // ค่าขนส่ง
  const tax = 12 / 100 // ภาษี
  const discount = 150 // ส่วนลด

  // คำนวณค่ารวม
  // ตัวแปรคำนวณค่าก่อนแสดง
  const RealPrice = price * quantity // ราคาสินค้า
  const Realtex = parseFloat((tax * RealPrice).toFixed(2))
  const total = RealPrice + Shipping_cost + Realtex - discount

  // ตัวแปรเก็บค่าตัวเลือก
  let parsedSelection = null

  if (selection && selection !== 'null' && selection !== 'undefined') {
    parsedSelection = JSON.parse(selection) // แปลงค่า selection เป็นออบเจ็กต์
  }

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    const nameFromLocalStorage = localStorage.getItem('name')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
      setName(nameFromLocalStorage)
    }
  }, [])

  // รับค่าข้อมูลจาก Api
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูล
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}TCTM.checkout.check_out_detail?member_id=${userId}`
        )
        setUserData(response.data.message.Data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userId])

  // ฟังชัน ย้ายไปหน้า order
  const handleOrderClick = async e => {
    e.preventDefault()

    const data = {
      po_id: '-',
      invoice_filename: '-',
      descritp_tion: '-',
      product_id: product_id,
      member_id: userId,
      sub_id: sub_id,
      type: 'product',
      option: parsedSelection,
      amount: quantity,
      total: total
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
                  Details
                </Typography>
                <Typography color='#fff' variant='h6' fontSize='14px'>
                  Shipping charges and discount codes applied at checkout.
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <PaymentIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <CardEmail userName={name} userData={userData} />
            <Shipping
              productName={productName}
              price={price}
              quantity={quantity}
              parsedSelection={parsedSelection}
              FirstImage={FirstImage}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Summary
              price={price}
              quantity={quantity}
              Shipping_cost={Shipping_cost}
              tax={tax}
              discount={discount}
              total={total}
              Realtex={Realtex}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                fullWidth
                variant='contained'
                onClick={handleOrderClick}
                sx={{
                  backgroundColor: '#2d2e81',
                  outline: '3px solid #2d2e81',
                  outlineOffset: '-2px',
                  transition: '400ms',
                  '&:text': {
                    color: '#fff',
                    transition: '400ms'
                  },
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#2d2e81',
                    transition: '400ms'
                  }
                }}
              >
                Add to cart
              </Button>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ marginTop: '10px' }}>
                By placing your order, you agree to TCTM's privacy notice and conditions of use.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default withAuth(Checkout)
