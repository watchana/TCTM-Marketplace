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

const Payment = () => {
  const [status, setStatus] = React.useState('')
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์
  const [File, setFile] = useState(null) // เก็บค่า  File
  const [FileName, setFileName] = useState('') // เก็บค่าชื่อของ File

  const handleChange = event => {
    setStatus(event.target.value)
  }
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
            src='https://inex.co.th/home/wp-content/uploads/2022/11/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99-1.jpg'
            style={{ maxWidth: '40%', height: 'auto' }}
            alt='Payment Details'
          />
        </Grid>
      </Grid>
      <hr />
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
            <InputLabel id='demo-select-small-label'>Status</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={status}
              label='Status'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Completed</MenuItem>
              <MenuItem value={20}>Uncompleted</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant='subtitle1'>Tracking Number</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <TextField sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
          <Button variant='contained' sx={{ width: '100%' }}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Button variant='contained' sx={{ width: '100%' }}>
                  Upload Image
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                <label htmlFor='file-input'>
                <span>{selectedFileName || 'Select_Image_File '}</span>
                  <input
                    type='file'
                    accept='image/*'
                    id='file-input'
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </label>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Payment
