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

// ** import form view
import TestshowwinV from '/src/views/supplier/testshowinV'

const Testim1 = () => {
  // ** Hook
  const router = useRouter()

  // รับค่าตัวแปร

  // ตัวแปรเช็คสถานะการส่งข้อมูล
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ฟังชันส่งข้อมูล Register
  const handleSubmitData = async event => {
    event.preventDefault()
    setIsSubmitted(true)

    const formData = new FormData()
    formData.append('image', image)

    try {
      const response = await axios.post('/api/resumeFile', formData)

      const data = {
        ser_fname: '',
        ser_lname: '',
        ser_email: '',
        ser_phone: '',
        ser_dateofbirt: '',
        ser_age: '',
        ser_address: '',
        ser_addressline2: '',
        ser_social_security: '',
        ser_livingstatus: '',
        ser_ethnicity: '',
        ser_nationality: '',
        ser_idcard: '',
        ser_expiration_date: '',
        ser_height: '',
        ser_weight: '',
        ser_military_status: '',
        ser_gender: '',
        ser_marital_status: '',
        ser_dateavail: '',
        ser_positionap: '',
        ser_desired_pay: '',
        ser_hour_salary: '',
        ser_employment_desired: '',
        ser_father_firstname: '',
        ser_father_lastname: '',
        ser_father_occ: '',
        ser_father_age: '',
        ser_mother_firstname: '',
        ser_mother_lastname: '',
        ser_mother_age: '',
        ser_mother_occ: '',
        ser_wifeorhusband_fname: '',
        ser_wifeorhusband_lname: '',
        ser_wifeorhusband_age: '',
        ser_wifeorhusband_occ: '',
        ser_numofchildren: '',
        ser_elementary_level: '',
        ser_city_state_ele: '',
        ser_dateelement_start: '',
        ser_dateelement_end: '',
        ser_graduate_element: '',
        ser_middle_school: '',
        ser_city_state_md: '',
        ser_mddate_start: '',
        ser_mddate_end: '',
        ser_graduate_md: '',
        ser_hight_school: '',
        ser_city_state_h: '',
        ser_hidate_start: '',
        ser_hidate_end: '',
        ser_graduate_hight: '',
        ser_high_voc: '',
        ser_city_state_hv: '',
        ser_hvdate_start: '',
        ser_hvdate_end: '',
        ser_graduate_high_voc: '',
        ser_college: '',
        ser_city_state_co: '',
        ser_collegedate_start: '',
        ser_collegedate_end: '',
        ser_graduate_college: '',
        ser_speak_thai: '',
        ser_write_thai: '',
        ser_read_thai: '',
        ser_speak_eng: '',
        ser_write_eng: '',
        ser_read_eng: '',
        ser_speak_japan: '',
        ser_write_japan: '',
        ser_read_japan: '',
        ser_speak_china: '',
        ser_write_china: '',
        ser_read_china: '',
        ser_typing_yn: '',
        ser_typing_thaiwords: '',
        ser_typing_engwords: '',
        ser_com_yn: '',
        ser_mention_com: '',
        ser_driving_yn: '',
        ser_dlicense_no: '',
        ser_office_machine: '',
        ser_knowledge_mention: '',
        ser_imagedata: '5555',
        ser_filedame: imageName
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.service.addservice`, data)

      Swal.fire({
        icon: 'success',
        title: 'ส่งข้อมูลสำเร็จ',
        text: 'กรุณารอ การยืนยันจาก Digital2day'
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
  // เก็บค่าเซฟรูป
  const [uploadImages, setUploadImages] = useState([])
  const [imagesName, setImagesName] = useState([])

  const handleImageChange = event => {
    setImage(event.target.files[0])

    const file = event.target.files[0]
    if (file) {
      const fileName = file.name // ชื่อไฟล์
      setImageName(fileName) //ชื่อและนามสกุลไฟล์
    }
  }

  return (
    <Box sx={{ bgcolor: '#ebf3fe' }}>
      <Box className='content-center'>
        <Card sx={{ zIndex: 1, borderRadius: '34px' }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(7, 9, 2)} !important` }}>
            {/* อัปโหลดรูปภาพร้านค้า */}
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              <Divider sx={{ marginY: 6, color: '#3A46A7' }}>Upload Store Image</Divider>
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

            <Box sx={{ width: '100%', marginBottom: 4 }}></Box>
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

export default Testim1
