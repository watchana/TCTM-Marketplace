// ** React Imports
import React from 'react'

// ** MUI Imports
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  TextField,
  Typography,
  Card,
  Button,
  IconButton,
  Box
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DownloadIcon from '@mui/icons-material/Download'

import Paymant from './payment'
import { useState } from 'react'
import TrackStatus from 'src/pages/member/order/statusthaipost'

//** axios Imort */
import axios from 'axios'
import { useEffect } from 'react'

const Payment = ({ usertype, invoice_id, orderdata, receipt }) => {
  // ** Switch Alert Import
  const Swal = require('sweetalert2')

  // ตัวแปรควบคุม State
  const [isConfirmed, setIsConfirmed] = useState(false) // ควบคุมการกด submit ฟังก์ชัน handleInvoiceClick

  // console.log('555', orderdata)
  // console.log('666', orderdata.invoice_file_name)
  const [selectDelivery, setselectDelivery] = useState('') // State to track the selected value

  const handleChange = event => {
    setselectDelivery(event.target.value) // Update the selected value when an option is chosen
  }

  const [Tracking, setTracking] = useState('') //Tracking Number set
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์
  const [File, setFile] = useState(null) // เก็บค่า  File
  const [FileName, setFileName] = useState('') // เก็บค่าชื่อของ File
  const [Tonen, setTonen] = useState('')

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
  useEffect(() => {
    const fetchData = async () => {
      if (!invoice_id) {
        // console.error('invoice is undefined ro null')

        return
      }
      try {
        const Response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id
          }
        })
        setTonen(Response.data.message.Data[0].process_status)
        setTracking(Response.data.message.Data[0].tracking_number)
        setselectDelivery(Response.data.message.Data[0].tracking_name)
        setFileName(Response.data.message.Data[0].invoice_file_name)
      } catch (error) {}
    }
    fetchData()
  }, [invoice_id])

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
      window.location.reload()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error'
      })
      console.error(error)
    }
  }

  // ฟังชันส่ง บิล และ รหัสส่งของ
  const handleReceiptSubmit = async e => {
    e.preventDefault()

    const data = {
      invoice_id: invoice_id,
      tracking_number: Tracking,
      tracking_name: selectDelivery,
      receipt_file_name: FileName,
      invoice_owner_member_id: orderdata.member_id,
      process_status: Tonen
    }


    // ตรวจสอบค่าว่างใน TextField
    if (FileName === '' || Tracking === '' || selectDelivery === '') {
      Swal.fire({
        icon: 'error',
        title: 'Please fill in complete information.'
      })

      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.send_tracking`, data)

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
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    }
    Swal.fire({
      icon: 'success',
      title: 'Confirm Data Success'
    })
  }

  // ฟังชันเก็บค่าตัวแปร Tracking
  const handleTracking = event => {
    setTracking(event.target.value)
  }

  const handleTonen = event => {
    setTonen(event.target.value)
  }

  // ฟังชัน download ใบเสร็จ
  const handleDownload = async FileName => {
    const fileName = FileName

    console.log('fileName', fileName)

    try {
      const downloadResponse = await fetch('/api/receipt_FileDownload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName }),
        responseType: 'blob' // Indicate that the response should be treated as binary data
      })

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob()
        const blobUrl = URL.createObjectURL(blob)

        // Create a download link and initiate the download
        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = fileName
        downloadLink.click()

        // Clean up the object URL after the download is initiated
        URL.revokeObjectURL(blobUrl)

        console.log('Download initiated')
      } else {
        console.error('Error downloading document:', downloadResponse.statusText)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
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
        {/* <iframe
          src='/receipt/2024_01_08T09_21_30.235Z_pdfTimetable_365811940016.pdf'
          width='100%'
          height='100%'
          allow='autoplay'
        ></iframe> */}

        <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='subtitle1' sx={{ textAlign: 'start' }}>
            {' '}
            Stripe Payment Gateway{' '}
          </Typography>
        </Grid>
      </Grid>
      <hr />
      {usertype !== '1' && (
        <Grid container alignItems='center' spacing={3} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Management
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant='subtitle1'>Status</Typography>
          </Grid>

          <Grid item xs={12} sm={9} md={9}>
            <Box display={'flex'}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>Select Delivery</InputLabel>
                <Select value={selectDelivery} onChange={handleChange}>
                  <MenuItem value=''>Select Delivery</MenuItem>
                  <MenuItem value='Kerry'>Kerry</MenuItem>
                  <MenuItem value='Flash'>Flash</MenuItem>
                  <MenuItem value='ThaiPost'>ThaiPost</MenuItem>
                </Select>
              </FormControl>
            </Box>
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
          <Grid item xs={12} sm={12} md={12}>
            <TextField sx={{ width: '100%' }} onChange={handleTracking} value={Tracking} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant='subtitle1'>Send Work Order</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField sx={{ width: '100%' }} onChange={handleTonen} value={Tonen} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Button
              variant='contained'
              sx={{ width: '100%' }}
              onClick={handleReceiptSubmit}
              disabled={orderdata.invoice_status !== '4'}
            >
              Submit
            </Button>
          </Grid>
          <Grid container display={'flex'} justifyContent={'flex-end'} flexDirection={'column'}>
            <Grid item xs={6} display={'flex'} justifyContent={'center'}>
              <label htmlFor='file-input'>
                <input
                  type='file'
                  id='file-input'
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}

                  // accept='.pdf'
                />

                <IconButton component='span' color='primary' aria-label='upload file'>
                  <FileUploadIcon />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
              <span style={{ textAlign: 'center' }}>{selectedFileName || 'Select a Receipt file (PDF only)'}</span>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant='subtitle1' sx={{ textAlign: 'start' }}>
              Tracking Status
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TrackStatus TrackNo={orderdata.tracking_number} />
          </Grid>
        </Grid>
      )}

      {usertype !== '2' && (
        <Grid container alignItems='center' spacing={3} rowSpacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Tracking Number
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='subtitle1' sx={{ textAlign: 'start' }}>
              {orderdata.tracking_number || 'Wait payment'}
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Tracking Status
                </Typography>
              </Grid>
            </Typography>
            <TrackStatus TrackNo={orderdata.tracking_number} />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Receipt Download
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant='subtitle1' sx={{ textAlign: 'start' }}>
              <Button
                variant='outlined'
                onClick={() => handleDownload(receipt)}
                startIcon={<DownloadIcon />}
                disabled={!receipt}
              >
                Download
              </Button>
            </Typography>
          </Grid>
        </Grid>
      )}
    </Card>
  )
}

export default Payment
