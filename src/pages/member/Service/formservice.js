// ** React Imports
import React, { useState } from 'react'
import html2canvas from 'html2canvas'

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

// ** dynamicform import
import DynamicForm from './testform'
import Family from './family'

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import axios from 'axios'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

// ตัวแปรเก็บค่าข้อมูล
const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    // ตัวแปรประวัติส่วนตัว

    name: '',
    lname: '',
    email: '',
    phone: '',
    dateofbirt: dayjs(),
    age: '',
    address: '',
    addressline2: '',
    social_security: '',
    livingStatus: '',
    ethnicity: '',
    nationality: '',
    idcard: '',
    expiration_date: dayjs(),
    height: '',
    weight: '',
    military_status: '',
    gender: '',
    marital_status: '',
    dateavail: dayjs(),
    positionap: '',
    desired_pay: '',
    hour_salary: '',
    employment_desired: '',

    // ประวัติครอบครัว

    father_firstname: '',
    father_lastname: '',
    father_occ: '',
    father_Age: '',
    mother_firstname: '',
    mother_lastname: '',
    mother_age: '',
    mother_occ: '',
    wifeorhusband_fname: '',
    wifeorhusband_lname: '',
    wifeorhusband_age: '',
    wifeorhusband_occ: '',
    numofChildren: '',

    // การศึกษา

    elementary_level: '',
    city_state_ele: '',
    dateelement_start: dayjs(),
    dateelement_end: dayjs(),
    Graduate_Element: '',
    middle_school: '',
    city_state_md: '',
    mddate_start: dayjs(),
    mddate_end: dayjs(),
    Graduate_md: '',
    hight_School: '',
    city_state_h: '',
    hidate_start: dayjs(),
    hidate_end: dayjs(),
    graduate_hight: '',
    high_voc: '',
    city_state_hv: '',
    hvdate_start: dayjs(),
    hvdate_end: dayjs(),
    graduate_high_voc: '',
    college: '',
    city_state_co: '',
    collegedate_start: dayjs(),
    collegedate_end: dayjs(),
    graduate_college: '',

    // ทักษะด้านภาษา

    speak_thai: '',
    write_thai: '',
    read_thai: '',
    speak_eng: '',
    write_eng: '',
    read_eng: '',
    speak_japan: '',
    write_japan: '',
    read_japan: '',
    speak_china: '',
    write_china: '',
    read_china: '',

    // ความสามารถพิเศษ

    typing_yn: '',
    typing_thaiwords: '',
    typing_engwords: '',
    com_yn: '',
    mention_com: '',
    driving_yn: '',
    dlicense_no: '',
    office_machine: '',
    knowledge_mention: '',

    resume: null,
    resumeName: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = e => {
    const selectedFile = e.target.files[0]
    setFormData({
      ...formData,
      resume: selectedFile,
      resumeName: selectedFile ? selectedFile.name : '' // ชื่อไฟล์
    })
  }

  // แปลงค่าวันเกิด user ก่อนส่ง ส่ง
  let formattedDate = ''
  if (formData.dateofbirt) {
    formattedDate = dayjs(formData.dateofbirt).format('MM/DD/YYYY')
  }

  // แปลงค่าวันเกิด user ก่อนส่ง ส่ง
  let formatexpiration_date = ''
  if (formData.expiration_date) {
    formatexpiration_date = dayjs(formData.expiration_date).format('MM/DD/YYYY')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitted(true)
    window.location.href = '/'
  }

  const dataapi = {
    ser_name: formData.name,
    ser_lname: formData.lname,
    ser_email: formData.email,
    ser_phone: formData.phone,
    ser_dateofbirt: formData.dateofbirt,
    ser_age: formData.age,
    ser_address: formData.address,
    ser_addressline2: formData.addressline2,
    ser_social_security: formData.social_security,
    ser_livingStatus: formData.livingStatus,
    ser_ethnicity: formData.ethnicity,
    ser_nationality: formData.nationality,
    ser_idcard: formData.idcard,
    ser_expiration_date: formData.expiration_date,
    ser_height: formData.height,
    ser_weight: formData.weight,
    ser_military_status: formData.military_status,
    ser_gender: formData.gender,
    ser_marital_status: formData.marital_status,
    ser_dateavail: formData.dateavail,
    ser_positionap: formData.positionap,
    ser_desired_pay: formData.desired_pay,
    ser_hour_salary: formData.hour_salary,
    ser_employment_desired: formData.employment_desired,
    ser_father_firstname: formData.father_firstname,
    ser_father_lastname: formData.father_lastname,
    ser_father_occ: formData.father_occ,
    ser_father_Age: formData.father_Age,
    ser_mother_firstname: formData.mother_firstname,
    ser_mother_lastname: formData.mother_lastname,
    ser_mother_age: formData.mother_age,
    ser_mother_occ: formData.mother_occ,
    ser_wifeorhusband_fname: formData.wifeorhusband_fname,
    ser_wifeorhusband_lname: formData.wifeorhusband_lname,
    ser_wifeorhusband_age: formData.wifeorhusband_age,
    ser_wifeorhusband_occ: formData.wifeorhusband_occ,
    ser_numofChildren: formData.numofChildren,
    ser_elementary_level: formData.elementary_level,
    ser_city_state_ele: formData.city_state_ele,
    ser_dateelement_start: formData.dateelement_start,
    ser_dateelement_end: formData.dateelement_end,
    ser_Graduate_Element: formData.Graduate_Element,
    ser_middle_school: formData.middle_school,
    ser_city_state_md: formData.city_state_md,
    ser_mddate_start: formData.mddate_start,
    ser_mddate_end: formData.mddate_end,
    ser_Graduate_md: formData.Graduate_md,
    ser_hight_School: formData.hight_School,
    ser_city_state_h: formData.city_state_h,
    ser_hidate_start: formData.hidate_start,
    ser_hidate_end: formData.hidate_end,
    ser_graduate_hight: formData.graduate_hight,
    ser_high_voc: formData.high_voc,
    ser_city_state_hv: formData.city_state_hv,
    ser_hvdate_start: formData.hvdate_start,
    ser_hvdate_end: formData.hvdate_end,
    ser_graduate_high_voc: formData.college,
    ser_college: formData.graduate_high_voc,
    ser_city_state_co: formData.city_state_co,
    ser_collegedate_start: formData.collegedate_start,
    ser_collegedate_end: formData.collegedate_end,
    ser_graduate_college: formData.graduate_college,
    ser_speak_thai: formData.speak_thai,
    ser_write_thai: formData.write_thai,
    ser_read_thai: formData.read_thai,
    ser_speak_eng: formData.speak_eng,
    ser_write_eng: formData.write_eng,
    ser_read_eng: formData.read_eng,
    ser_speak_japan: formData.speak_japan,
    ser_write_japan: formData.write_japan,
    ser_read_japan: formData.read_japan,
    ser_speak_china: formData.speak_china,
    ser_write_china: formData.write_china,
    ser_read_china: formData.read_china,
    ser_typing_yn: formData.typing_yn,
    ser_typing_thaiwords: formData.typing_thaiwords,
    ser_typing_engwords: formData.typing_engwords,
    ser_com_yn: formData.com_yn,
    ser_mention_com: formData.mention_com,
    ser_driving_yn: formData.driving_yn,
    ser_dlicense_no: formData.dlicense_no,
    ser_office_machine: formData.office_machine,
    ser_knowledge_mention: formData.knowledge_mention
  }

  if (isSubmitted) {
    axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.service.addservice`, dataapi).catch(error => {
      console.error(error)
      SAlert.fire({
        icon: 'error',
        title: 'Log in failed...',
        text: 'Error calling API'
      })
    })
  }

  const handleDownloadClick = () => {
    // ตัวอย่างการเข้าถึง element ที่มี ID เพื่อแปลงเป็นภาพ
    const element = document.getElementById('form-to-image')

    // สร้างภาพจาก element ด้วย html2canvas
    html2canvas(element).then(canvas => {
      // แปลง canvas เป็น URL ของรูปภาพ
      const imgData = canvas.toDataURL('image/png')

      // สร้าง element <a> เพื่อดาวน์โหลดภาพ
      const link = document.createElement('a')
      link.download = 'application_form.png'
      link.href = imgData
      link.click()
    })
  }

  return (
    <Grid container id='form-to-image' sx={{ px: { xs: 12, sm: 12, md: 12, lg: 24 } }}>
      <Paper elevation={3} style={{ padding: '60px' }}>
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography fontSize={20}>First Name</Typography>
              <TextField name='name' placeholder='Name' fullWidth value={formData.name} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <Typography fontSize={20}>Last Name</Typography>
              <TextField
                name='lname'
                placeholder='Last Name'
                fullWidth
                value={formData.lname}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------อีเมล--------------- */}
            <Grid item xs={4} mt={5}>
              <Typography fontSize={20}>Email</Typography>
              <TextField name='email' placeholder='Email' fullWidth value={formData.email} onChange={handleChange} />
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
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------วันเกิด--------------- */}
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Date Of Birt</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.dateofbirt} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, dateofbirt: date })} // อัปเดต dateOfBirth ใน formData
                />
              </LocalizationProvider>
            </Grid>
            {/* -----------------อายุ--------------- */}
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Age</Typography>
              <TextField
                name='age'
                placeholder='Age'
                sx={{ maxWidth: 70 }}
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------ที่อยู่--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>Address</Typography>
              <TextField
                name='address'
                placeholder='Address'
                fullWidth
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------ที่อยู่--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>Address Line 2</Typography>
              <TextField
                name='addressline2'
                placeholder='Address Line 2'
                fullWidth
                value={formData.addressline2}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------ประกันสังคม--------------- */}
            <Grid item xs={4} mt={5}>
              <Typography fontSize={20}>Social Security</Typography>
              <TextField
                name='social_security'
                placeholder='Social Security'
                fullWidth
                value={formData.social_security}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------สถานะความเป็นอยู่--------------- */}
            <Grid item xs={8} mt={5}>
              <Typography fontSize={20}>Living Status</Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='livingStatus'
                  value={formData.livingStatus}
                  onChange={handleChange}
                >
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
              <TextField
                name='ethnicity'
                placeholder='Ethnicity'
                fullWidth
                value={formData.ethnicity}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------สัญชาติ--------------- */}
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Nationality</Typography>
              <TextField
                name='nationality'
                placeholder='Nationality'
                fullWidth
                value={formData.nationality}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------ศาสนา--------------- */}
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Religion</Typography>
              <TextField
                name='religion'
                placeholder='Religion'
                fullWidth
                value={formData.religion}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------บัตรประชาชน--------------- */}
            <Grid item xs={3} mt={5}>
              <Typography fontSize={20}>Identity card no.</Typography>
              <TextField
                name='idcard'
                placeholder='XXXXXXXXXXXXX'
                fullWidth
                value={formData.idcard}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------วันหมดอายุบัตร--------------- */}
            <Grid item xs={3} mt={5}>
              <Typography fontSize={20}>Expiration date</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.expiration_date} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, expiration_date: date })} // อัปเดต dateOfBirth ใน formData
                />
              </LocalizationProvider>
            </Grid>
            {/* -----------------ส่วนสูง--------------- */}
            <Grid item xs={1.2} mt={5}>
              <Typography fontSize={20}>Height</Typography>
              <TextField
                name='height'
                placeholder='Height Cm.'
                sx={{ maxWidth: 130 }}
                value={formData.height}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------น้ำหนัก--------------- */}
            <Grid item xs={1.3} mt={5}>
              <Typography fontSize={20}>Weight</Typography>
              <TextField
                name='weight'
                placeholder='Weight Kgs.'
                sx={{ maxWidth: 130 }}
                value={formData.weight}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------สถานะทางทหาร--------------- */}
            <Grid item xs={5} mt={5} ml={8}>
              <Typography fontSize={20}>Military Status</Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='military_status'
                  value={formData.military_status}
                  onChange={handleChange}
                >
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
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                >
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
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='marital_status'
                  value={formData.marital_status}
                  onChange={handleChange}
                >
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
                <DatePicker
                  value={formData.dateavail} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, dateavail: date })}
                />
              </LocalizationProvider>
            </Grid>
            {/* -----------------ตำแหน่งที่อยากทำ--------------- */}
            <Grid item xs={4} mt={5}>
              <Typography fontSize={20}>Position Applied For</Typography>
              <TextField
                name='positionap'
                placeholder='Position Applied For'
                fullWidth
                value={formData.positionap}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------เงินเดือนที่ต้องการ--------------- */}
            <Grid item xs={4} mt={5}>
              <Typography fontSize={20}>Desired Pay</Typography>
              <TextField
                name='desired_pay'
                placeholder='desired pay'
                fullWidth
                value={formData.desired_pay}
                onChange={handleChange}
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
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='hour_salary'
                  value={formData.hour_salary}
                  onChange={handleChange}
                >
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
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='employment_desired'
                value={formData.employment_desired}
                onChange={handleChange}
              >
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
            {/* -----------------ประวัติครอบครัว--------------- */}
            <Grid item xs={12} mt={5}>
              <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
                  Family Information
                </Typography>
              </Paper>
            </Grid>
            {/* ----------------ชื่อพ่อ---------------- */}
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20} fontWeight={'bold'}>
                Father/Firstname
              </Typography>
              <TextField
                name='father_firstname'
                placeholder='Firstname'
                fullWidth
                value={formData.father_firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20}>Last Name</Typography>
              <TextField
                name='father_lastname'
                placeholder='Last Name'
                fullWidth
                value={formData.father_lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Age</Typography>
              <TextField
                name='father_Age'
                placeholder='Age'
                sx={{ maxWidth: 70 }}
                value={formData.father_Age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5} mr={50}>
              <Typography fontSize={20}>Occupation</Typography>
              <TextField
                name='father_occ'
                placeholder='Occupation'
                fullWidth
                value={formData.father_occ}
                onChange={handleChange}
              />
            </Grid>
            {/* ----------------ชื่อแม่---------------- */}
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20} fontWeight={'bold'}>
                Mother/Firstname
              </Typography>
              <TextField
                name='mother_firstname'
                placeholder='Firstname'
                fullWidth
                value={formData.mother_firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20}>Last Name</Typography>
              <TextField
                name='mother_lastname'
                placeholder='Last Name'
                fullWidth
                value={formData.mother_lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Age</Typography>
              <TextField
                name='mother_age'
                placeholder='Age'
                sx={{ maxWidth: 70 }}
                value={formData.mother_age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5} mr={50}>
              <Typography fontSize={20}>Occupation</Typography>
              <TextField
                name='mother_occ'
                placeholder='Occupation'
                fullWidth
                value={formData.mother_occ}
                onChange={handleChange}
              />
            </Grid>
            {/* ----------------ชื่อสามีหรือภรรยา---------------- */}
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20} fontWeight={'bold'}>
                Name of wife or Husband
              </Typography>
              <TextField
                name='wifeorhusband_fname'
                placeholder='Firstname'
                fullWidth
                value={formData.wifeorhusband_fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20}>Last Name</Typography>
              <TextField
                name='wifeorhusband_lname'
                placeholder='Last Name'
                fullWidth
                value={formData.wifeorhusband_lname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>Age</Typography>
              <TextField
                name='wifeorhusband_age'
                placeholder='Age'
                sx={{ maxWidth: 70 }}
                value={formData.wifeorhusband_age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} mt={5}>
              <Typography fontSize={20}>Occupation</Typography>
              <TextField
                name='wifeorhusband_occ'
                placeholder='Occupation'
                fullWidth
                value={formData.wifeorhusband_occ}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3} mt={5} mr={50}>
              <Typography fontSize={20}>Number of Children</Typography>
              <TextField
                name='numofChildren'
                placeholder='Number of Children'
                sx={{ maxWidth: 190 }}
                value={formData.numofChildren}
                onChange={handleChange}
              />
            </Grid>

            {/* -----------------หัวข้อการศึกษา--------------- */}
            <Grid item xs={12} mt={5}>
              <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
                  Education
                </Typography>
              </Paper>
            </Grid>
            {/* -----------------ประถม--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontWeight={'bold'} fontSize={20}>
                Elementary Level
              </Typography>
              <TextField
                name='elementary_level'
                placeholder='Elementary Level'
                fullWidth
                value={formData.elementary_level}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>City/State</Typography>
              <TextField
                name='city_state_ele'
                placeholder='CityState'
                fullWidth
                value={formData.city_state_ele}
                onChange={handleChange}
              />
            </Grid>
            {/* -----------------วันเริ่ม--------------- */}
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.dateelement_start} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, dateelement_start: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.dateelement_end} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, dateelement_end: date })}
                />
              </LocalizationProvider>
            </Grid>
            {/* -----------------วันจบ--------------- */}
            <Grid item xs={2} mt={5} ml={5}>
              <Typography fontSize={20}>Graduate ?</Typography>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='Graduate_Element'
                value={formData.Graduate_Element}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='yes'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='Yes'
                />
                <FormControlLabel
                  value='no'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='No'
                />
              </RadioGroup>
            </Grid>
            {/* -----------------มัธยมต้น--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontWeight={'bold'} fontSize={20}>
                Middle School
              </Typography>
              <TextField
                name='middle_school'
                placeholder='Middle School'
                fullWidth
                value={formData.middle_school}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>City/State</Typography>
              <TextField
                name='city_state_md'
                placeholder='City/State'
                fullWidth
                value={formData.city_state_md}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.mddate_start}
                  onChange={date => setFormData({ ...formData, mddate_start: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.mddate_end}
                  onChange={date => setFormData({ ...formData, mddate_end: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5} ml={5}>
              <Typography fontSize={20}>Graduate ?</Typography>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='Graduate_md'
                value={formData.Graduate_md}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='yes'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='Yes'
                />
                <FormControlLabel
                  value='no'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='No'
                />
              </RadioGroup>
            </Grid>
            {/* -----------------มัธยมปลาย--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontWeight={'bold'} fontSize={20}>
                Hight School/Cert. Of Voc.Ed.
              </Typography>
              <TextField
                name='hight_School'
                placeholder='Hight School/Cert. Of Voc.Ed.'
                fullWidth
                value={formData.hight_School}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>City/State</Typography>
              <TextField
                name='city_state_h'
                placeholder='City/State'
                fullWidth
                value={formData.city_state_h}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.hidate_start} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, hidate_start: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.hidate_end} // ใช้ค่าจาก formData
                  onChange={date => setFormData({ ...formData, hidate_end: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5} ml={5}>
              <Typography fontSize={20}>Graduate ?</Typography>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='graduate_hight'
                value={formData.graduate_hight}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='yes'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='Yes'
                />
                <FormControlLabel
                  value='no'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='No'
                />
              </RadioGroup>
            </Grid>
            {/* -----------------ปวส--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontWeight={'bold'} fontSize={20}>
                High Voc. Cert.
              </Typography>
              <TextField
                name='high_voc'
                placeholder='High Voc. Cert.'
                fullWidth
                value={formData.high_voc}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>City/State</Typography>
              <TextField
                name='city_state_hv'
                placeholder='City/State'
                fullWidth
                value={formData.city_state_hv}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.hvdate_start}
                  onChange={date => setFormData({ ...formData, hvdate_start: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.hvdate_end}
                  onChange={date => setFormData({ ...formData, hvdate_end: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5} ml={5}>
              <Typography fontSize={20}>Graduate ?</Typography>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='graduate_high_voc'
                value={formData.graduate_high_voc}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='yes'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='Yes'
                />
                <FormControlLabel
                  value='no'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='No'
                />
              </RadioGroup>
            </Grid>
            {/* -----------------มหาลัย--------------- */}
            <Grid item xs={6} mt={5}>
              <Typography fontWeight={'bold'} fontSize={20}>
                College
              </Typography>
              <TextField
                name='college'
                placeholder='College'
                fullWidth
                value={formData.college}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} mt={5}>
              <Typography fontSize={20}>City/State</Typography>
              <TextField
                name='city_state_co'
                placeholder='City/State'
                fullWidth
                value={formData.city_state_co}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>From</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.collegedate_start}
                  onChange={date => setFormData({ ...formData, collegedate_start: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5}>
              <Typography fontSize={20}>To</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={formData.collegedate_end}
                  onChange={date => setFormData({ ...formData, collegedate_end: date })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} mt={5} ml={5}>
              <Typography fontSize={20}>Graduate ?</Typography>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='graduate_college'
                value={formData.graduate_college}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='yes'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='Yes'
                />
                <FormControlLabel
                  value='no'
                  control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                  label='No'
                />
              </RadioGroup>
            </Grid>
            {/* -----------------Working Experience In Chronological--------------- */}
            <Grid item xs={12} mt={5}>
              <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
                  Working Experience In Chronological
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <DynamicForm />
            </Grid>

            {/* -----------------Language Ability--------------- */}
            <Grid container>
              <Grid item xs={12} mt={5}>
                <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                  <Typography
                    textAlign={'center'}
                    variant='h5'
                    sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}
                  >
                    Language Ability
                  </Typography>
                </Paper>
              </Grid>
              <Grid container ml={10}>
                {/* -----------------Thai--------------- */}
                <Grid item xs={1} mt={10} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography textAlign={'center'} fontSize={20}>
                      Thai
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Speaking</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='speak_thai'
                    value={formData.speak_thai}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Writing</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='write_thai'
                    value={formData.write_thai}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Reading</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='read_thai'
                    value={formData.read_thai}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                {/* -----------------Eng--------------- */}
                <Grid item xs={1} mt={10} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography textAlign={'center'} fontSize={20}>
                      English
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Speaking</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='speak_eng'
                    value={formData.speak_eng}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Writing</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='write_eng'
                    value={formData.write_eng}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Reading</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='read_eng'
                    value={formData.read_eng}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>
                {/* -----------------japan--------------- */}
                <Grid item xs={1} mt={10} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography textAlign={'center'} fontSize={20}>
                      Japan
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Speaking</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='speak_japan'
                    value={formData.speak_japan}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Writing</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='write_japan'
                    value={formData.write_japan}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Reading</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='read_japan'
                    value={formData.read_japan}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>
                {/* -----------------china--------------- */}
                <Grid item xs={1} mt={10} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography textAlign={'center'} fontSize={20}>
                      China
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Speaking</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='speak_china'
                    value={formData.speak_china}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Writing</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='write_china'
                    value={formData.write_china}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={3} mt={5} mr={10}>
                  <Paper
                    elevation={1}
                    sx={{
                      bgcolor: '#DDE9F5',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Typography fontSize={20}>Reading</Typography>
                  </Paper>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='read_china'
                    value={formData.read_china}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='good'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Good'
                    />
                    <FormControlLabel
                      value='fair'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Fair'
                    />
                    <FormControlLabel
                      value='poor'
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                      label='Poor'
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

            {/* -----------------Special Ability--------------- */}
            <Grid item xs={12} mt={5}>
              <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
                  Special Ability
                </Typography>
              </Paper>
            </Grid>
            {/* -----------------Typing--------------- */}
            <Grid container spacing={2} ml={10}>
              <Grid item xs={2} mt={5}>
                <Typography fontSize={20}>Typing</Typography>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='typing_yn'
                  value={formData.typing_yn}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='No'
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={2} mt={5}>
                <Typography fontSize={20}>Thai Words/Min.</Typography>
                <TextField
                  name='typing_thaiwords'
                  placeholder='Thai Words/Min.'
                  fullWidth
                  value={formData.typing_thaiwords}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={2.3} mt={5} mr={90}>
                <Typography fontSize={20}>English Words/Min.</Typography>
                <TextField
                  name='typing_engwords'
                  placeholder='English Words/Min.'
                  fullWidth
                  value={formData.typing_engwords}
                  onChange={handleChange}
                />
              </Grid>
              {/* -----------------computer--------------- */}
              <Grid item xs={2} mt={5}>
                <Typography fontSize={20}>computer</Typography>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='com_yn'
                  value={formData.com_yn}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='No'
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6} mt={5} mr={50}>
                <Typography fontSize={20}>Please Mention</Typography>
                <TextField
                  name='mention_com'
                  placeholder='Please Mention'
                  fullWidth
                  value={formData.mention_com}
                  onChange={handleChange}
                />
              </Grid>
              {/* -----------------Driving--------------- */}
              <Grid item xs={2} mt={5}>
                <Typography fontSize={20}>Driving</Typography>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='driving_yn'
                  value={formData.driving_yn}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }} />}
                    label='No'
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6} mt={5}>
                <Typography fontSize={20}>Driving License No.</Typography>
                <TextField
                  name='dlicense_no'
                  placeholder='Driving License No.'
                  fullWidth
                  value={formData.dlicense_no}
                  onChange={handleChange}
                />
              </Grid>
              {/* -----------------Office Machine--------------- */}
              <Grid item xs={8} mt={5}>
                <Typography fontSize={20}>Office Machine</Typography>
                <TextField
                  name='office_machine'
                  placeholder='Office Machine'
                  fullWidth
                  value={formData.office_machine}
                  onChange={handleChange}
                />
              </Grid>
              {/* -----------------Special knowledge Please Mention--------------- */}
              <Grid item xs={8} mt={5}>
                <Typography fontSize={20}>Special knowledge Please Mention</Typography>
                <TextField
                  name='knowledge_mention'
                  placeholder='Special knowledge Please Mention'
                  fullWidth
                  value={formData.knowledge_mention}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* -----------------Resume--------------- */}
            <Grid item xs={12} mt={5}>
              <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
                <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
                  Resume
                </Typography>
              </Paper>
            </Grid>

            {/* -----------------อัพโหลด--------------- */}
            <Grid container xs={12} mt={5}>
              <Grid item textAlign={'center'} xs={12} mb={3}>
                <Typography variant='body1' style={{ opacity: 0.5 }} fontSize={30} fontWeight={'bold'}>
                  Please upload your resume here !
                </Typography>
              </Grid>
              <Grid item textAlign={'center'} xs={12}>
                <Button
                  component='label'
                  variant='contained'
                  accept='.pdf'
                  onChange={handleFileChange}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput type='file' />
                </Button>
              </Grid>

              <Grid item xs={12} mt={3} textAlign={'center'}>
                <Typography variant='body1' style={{ opacity: 0.5 }} fontSize={30} fontWeight={'bold'}>
                  {formData.resumeName || 'Select a PDF file'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
          <Button variant='contained' onClick={handleDownloadClick}>
            Download
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default JobApplicationForm
