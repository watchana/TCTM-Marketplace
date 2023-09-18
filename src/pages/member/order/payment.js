import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FileUploadIcon from '@mui/icons-material/FileUpload'

//** axios Import
import axios from 'axios'

const Payment = () => {
  // ตัวแปรเก็บค่าข้อมูล
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์
  const [File, setFile] = useState(null) // เก็บค่า  File
  const [FileName, setFileName] = useState('') // เก็บค่าชื่อของ File

  // console.log('File', File)
  // console.log('FileName', FileName)
  // console.log('selectedFileName', selectedFileName)

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

    // const data = {
    //   po_id: '-',
    //   invoice_filename: recipient,
    //   descritp_tion: '-',
    //   product_id: poFileName,
    //   member_id: poFileName,
    //   sub_id: poFileName,
    //   type: 'product',
    //   option: 'product'
    // }

    // console.log("data",data);

    // try {
    //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.addnew_po`, data)
    //   console.log(response)
    //   handleClose()
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Approve Success'
    //   })

    //   // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
    //   const formData = new FormData()
    //   formData.append('file', File)
    //   formData.append('FileName', FileName)

    //   // ส่งไฟล์ไปยัง API
    //   try {
    //     const response = await axios.post(`/api/payment_FileUpload`, formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     console.log('response Api', response)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <Card>
      <CardContent>
        <div
          style={{
            marginTop: '5px',
            marginLeft: '15px',
            marginRight: '15px',
            marginRight: '5px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant='subtitle1' gutterBottom>
            แสดงหลักฐานการโอนเงิน
          </Typography>
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
          <br />
          {/* {selectedFile && (
            <Box mt={2}>
              <Typography variant='body1'>{selectedFile.name}</Typography>
            </Box>
          )} */}
          <Button variant='contained' color='primary' mt={2} onClick={handleImgSubmit}>
            อัพโหลด
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Payment
