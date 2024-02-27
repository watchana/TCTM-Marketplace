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
  CardContent
} from '@mui/material'

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const Education = forwardRef((props, ref) => {
  const handle2Change = e => {
    const { name, value } = e.target
    e.preventDefault()
    ref.current[name] = value
  }

  const handleDatePicker = date => {
    ref.current['date'] = date
  }

  const handleDatePicker2 = date2 => {
    ref.current['date2'] = date2
    console.log(date2)
  }

  return (
    <form>
      {/* -----------------หัวข้อการศึกษา--------------- */}
      <Grid container spacing={2}>
        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography
              textAlign={'center'}
              variant='h5'
              sx={{ fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.3rem' }, color: 'white' }}
            >
              Education
            </Typography>
          </Paper>
        </Grid>
        {/* -----------------ประถม--------------- */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Elementary Level
          </Typography>
          <TextField
            name='elementary_level'
            placeholder='Elementary Level'
            size='small'
            fullWidth
            onChange={handle2Change}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            City/State
          </Typography>
          <TextField name='city_state_ele' placeholder='CityState' fullWidth size='small' onChange={handle2Change} />
        </Grid>

        {/* -----------------วันเริ่ม--------------- */}
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.dateelement_start = date)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.dateelement_end = date)}
            />
          </LocalizationProvider>
        </Grid>

        {/* -----------------วันจบ--------------- */}
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Graduate ?
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='Graduate_Element'
            onChange={handle2Change}
          >
            <FormControlLabel
              value='yes'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>Yes</Typography>}
            />
            <FormControlLabel
              value='no'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>

        {/* -----------------มัธยมต้น--------------- */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Middle School
          </Typography>
          <TextField name='middle_school' placeholder='Middle School' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            City/State
          </Typography>
          <TextField name='city_state_md' placeholder='City/State' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.mddate_start = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.mddate_end = date)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Graduate ?
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='Graduate_md'
            onChange={handle2Change}
          >
            <FormControlLabel
              value='yes'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>Yes</Typography>}
            />
            <FormControlLabel
              value='no'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>
        {/* -----------------มัธยมปลาย--------------- */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            Hight School/Cert. Of Voc.Ed.
          </Typography>
          <TextField
            name='hight_School'
            placeholder='Hight School/Cert. Of Voc.Ed.'
            fullWidth
            onChange={handle2Change}
            size='small'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            City/State
          </Typography>
          <TextField name='city_state_h' placeholder='City/State' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.hidate_start = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.hidate_end = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Graduate ?
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='graduate_hight'
            onChange={handle2Change}
          >
            <FormControlLabel
              value='yes'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>Yes</Typography>}
            />
            <FormControlLabel
              value='no'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>

        {/* -----------------ปวส--------------- */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            High Voc. Cert.
          </Typography>
          <TextField name='high_voc' placeholder='High Voc. Cert.' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            City/State
          </Typography>
          <TextField name='city_state_hv' placeholder='City/State' size='small' fullWidth onChange={handle2Change} />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.hvdate_start = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.hvdate_end = date)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Graduate ?
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='graduate_high_voc'
            onChange={handle2Change}
          >
            <FormControlLabel
              value='yes'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>Yes</Typography>}
            />
            <FormControlLabel
              value='no'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>
        {/* -----------------มหาลัย--------------- */}
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            College
          </Typography>
          <TextField name='college' placeholder='College' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight='bold'>
            City/State
          </Typography>
          <TextField name='city_state_co' placeholder='City/State' size='small' fullWidth onChange={handle2Change} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            From
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.collegedate_start = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
          <Typography variant='body2' fontWeight='bold'>
            To
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref.current.collegedate_end = date)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' fontWeight='bold'>
            Graduate ?
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='graduate_college'
            onChange={handle2Change}
          >
            <FormControlLabel
              value='yes'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>Yes</Typography>}
            />
            <FormControlLabel
              value='no'
              control={<Radio size='small' />}
              label={<Typography variant='body2'>No</Typography>}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </form>
  )
})

export default Education
