// FormComponent.js
import React, { useState, useRef, forwardRef, useEffect } from 'react'

// ** Material UI Imports
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Divider,
  Box,
  Card,
  CardContent
} from '@mui/material'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import DownloadIcon from '@mui/icons-material/Download'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

// ** axios Imports
import axios from 'axios'
import { useRouter } from 'next/router'

import { useMediaQuery } from '@mui/material'

const MedalInformation = () => {
  const [data, setData] = useState([])

  const router = useRouter() // เรียกใช้งาน Router
  const { ser_id } = router.query
  const serID = ser_id

  useEffect(() => {
    console.log('data', data)
  }, [data])

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showallservice`, {
          params: {
            ser_id: serID
          }
        })

        setData(response.data.message.Data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [serID])

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <form>
      {/* -----------------information--------------- */}

      <Grid item Align='center'>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '80px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' },
                color: '#FFFFFF',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '12px'
              }}
            >
              Job Application
            </Typography>
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} mt={5} mb={5}>
        <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
          <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
            Personal information
          </Typography>
        </Paper>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography fontSize={20}>First Name</Typography>
          <TextField
            value={data.ser_fname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize={20}>Last Name</Typography>
          <TextField
            value={data.ser_lname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------อีเมล--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Email</Typography>
          <TextField
            value={data.ser_email}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------โทรศัพท์--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Phone</Typography>
          <TextField
            value={data.ser_phone}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------วันเกิด--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Date Of Birt</Typography>
          <TextField
            value={data.ser_dateofbirt ? data.ser_dateofbirt.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------อายุ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Age</Typography>
          <TextField
            value={data.ser_age}
            sx={{ maxWidth: 50 }}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ที่อยู่--------------- */}
        <Grid item xs={12} mt={5}>
          <Typography fontSize={20}>Address</Typography>
          <TextField
            value={data.ser_address}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ที่อยู่--------------- */}
        <Grid item xs={12} mt={5}>
          <Typography fontSize={20}>Address Line 2</Typography>
          <TextField
            value={data.ser_addressline2}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ประกันสังคม--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Social Security</Typography>
          <TextField
            value={data.ser_social_security}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------สถานะความเป็นอยู่--------------- */}
        <Grid item xs={8} mt={5}>
          <Typography fontSize={20}>Living Status</Typography>
          <TextField
            value={data.ser_livingstatus}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------เชื้อชาติ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Ethnicity</Typography>
          <TextField
            value={data.ser_ethnicity}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------สัญชาติ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Nationality</Typography>
          <TextField
            value={data.ser_nationality}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ศาสนา--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Religion</Typography>
          <TextField
            value={data.ser_religion}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------บัตรประชาชน--------------- */}
        <Grid item xs={3} mt={5}>
          <Typography fontSize={20}>Identity card no.</Typography>
          <TextField
            value={data.ser_idcard}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
            fullWidth
          />
        </Grid>
        {/* -----------------วันหมดอายุบัตร--------------- */}
        <Grid item xs={3} mt={5}>
          <Typography fontSize={20}>Expiration date</Typography>
          <TextField
            value={data.ser_expiration_date ? data.ser_expiration_date.substring(0, 10) : ''}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ส่วนสูง--------------- */}
        <Grid item xs={1.2} mt={5}>
          <Typography fontSize={20}>Height</Typography>
          <TextField
            value={data.ser_height}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------น้ำหนัก--------------- */}
        <Grid item xs={1.3} mt={5}>
          <Typography fontSize={20}>Weight</Typography>
          <TextField
            value={data.ser_weight}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------สถานะทางทหาร--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Military Status</Typography>
          <TextField
            value={data.ser_military_status}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------เพศ--------------- */}
        <Grid item xs={1} mt={5}>
          <Typography fontSize={20}>Gender</Typography>
          <TextField
            value={data.ser_gender}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------สถานภาพ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Marital status</Typography>
          <TextField
            value={data.ser_marital_status}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------วันที่จะเริ่มทำงาน--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Date Available</Typography>
          <TextField
            value={data.ser_dateavail ? data.ser_dateavail.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ตำแหน่งที่อยากทำ--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Position Applied For</Typography>
          <TextField
            value={data.ser_positionap}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------เงินเดือนที่ต้องการ--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Desired Pay</Typography>
          <TextField
            value={data.ser_desired_pay}
            fullWidth
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={1} mt={12.5}>
          <TextField
            value={data.ser_hour_salary}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------การจ้างงานที่ต้องการ--------------- */}
        <Grid item xs={2.5} mt={5}>
          <Typography fontSize={20}>Employment Desired</Typography>
          <TextField
            value={data.ser_employment_desired}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalInformation
