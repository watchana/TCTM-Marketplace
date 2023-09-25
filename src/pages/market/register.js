// ** React Imports
import { React, useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CardContent from '@mui/material/CardContent'
import CloudUpload from 'mdi-material-ui/CloudUpload'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Switch Alert Import
const Swal = require('sweetalert2')

// ** axios Imports
import axios from 'axios'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const RegisterSupplier = () => {
  // ** Hook
  const router = useRouter()

  // รับค่าตัวแปร
  const [storename, setStoreName] = useState('') // ตัวแปรเก็บค่า storename
  const [email, setEmail] = useState('') // ตัวแปรเก็บค่า email
  const [tel, setTel] = useState('') // ตัวแปรเก็บค่า Tel Store details
  const [storedetails, setStoreDetails] = useState('') // ตัวแปรเก็บค่า Store details
  const [idcard, setIdCard] = useState('') // ตัวแปรเก็บค่า Id Card
  const [address, setAddress] = useState('') // ตัวแปรเก็บค่า ที่อยู่

  const [bankname, setBankName] = useState('') // ตัวแปรเก็บค่า ชื่อธนาคาร
  const [bookbankname, setBookBankName] = useState('') // ตัวแปรเก็บค่า ชื่อหน้าสมุดธนาคาร
  const [paypalname, setpaypalName] = useState('') // ตัวแปรเก็บค่า ชื่อ paypal
  const [paypalnumber, setPaypalNumber] = useState('') // ตัวแปรเก็บค่าเลข paypal

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

  // ฟังก์ชันบัณทึกค่าของ BankName
  const handleBankNameSet = event => {
    setBankName(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ BookBankName
  const handleBookBankNameSet = event => {
    setBookBankName(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ paypalName
  const handlepaypalNameSet = event => {
    setpaypalName(event.target.value)
  }

  // ฟังก์ชันบัณทึกค่าของ PaypalNumber
  const handlePaypalNumberSet = event => {
    setPaypalNumber(event.target.value)
  }

  // ฟังชันส่งข้อมูล Register
  const handleSubmitData = async event => {
    event.preventDefault()
    setIsSubmitted(true)

    const member_id = localStorage.getItem('Member_Id')

    const fieldsToCheck = [
      idcard,
      tel,
      email,
      storename,
      storedetails,
      address,
      imageName,
      member_id,
      bankname,
      bookbankname,
      paypalname,
      paypalnumber
    ]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง'
      })

      return
    }

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('/api/StoreimgUpload', formData)

      const data = {
        sub_bank_number: idcard,
        sub_tel: tel,
        sub_email: email,
        sub_name: storename,
        sub_description: storedetails,
        sub_address: address,
        sub_address_shop: '1',
        sub_address_claim: '1',
        member_id: member_id,
        sub_image: imageName,
        sub_bank_name: bankname,
        sub_book_bank_name: bookbankname,
        sub_pay_name: paypalname,
        sub_pay_number: paypalnumber
      }

      // console.log('data', data)

      await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.register.registerMarket`, data)

      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'กรุณารอ การยืนยันจาก TCTM'
      })

      router.push('/')
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Log in ล้มเหลว...',
        text: 'มีข้อผิดพลาดในการเรียก API'
      })
    }
  }

  // ฟังชันอัปโหลดรูปภาพ
  const [image, setImage] = useState(null) // ตัวแปรเก็บข้อมูลรูปภาพ
  const [imageName, setImageName] = useState(null) // ตัวแปรเก็บข้อมูลรูปภาพ

  const handleImageChange = event => {
    setImage(event.target.files[0])

    const file = event.target.files[0]
    if (file) {
      const fileName = file.name // ชื่อไฟล์
      setImageName(fileName) //ชื่อและนามสกุลไฟล์
    }
  }

  return (
    <Box sx={{ bgcolor: '#FFF8F9' }}>
      <Box>
        <Box sx={{ width: '100%', marginTop: '15px', marginLeft: '15px' }}>
          <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
            <Link underline='none' color='inherit' href='/'>
              <Typography variant='body2'>Home</Typography>
            </Link>
            <Link underline='none' color='inherit'>
              <Typography variant='body2'>Register</Typography>
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>

      <Box className='content-center'>
        <Card sx={{ zIndex: 1, borderRadius: '34px' }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 2)} !important` }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant='h6'
                color='#FE8C8C'
                sx={{
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                Maker Register
              </Typography>
            </Box>
            <Divider sx={{ marginTop: 3, color: '#FE8C8C' }}>Store</Divider>
            {/* ชื่อร้านค้า */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Store Name
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
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
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Email
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
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
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Tel
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
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
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Store details
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
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
            <Divider sx={{ marginY: 6, color: '#FE8C8C' }}>Address</Divider>
            {/* บัญชีธนาคาร */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Address on ID card *
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
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
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Address Information *
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
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
            <Divider sx={{ marginY: 6, color: '#FE8C8C' }}>Bank Detail</Divider>
            {/* ชื่อธนาคารธนาคาร */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Bank Name
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Bank Name *'
                      value={bankname}
                      onChange={handleBankNameSet}
                      error={bankname === '' && isSubmitted}
                      helperText={bankname === '' && isSubmitted ? 'Please enter your bank name.' : ''}
                    ></TextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* ชื่อคนหน้าสมุด */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Book Bank Name
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Book Bank Name *'
                      value={bookbankname}
                      onChange={handleBookBankNameSet}
                      error={bookbankname === '' && isSubmitted}
                      helperText={bookbankname === '' && isSubmitted ? 'Please enter your book bank name.' : ''}
                    ></TextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* ชื่อ paypal */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    paypal Name
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Paypal *'
                      value={paypalname}
                      onChange={handlepaypalNameSet}
                      error={paypalname === '' && isSubmitted}
                      helperText={paypalname === '' && isSubmitted ? 'Please enter your paypal.' : ''}
                    ></TextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* เลข paypal */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Grid container>
                <Grid item md={4}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    Paypal Number
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Paypal *'
                      value={paypalnumber}
                      onChange={handlePaypalNumberSet}
                      error={paypalnumber === '' && isSubmitted}
                      helperText={paypalnumber === '' && isSubmitted ? 'Please enter your paypal number.' : ''}
                    ></TextField>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* อัปโหลดรูปภาพร้านค้า */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Divider sx={{ marginY: 6, color: '#FE8C8C' }}>Upload Store Image</Divider>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='upload-image'
                type='file'
                onChange={handleImageChange}
              />

              <label htmlFor='upload-image'>
                <Button
                  fullWidth
                  variant='outlined'
                  component='span'
                  startIcon={<CloudUpload />}
                  sx={{ marginBottom: 2 }}
                >
                  Upload Image
                </Button>
              </label>

              {image && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={URL.createObjectURL(image)}
                    alt='Uploaded Preview'
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                </Box>
              )}
            </Box>
            <Divider sx={{ marginY: 6 }} />
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginBottom: 3 }}
              onClick={handleSubmitData}
            >
              Sign up
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
RegisterSupplier.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterSupplier
