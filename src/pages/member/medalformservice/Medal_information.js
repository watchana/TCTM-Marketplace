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

const MedalInformation = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('data', data)
  }, [data])

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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showalluserservice`, {
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

  return (
    <form>
      {/* -----------------information--------------- */}

      <Grid item Align='center'>
        <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399', width: 500 }}>
          <Typography
            textAlign={'center'}
            variant='h5'
            sx={{ mb: 10, fontSize: 40, fontWeight: 'bold', color: 'white' }}
          >
            Job Application
          </Typography>
        </Paper>
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
            value={data.name}
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
          <TextField name='email' placeholder='Email' fullWidth />
        </Grid>
        {/* -----------------โทรศัพท์--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Phone</Typography>
          <TextField
            name='phone'
            placeholder='XXX-XXX-XXXX'
            type='tel'
            inputProps={{
              pattern: '[0-9]*',
              maxLength: 10
            }}
            fullWidth
          />
        </Grid>
        {/* -----------------วันเกิด--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Date Of Birt</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref2.current.dateofbirt = date)} />
          </LocalizationProvider>
        </Grid>
        {/* -----------------อายุ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Age</Typography>
          <TextField name='age' placeholder='Age' sx={{ maxWidth: 70 }} />
        </Grid>
        {/* -----------------ที่อยู่--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>Address</Typography>
          <TextField name='address' placeholder='Address' fullWidth />
        </Grid>
        {/* -----------------ที่อยู่--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>Address Line 2</Typography>
          <TextField name='addressline2' placeholder='Address Line 2' fullWidth />
        </Grid>
        {/* -----------------ประกันสังคม--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Social Security</Typography>
          <TextField name='social_security' placeholder='Social Security' fullWidth />
        </Grid>
        {/* -----------------สถานะความเป็นอยู่--------------- */}
        <Grid item xs={8} mt={5}>
          <Typography fontSize={20}>Living Status</Typography>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='livingStatus'>
              <FormControlLabel
                value='Living With Parent'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Living With Parent'
              />
              <FormControlLabel
                value='Own Home'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Own Home'
              />
              <FormControlLabel
                value='Hired House'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Hired House'
              />
              <FormControlLabel
                value='Hiredflat/Hotel'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Hiredflat/Hotel'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* -----------------เชื้อชาติ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Ethnicity</Typography>
          <TextField name='ethnicity' placeholder='Ethnicity' fullWidth />
        </Grid>
        {/* -----------------สัญชาติ--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Nationality</Typography>
          <TextField name='nationality' placeholder='Nationality' fullWidth />
        </Grid>
        {/* -----------------ศาสนา--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Religion</Typography>
          <TextField name='religion' placeholder='Religion' fullWidth />
        </Grid>
        {/* -----------------บัตรประชาชน--------------- */}
        <Grid item xs={3} mt={5}>
          <Typography fontSize={20}>Identity card no.</Typography>
          <TextField name='idcard' placeholder='XXXXXXXXXXXXX' fullWidth />
        </Grid>
        {/* -----------------วันหมดอายุบัตร--------------- */}
        <Grid item xs={3} mt={5}>
          <Typography fontSize={20}>Expiration date</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref2.current.expiration_date = date)} />
          </LocalizationProvider>
        </Grid>
        {/* -----------------ส่วนสูง--------------- */}
        <Grid item xs={1.2} mt={5}>
          <Typography fontSize={20}>Height</Typography>
          <TextField name='height' placeholder='Height Cm.' sx={{ maxWidth: 130 }} />
        </Grid>
        {/* -----------------น้ำหนัก--------------- */}
        <Grid item xs={1.3} mt={5}>
          <Typography fontSize={20}>Weight</Typography>
          <TextField name='weight' placeholder='Weight Kgs.' sx={{ maxWidth: 130 }} />
        </Grid>
        {/* -----------------สถานะทางทหาร--------------- */}
        <Grid item xs={5} mt={5} ml={8}>
          <Typography fontSize={20}>Military Status</Typography>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='military_status'>
              <FormControlLabel
                value='Exempted'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Exempted'
              />
              <FormControlLabel
                value='Served'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Served'
              />
              <FormControlLabel
                value='Not yet served'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Not yet served'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* -----------------เพศ--------------- */}
        <Grid item xs={3} mt={5}>
          <Typography fontSize={20}>Gender</Typography>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='gender'>
              <FormControlLabel
                value='Male'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Male'
              />
              <FormControlLabel
                value='Female'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Female'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* -----------------สถานภาพ--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>Marital status</Typography>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='marital_status'>
              <FormControlLabel
                value='Single'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Single'
              />
              <FormControlLabel
                value='married'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Married'
              />
              <FormControlLabel
                value='Widowed'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Widowed'
              />
              <FormControlLabel
                value='Separated'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Separated'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* -----------------วันที่จะเริ่มทำงาน--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Date Available</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref2.current.dateavail = date)} />
          </LocalizationProvider>
        </Grid>
        {/* -----------------ตำแหน่งที่อยากทำ--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Position Applied For</Typography>
          <TextField name='positionap' placeholder='Position Applied For' fullWidth />
        </Grid>
        {/* -----------------เงินเดือนที่ต้องการ--------------- */}
        <Grid item xs={4} mt={5}>
          <Typography fontSize={20}>Desired Pay</Typography>
          <TextField
            name='desired_pay'
            placeholder='desired pay'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={3} mt={13}>
          <FormControl>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='hour_salary'>
              <FormControlLabel
                value='hour'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Hour'
              />
              <FormControlLabel
                value='salary'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                label='Salary'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* -----------------การจ้างงานที่ต้องการ--------------- */}
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20}>Employment Desired</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='employment_desired'>
            <FormControlLabel
              value='Full-Time'
              control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
              label='Full-Time'
            />
            <FormControlLabel
              value='Past-Time'
              control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
              label='Past-Time'
            />
            <FormControlLabel
              value='Seasonal'
              control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
              label='Seasonal'
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalInformation
