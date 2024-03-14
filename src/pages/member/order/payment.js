// ** React Imports
import { useState } from 'react'

//**  Next Import
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Divider, Typography, Card, CardContent, Button, Box } from '@mui/material'

// ** Material-UI Icons Imports
import IconButton from '@mui/material/IconButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'

//** axios Import
import axios from 'axios'

const Payment = ({ invoice_id, sub_id }) => {
  // ใช้งาน Router
  const router = useRouter() // use router

  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

  // ตัวแปรเก็บค่าข้อมูล
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

  // ฟังชัน Add img
  const handleImgSubmit = async e => {
    e.preventDefault()

    const data = {
      invoice_id: invoice_id,
      invoice_file_name: FileName,
      sub_id: sub_id
    }

    // ตรวจสอบค่าว่างใน TextField
    if (FileName === '') {
      SAlert.fire({
        icon: 'error',
        title: 'Please attach a proof of payment/transfer slip.'
      })

      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.invoice.send_proof`, data)
      // console.log(response)
      const RedirectStatus = response.data.message.RedirectStatus

      if (RedirectStatus === true) {
        SAlert.fire({
          icon: 'error',
          title: 'You have sent the receipt.'
        })
        router.push(`/`)
      } else {
        SAlert.fire({
          icon: 'success',
          title: 'Receipt Success.'
        })
      }

      // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
      const formData = new FormData()
      formData.append('file', File)
      formData.append('FileName', FileName)

      // ส่งไฟล์ไปยัง API
      try {
        const response = await axios.post(`/api/payment_FileUpload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        // console.log(error)
      }

      router.push(`/member/order/myoder/`)
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <Card variant='outlined' sx={{ width: '100%', boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6' sx={{ color: '#000' }}>
            Upload proof of money transfer
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <label htmlFor='file-input'>
            <input
              type='file'
              accept='image/*'
              id='file-input'
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <IconButton component='span' color='primary' aria-label='upload file'>
              <FileUploadIcon />
            </IconButton>
            <span>{selectedFileName || 'Select a PDF file'}</span>
          </label>
        </Box>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button fullWidth variant='contained' onClick={handleImgSubmit} color='primary'>
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Payment
