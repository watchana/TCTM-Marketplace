// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'

// ** Switch Alert Import
const Swal = require('sweetalert2')

// ** axios Imports
import axios from 'axios'

const Dashboard = () => {
  // รับค่าตัวแปร
  const [storename, setStoreName] = useState('') // ตัวแปรเก็บค่า storename
  const [email, setEmail] = useState('') // ตัวแปรเก็บค่า email
  const [tel, setTel] = useState('') // ตัวแปรเก็บค่า Tel Store details
  const [storedetails, setStoreDetails] = useState('') // ตัวแปรเก็บค่า Store details
  const [idcard, setIdCard] = useState('') // ตัวแปรเก็บค่า Id Card
  const [address, setAddress] = useState('') // ตัวแปรเก็บค่า ที่อยู่

  // ตัวแปรเช็คสถานะการส่งข้อมูล
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ฟังก์ชันบัณทึกค่าของ storename
  const handleStoreNameSet = event => {
    setStoreName(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ email
  const handleEmailSet = event => {
    setEmail(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ Tel
  const handleTelSet = event => {
    setTel(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ StoreDetails
  const handleStoreDetailsSet = event => {
    setStoreDetails(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ IdCard
  const handleIdCardSet = event => {
    setIdCard(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ Address
  const handleAddressSet = event => {
    setAddress(event.target.value)
  }

  const handleSubmitData = event => {
    event.preventDefault()
    setIsSubmitted(true)

    // ตรวจสอบค่าว่างก่อนส่ง
    const fieldsToCheck = [idcard, tel, email, storename, storedetails, address]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง'
      })

      return
    }

    const data = {
      sub_bank_number: idcard,
      sub_tel: tel,
      sub_email: email,
      sub_name: storename,
      sub_description: storedetails,
      sub_address: address,
      sub_address_shop: '1',
      sub_address_claim: '1',
      member_id: 'MEM-2' // Id คน login
    }

    console.log('ข้อมูลที่ส่งไป Server', data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.register.registerMarket`, data)
      .then(response => {
        console.log(response.data)
        Swal.fire({
          icon: 'success',
          title: 'ส่งข้อมูลสำเร็จ',
          text: 'กรุณารอ การยืนยันจาก TCTM'
        })
      })
      .catch(error => {
        console.error(error)
        Swal.fire({
          icon: 'error',
          title: 'Log in ล้มเหลว...',
          text: 'มีข้อผิดพลาดในการเรียก API'
        })
      })
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        <Typography variant='h5'>Maker Regis System</Typography>
      </Box>
      <Divider sx={{ marginY: 6 }} />
      <Box>
        {/* ชื่อร้านค้า */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Store Name</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  size='small'
                  label='Enter Store Name'
                  value={storename}
                  onChange={handleStoreNameSet}
                  error={storename === '' && isSubmitted}
                  helperText={storename === '' && isSubmitted ? 'Please enter your Store Name.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Email */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Email</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  size='small'
                  label='Enter Email'
                  value={email}
                  onChange={handleEmailSet}
                  error={email === '' && isSubmitted}
                  helperText={email === '' && isSubmitted ? 'Please enter your email.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Tel */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Tel</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  size='small'
                  label='Enter Tel'
                  value={tel}
                  onChange={handleTelSet}
                  error={tel === '' && isSubmitted}
                  helperText={tel === '' && isSubmitted ? 'Please enter your tel.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* รายละเอียดร้าน */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Store details</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size='small'
                  label='Enter Details'
                  value={storedetails}
                  onChange={handleStoreDetailsSet}
                  error={storedetails === '' && isSubmitted}
                  helperText={storedetails === '' && isSubmitted ? 'Please enter your storedetails.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider sx={{ marginY: 6 }} />
      <Box sx={{ width: '100%', marginBottom: 4 }}>
        <Typography variant='h5'>Address</Typography>
      </Box>
      <Box>
        {/* บัญชีธนาคาร */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Address on ID card *</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  size='small'
                  label='Address on ID card *'
                  value={idcard}
                  onChange={handleIdCardSet}
                  error={idcard === '' && isSubmitted}
                  helperText={idcard === '' && isSubmitted ? 'Please enter your idcard.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ข้อมูลที่อยู่ */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Grid container>
            <Grid item md={4}>
              <Typography variant='body1'>Address Information *</Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ width: '50%' }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  size='small'
                  label='Address Information *'
                  value={address}
                  onChange={handleAddressSet}
                  error={address === '' && isSubmitted}
                  helperText={address === '' && isSubmitted ? 'Please enter your address.' : ''}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          sx={{ marginTop: 7 }}
          onClick={handleSubmitData}
        >
          Sign up
        </Button>
      </Box>
    </Container>
  )
}

export default Dashboard
