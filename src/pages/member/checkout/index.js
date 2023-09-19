// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deepOrange } from '@mui/material/colors'
import { useState, useEffect } from 'react'
import Cardemail from './email'
import Shipping from './shipping'
import Deriverry from './deriverry'
import Paymant from './payment'
import Summary from './summary'

// ** axios imports
import axios from 'axios'

const Checkout = ({}) => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() // เรียกใช้งาน Router
  const { productName, price, quantity, selection, sub_id, product_id } = router.query // รับค่าข้อมูล จาก Router

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

  // const handleOrderClick = () => {
  //   alert('แตก')

  //   router.push(
  //     `order/?product_id=${product_id}&price=${price},&sub_id=${sub_id},&member_id=${userId},&selection=${selection}`
  //   )
  // }

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

    // console.log('Bill data', data)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.gen_invoice`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Send Data Success'
      })
      router.push(`/category`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4' fontSize='1.3rem' fontWeight='bold' sx={{ textAlign: 'center', mb: 2 }}>
            Checkout
          </Typography>
          <Typography variant='caption' sx={{ textAlign: 'center', mb: 2 }}>
            Shipping charges and discount codes applied at checkout.
          </Typography>
        </Box>
        <Grid container spacing={1} justifyContent='space-between'>
          <Grid item xs={12} md={7.5}>
            {/** Avatar, Change */}
            <Grid container spacing={0} alignItems='center' sx={{ p: '10px 8px 2px' }}>
              <Grid item>
                <Avatar src='/broken-image.jpg' />
              </Grid>
              <Grid item>
                <Typography>{name}</Typography>
              </Grid>
              {/* <Grid item xs={6} md={9.4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant='subtitle1' style={{ marginRight: '5px' }}>
                  <EditIcon />
                </Typography>
                <Typography>Change address</Typography>
              </Grid> */}
              <Cardemail userData={userData} />
            </Grid>
            <Grid container spacing={2} alignItems='center' sx={{ p: '10px 10px 2px' }}>
              <Grid item>
                <Typography variant='h5' sx={{ p: '5px 5px 5px' }}>
                  Shipping Details
                </Typography>
              </Grid>
              <Shipping productName={productName} price={price} quantity={quantity} parsedSelection={parsedSelection} />
            </Grid>
            {/* <Grid container spacing={2} alignItems='center' sx={{ p: '10px 10px 2px' }}>
              <Grid item>
                <Typography variant='h5' sx={{ p: '5px 7px 5px' }}>
                  Payment
                </Typography>
              </Grid>
              <Paymant />
            </Grid> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid item>
              <Typography variant='h6' sx={{ p: '20px 0px 5px', width: '100%' }}>
                summary
              </Typography>
            </Grid>
            <Summary
              price={price}
              quantity={quantity}
              Shipping_cost={Shipping_cost}
              tax={tax}
              discount={discount}
              total={total}
              Realtex={Realtex}
            />
          </Grid>
          <Grid container spacing={2} alignItems='center' sx={{ width: '96%', p: 2.5, marginTop: 3, marginLeft: 1 }}>
            <Box sx={{ width: '62%', display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleOrderClick}
                variant='contained'
                sx={{ bgcolor: 'red', width: '100%', p: '10px 10px 10px' }}
              >
                NEXT STEP
              </Button>
            </Box>
            <br />
            <Box sx={{ width: '62%', p: '10px 10px 10px', textAlign: 'center' }}>
              <Typography variant='subtitle2'>
                By clicking "Complete purchase", I confirm that I am aware and accept that I am obliged to pay for my
                order. I accept the Terms and Conditions and confirm that I have read the Privacy Policy.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Checkout
