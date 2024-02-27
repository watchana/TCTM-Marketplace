// FormComponent.js
import React, { useState, useRef, forwardRef } from 'react'

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
  CardContent,
  useMediaQuery
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

const FamilyHistoryForm = forwardRef((props, ref2) => {
  const handle2Change = e => {
    const { name, value } = e.target
    e.preventDefault()
    ref2.current[name] = value
  }

  const isSmallScreen = useMediaQuery('(max-width: 700px)')

  return (
    <form>
      {/* -----------------ประวัติครอบครัว--------------- */}
      <Grid container spacing={2}>
        <Grid item xs={12} mt={5}>
          <Paper
            sx={{
              height: isSmallScreen ? '50px' : '60px',

              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Typography
              textAlign={'center'}
              variant='h5'
              color='#fff'
              sx={{ fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.3rem' } }}
            >
              Family Information
            </Typography>
          </Paper>
        </Grid>
        {/* ----------------ชื่อพ่อ---------------- */}

        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Father/Firstname
          </Typography>
          <TextField name='father_firstname' placeholder='Firstname' fullWidth onChange={handle2Change} size='small' />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Last Name
          </Typography>
          <TextField name='father_lastname' placeholder='Last Name' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant='body2' fontWeight='bold'>
            Age
          </Typography>
          <TextField name='father_Age' placeholder='Age' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sx={6}>
          <Typography variant='body2' fontWeight='bold'>
            Occupation
          </Typography>
          <TextField name='father_occ' placeholder='Occupation' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        {/* ----------------ชื่อแม่---------------- */}
        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Mother/Firstname
          </Typography>
          <TextField name='mother_firstname' placeholder='Firstname' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Last Name
          </Typography>
          <TextField name='mother_lastname' placeholder='Last Name' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant='body2' fontWeight='bold'>
            Age
          </Typography>
          <TextField name='mother_age' placeholder='Age' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Occupation
          </Typography>
          <TextField name='mother_occ' placeholder='Occupation' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        {/* ----------------ชื่อสามีหรือภรรยา---------------- */}
        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Name of wife or Husband
          </Typography>
          <TextField
            name='wifeorhusband_fname'
            placeholder='Firstname'
            size='small'
            fullWidth
            onChange={handle2Change}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Typography variant='body2' fontWeight='bold'>
            Last Name
          </Typography>
          <TextField
            name='wifeorhusband_lname'
            placeholder='Last Name'
            size='small'
            fullWidth
            onChange={handle2Change}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <Typography variant='body2' fontWeight='bold'>
            Age
          </Typography>
          <TextField name='wifeorhusband_age' placeholder='Age ' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Occupation
          </Typography>
          <TextField
            name='wifeorhusband_occ'
            placeholder='Occupation'
            size='small'
            fullWidth
            onChange={handle2Change}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Number of Children
          </Typography>
          <TextField
            name='numofChildren'
            placeholder='Number of Children'
            size='small'
            onChange={handle2Change}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  )
})

export default FamilyHistoryForm
