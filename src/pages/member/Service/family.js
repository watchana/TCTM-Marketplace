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

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

// ตัวแปรเก็บค่าข้อมูล
const Family = ({ onFormFamDataChange }) => {
  const [formData, setFormData] = useState({
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
    numofChildren: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    onFormFamDataChange(formData)
  }

  let formattedDate = ''
  if (formData.dateofbirt) {
    formattedDate = dayjs(formData.dateofbirt).format('MM/DD/YYYY')
  }

  // แปลงค่าวันเกิด user ก่อนส่ง ส่ง
  let formatexpiration_date = ''
  if (formData.expiration_date) {
    formatexpiration_date = dayjs(formData.expiration_date).format('MM/DD/YYYY')
  }

  return (
    <form>
      {/* -----------------ประวัติครอบครัว--------------- */}
      <Grid container spacing={2}>
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
        <Grid item xs={5} mt={5} mr={100}>
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
        <Grid item xs={5} mt={5} mr={100}>
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
      </Grid>
    </form>
  )
}

export default Family
