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
import TestshowwinV from 'src/views/information/RegisInfo'
import { Hidden } from '@mui/material'
import { ChevronRight } from 'mdi-material-ui'

const AddInformationPage = () => {
  // ** Hook
  const router = useRouter()

  const { sub_id } = router.query
  const SubId = sub_id

  useEffect(() => {
    console.log('sub_id', sub_id)
  }, [sub_id])

  // รับค่าตัวแปร

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

    const imageFileNames = newImages.map(image => image.name)

    setImageChange(imageFileNames)
  }

  // Api ฟังชันอัปโหลดรูปภาพ
  const uploadImagesToApi = () => {
    return axios.post(`/api/Infor_FileUpload`, uploadImages, {
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

    const fieldsToCheck = [postname, postdetail, sub_id]
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
        sub_id: SubId,
        image_file_infname: imageChange,
        post_name: postname,
        post_detail: postdetail,
        inf_id: 'INFPOST-12'
      }
      console.log('data', data)

      await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.inf_imgV2`, data)
      router.reload()

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

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <Card
          sx={{
            height: '100px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: '#2d2e81',
            border: '1px solid #primary.main'
          }}
        >
          <Grid container alignItems='center'>
            <Grid item xs={12} sm={10} md={8}>
              <Typography variant='h4' fontSize='21px bold' color='#fff'>
                Management
              </Typography>
              <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                <Link href='/' passHref>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Home
                  </Typography>
                </Link>
                <Link href='/market/' passHref>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Market Management
                  </Typography>
                </Link>
                <Typography color='#fff' variant='h6' fontSize='14px'>
                  Create information
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Hidden mdDown>
              <Grid item xs={3} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <InfoIcon sx={{ fontSize: 72, color: '#fff' }} />
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
                <TestshowwinV onUploadImagesChange={handleUploadImagesChange} />
              </Box>

              <Divider sx={{ marginY: 6 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Title Information'
                    id='Title Information'
                    multiline
                    rows={4}
                    variant='outlined'
                    onChange={handlePostname}
                    value={postname}
                    error={postname === '' && isSubmitted}
                    helperText={postname === '' && isSubmitted ? 'Please enter your Store Name.' : ''}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Detail Information'
                    id='Detail Information'
                    multiline
                    rows={10}
                    variant='outlined'
                    value={postdetail}
                    onChange={handlePostdetail}
                    error={postdetail === '' && isSubmitted}
                    helperText={postdetail === '' && isSubmitted ? 'Please enter your Store Name.' : ''}
                  />
                </Grid>
              </Grid>
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

<<<<<<< HEAD
export default Testim
=======
export default AddInformationPage
>>>>>>> 439f3df833374d5484027a68e8771b67cd0bf887
