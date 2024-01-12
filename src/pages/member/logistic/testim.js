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

// ** Switch Alert Import
const Swal = require('sweetalert2')

// ** axios Imports
import axios from 'axios'

// ** import form view
import TestshowwinV from 'src/views/supplier/testshowinV'

const testim = () => {
  // ** Hook
  const router = useRouter()

  // รับค่าตัวแปร

  // ตัวแปรเช็คสถานะการส่งข้อมูล
  const [isSubmitted, setIsSubmitted] = useState(false)

  // เก็บค่าเซฟรูป
  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])
  const [imageChange, setImageChange] = useState({})

  useEffect(() => {
    const imageNames = uploadImages.map(image => image.name)

    // ตรวจสอบว่าค่า imageNames ไม่เหมือนกับค่าปัจจุบันของ imagesName ก่อนที่จะเรียก setImagesName
    if (JSON.stringify(imageNames) !== JSON.stringify(imagesName)) {
      setImagesName(imageNames)
    }
  }, [uploadImages, imagesName])

  // จัดการตัวแปรชื่อไฟล์ภาพ
  const handleUploadImagesChange = newImages => {
    setUploadImages(newImages)

    const imageFileNames = newImages.map(image => image.name)

    setImageChange(imageFileNames)
  }

  // Api ฟังชันอัปโหลดรูปภาพ
  const uploadImagesToApi = () => {
    return axios.post(`/api/post_img`, uploadImages, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // ฟังชันส่งข้อมูล Register
  const handleSubmitData = async event => {
    event.preventDefault()
    setIsSubmitted(true)

    try {
      const data = {
        image_file_infname: imageChange
      }

      console.log('data', data)

      await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.inf_imgV2`, data)

      uploadImagesToApi()
        .then(response => {
          const statusCode = response.status
          if (statusCode === 200) {
            // อัปโหลดสำเร็จ
            console.log('File uploaded successfully.')
          } else {
            // อัปโหลดไม่สำเร็จ
            console.error('File upload failed.')
          }
        })
        .catch(error => {
          console.error('Error:', error)
        })

      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'กรุณารอ การยืนยันจาก TCTM'
      })
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Log in ล้มเหลว...',
        text: 'มีข้อผิดพลาดในการเรียก API'
      })
    }
  }

  return (
    <Box sx={{ bgcolor: '#ebf3fe' }}>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1, borderRadius: '34px' }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 2)} !important` }}>
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <TestshowwinV onUploadImagesChange={handleUploadImagesChange} />
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

export default testim
