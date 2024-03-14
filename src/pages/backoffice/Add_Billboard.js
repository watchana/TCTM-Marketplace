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

import InfoIcon from '@mui/icons-material/Info'

// ** Switch Alert Import
const Swal = require('sweetalert2')

// ** axios Imports
import axios from 'axios'

// ** import form view
import Addbillbord from 'src/views/backoffice/add-billbord'
import { Hidden } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

// Responsive image
import { useMediaQuery } from '@mui/material'

const AddBillboard = () => {
  // ** Hook
  const router = useRouter()
  const theme = useTheme()

  // ตัวแปรเช็คสถานะการส่งข้อมูล
  const [isSubmitted, setIsSubmitted] = useState(false)

  // เก็บค่าเซฟรูป
  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])
  const [imageChange, setImageChange] = useState({})

  const [postname, setPostname] = useState('') // ตัวแปรเก็บค่า storename
  const [postdetail, setPostdetail] = useState('') // ตัวแปรเก็บค่า email

  const handlePostname = event => {
    setPostname(event.target.value)
  }

  const handlePostdetail = event => {
    setPostdetail(event.target.value)
  }

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
    const timestamp = new Date().toISOString().slice(0, 17).replace(/[-T:]/g, '')

    const newImageFiles = newImages.map(image => {
      const newFileName = `${timestamp}_${image.name}`

      return new File([image], newFileName)
    })

    setImageChange(newImageFiles.map(image => image.name))
  }

  // Api ฟังชันอัปโหลดรูปภาพ
  const uploadImagesToApi = () => {
    return axios.post(`/api/Billboard_File`, uploadImages, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // ฟังชันส่งข้อมูล Register
  const handleSubmitData = async event => {
    event.preventDefault()
    setIsSubmitted(true)

    // const sub_id = localStorage.getItem('sub_id')

    const fieldsToCheck = [imageChange]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลให้ครบทุกช่อง'
      })

      return
    }

    try {
      const data = {
        bill_name: imageChange
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.backoffice.home_page.add_billboards`, data)

      uploadImagesToApi()
        .then(response => {
          const statusCode = response.status
          if (statusCode === 200) {
            // อัปโหลดสำเร็จ
            // console.log('File uploaded successfully.')
            router.reload(6)
          } else {
            // อัปโหลดไม่สำเร็จ
            // console.error('File upload failed.')
          }
        })
        .catch(error => {
          console.error('Error:', error)
        })

      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'ส่งข้อมูลเสร็จสิ้น'
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

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            height: isSmallScreen ? '70px' : '90px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: theme.palette.primary.dark,
            border: '1px solid #primary.main'
          }}
        >
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={10} md={8}>
              <Typography sx={typography.h1.title} color='#fff'>
                Management
              </Typography>
              <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                <Link href='/' passHref>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Home
                  </Typography>
                </Link>
                <Link href='/backoffice/' passHref>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Back office
                  </Typography>
                </Link>
                <Typography color='#fff' variant='h6' fontSize='14px'>
                  Add Billboard
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={3} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <InfoIcon sx={{ fontSize: 50, color: '#fff' }} />
              </Grid>
            </Hidden>
          </Grid>
        </Card>
      </Box>
      <Box sx={{ bgcolor: '#ebf3fe' }}>
        <Box className='content-center'>
          <Card sx={{ zIndex: 1, borderRadius: '7px' }}>
            <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 2)} !important` }}>
              <Box sx={{ width: '100%', marginBottom: 4 }}>
                <Addbillbord onUploadImagesChange={handleUploadImagesChange} />
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
                FINISH
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default AddBillboard
