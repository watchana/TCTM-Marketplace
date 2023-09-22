// ** React Imports
import React from 'react'

// ** MUI Imports
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Grid,
  Radio,
  Stack,
  TextField,
  Typography,
  Card,
  Button,
  IconButton,
  Box
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import Paymant from './payment'
import { useState } from 'react'

//** axios Imort */
import axios from 'axios'

const Payment = ({ usertype, invoice_id, orderdata }) => {
  // ** Switch Alert Import
  const Swal = require('sweetalert2')

  // ตัวแปรควบคุม State
  const [isConfirmed, setIsConfirmed] = useState(false) // ควบคุมการกด submit ฟังก์ชัน handleInvoiceClick

  // console.log('555', orderdata)
  console.log('666', orderdata.invoice_file_name)

  const [status, setStatus] = React.useState('')
  const [Tracking, setTracking] = useState('') //Tracking Number set
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์
  const [File, setFile] = useState(null) // เก็บค่า  File
  const [FileName, setFileName] = useState('') // เก็บค่าชื่อของ File

  // ฟังก์ชัน อัปโหลดไฟล์
  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    setSelectedFileName(selectedFile ? selectedFile.name : '')

    // ใช้ Date เพื่อสร้างเวลาปัจจุบัน
    const currentTime = new Date()

    // ดึงชื่อไฟล์จาก selectedFile
    const fileName = selectedFile ? selectedFile.name : ''

    // แยกนามสกุลไฟล์ออกมา
    const fileExtension = fileName.split('.').pop()
    const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '')

    // รวมชื่อไฟล์และเวลาเข้าด้วยกัน
    const fileNameWithTime = `${currentTime.toISOString()}_${fileNameWithoutExtension}`
    const sanitizedFileName = fileNameWithTime.replace(/[^a-z0-9.]/gi, '_') // แทนที่อักขระที่ไม่ใช่ a-z, 0-9, หรือ . ด้วย "_"
    setFile(selectedFile)
    setFileName(`${sanitizedFileName}.${fileExtension}`) // ชื่อไฟล์ใหม่
  }

  // ฟังชัน Comfirm invoice
  const handleInvoiceClick = async e => {
    e.preventDefault()

    const data = {
      invoice_id: invoice_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.confirm_payment`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Confirm Data Success'
      })
      setIsConfirmed(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error'
      })
      console.log(error)
    }
  }

  // ฟังชันส่ง บิล และ รหัสส่งของ
  const handleReceiptSubmit = async e => {
    e.preventDefault()

    const data = {
      invoice_id: invoice_id,
      tracking_number: Tracking,
      receipt_file_name: FileName,
      invoice_owner_member_id: orderdata.member_id
    }

    console.log('Send Data', data)

    // ตรวจสอบค่าว่างใน TextField
    if (FileName === '' || Tracking === '') {
      Swal.fire({
        icon: 'error',
        title: 'Please fill in complete information.'
      })

      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.send_tracking`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Success'
      })

      // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
      const formData = new FormData()
      formData.append('file', File)
      formData.append('FileName', FileName)

      // ส่งไฟล์ไปยัง API
      try {
        const response = await axios.post(`/api/Receipt_Upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('response Api', response)
      } catch (error) {
        console.log(error)
      }

      // router.push(`/member/order/myoder/`)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังชันเก็บค่าตัวแปร Tracking
  const handleTracking = event => {
    setTracking(event.target.value)
  }

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '30px',
        padding: '15px 25px 20px',
        border: '2px solid #primary.main'
      }}
    >
      <Grid container spacing={3} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Payment Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={
              orderdata.invoice_file_name === null ||
              orderdata.invoice_file_name === undefined ||
              orderdata.invoice_file_name === '-'
                ? '/payment/Nodata/Nodata.jpg'
                : `/payment/${orderdata.invoice_file_name}`
            }
            style={{ maxWidth: '40%', height: 'auto' }}
            alt='Payment Details'
          />
        </Grid>
      </Grid>
      <hr />
      {usertype !== '1' && (
        <Grid container alignItems='center' spacing={3} rowSpacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant='subtitle1' sx={{ textAlign: 'start' }}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl
              sx={{ m: 1, minWidth: 120, width: '100%', display: 'flex', justifyContent: 'flex-end' }}
              size='small'
            >
              <Button
                variant='contained'
                onClick={handleInvoiceClick}
                disabled={orderdata.invoice_status !== '3' || isConfirmed}
              >
                Confirm
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant='subtitle1'>Tracking Number</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TextField sx={{ width: '100%' }} onChange={handleTracking} value={Tracking} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Button variant='contained' sx={{ width: '100%' }} onClick={handleReceiptSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <label htmlFor='file-input'>
                    <input type='file' id='file-input' style={{ display: 'none' }} onChange={handleFileUpload} />
                    <IconButton component='span' color='primary' aria-label='upload file' style={{ marginTop: '10px' }}>
                      <FileUploadIcon />
                    </IconButton>
                    <span style={{ textAlign: 'center' }}>{selectedFileName || 'Select a Receipt file'}</span>
                  </label>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Card>
  )
}

export default Payment
