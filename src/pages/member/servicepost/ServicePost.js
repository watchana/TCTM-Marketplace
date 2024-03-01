// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button, Dialog, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'

//** import component */
import AddserviceIMG from 'src/views/AddServiceimg'

// ** Axios import
import axios from 'axios'

const ServicePo = ({ open, handleClose }) => {
  const Route = useRouter()

  const handleClick = () => {
    // ทำการเด้งไปหน้าอื่น ในที่นี้เราเด้งไปที่หน้า '/otherpage'
    Route.push('/member/servicepost')
  }

  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])

  // เก็บค่าเซฟวิดิโอ
  const [uploadVdo, setUploadVdo] = useState([])

  const [member_id, setMemberId] = useState(null)

  useEffect(() => {
    const storedMemberId = localStorage.getItem('Member_Id')

    // กำหนดค่า member_id ใน state
    setMemberId(storedMemberId)
  }, [])

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
  }

  // จัดการตัวแปรชื่อไฟล์วิดิโอ
  const handleUploadVdoChange = newVdo => {
    if (newVdo[0].name) {
      setUploadVdo(newVdo)
    }
  }

  // ตัวแปรเก็บค่าข้อมูล
  const [title, setTitle] = useState('') // ข้อมูล title
  const [description, setDescription] = useState('') // ข้อมูล description

  // เซตค่า title และ description เมื่อ open มีการเปลี่ยนแปลง
  useEffect(() => {
    if (open) {
      setTitle('')
      setDescription('')
    }
  }, [open])

  // ฟังชันเก็บค่าข้อมูล
  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDesChange = event => {
    setDescription(event.target.value)
  }

  // ฟังก์ชัน Insert Data
  const handleInsertSubmit = async e => {
    e.preventDefault()

    try {
      const datafile = {
        uploadImages,
        uploadVdo
      }

      const response = await axios.post(`/api/ServicePostAPI`, datafile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const uploadedFileNames = response.data.uploadedFileNames // ดึงค่า uploadedFileNames จาก response

      // ตรวจสอบค่าว่างใน TextField
      if (!title || !description) {
        handleClose()
        SAlert.fire({
          icon: 'error',
          title: 'You did not fill in all the information...',
          text: 'Please fill in all the information.!'
        })

        return
      }

      const data = {
        user_id: member_id,
        ser_req_header: title,
        ser_req_description: description,
        ser_req_image_file: uploadedFileNames
      }

      axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.post_ser_requirement`, data).then(response => {
        // reset display หลังจากส่งข้อมูลเสร็จ
        Route.replace(Route.asPath, undefined, { scroll: false })
        SAlert.fire({
          icon: 'success',
          title: 'The information has been completed. Please wait for confirmation.'
        })
      })
    } catch (error) {
      console.error(error)
      SAlert.fire({
        icon: 'error',
        title: 'Log in Fail...',
        text: 'Some Thing Went Wrong On API'
      })
    }
  }

  return (
    <div>
      <Card variant='outlined' fullWidth>
        <CardContent>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Create Post
          </Typography>
          <Divider sx={{ marginY: '10px' }} />
          <form onSubmit={handleInsertSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Title'
                  value={title}
                  onChange={handleTitleChange}
                  variant='outlined'
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={description}
                  onChange={handleDesChange}
                  label='Description'
                  variant='outlined'
                  InputProps={{
                    style: {
                      borderRadius: '10px'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AddserviceIMG
                  onUploadImagesChange={handleUploadImagesChange}
                  onUploadVdoChange={handleUploadVdoChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={handleInsertSubmit}
                    sx={{ marginRight: 2 }}
                  >
                    POST
                  </Button>
                  <Button variant='contained' color='secondary' onClick={handleClick}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServicePo
