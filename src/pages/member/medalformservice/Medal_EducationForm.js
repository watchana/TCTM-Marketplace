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

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const MedalEducation = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    console.log('data', data)
  }, [data])

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showallservice`, {
          params: {
            name: nameID
          }
        })

        setData(response.data.message.Data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <form>
      {/* -----------------หัวข้อการศึกษา--------------- */}
      <Grid container spacing={2}>
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
          <TextField name='elementary_level' placeholder='Elementary Level' fullWidth />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField name='city_state_ele' placeholder='CityState' fullWidth />
        </Grid>
        {/* -----------------วันเริ่ม--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.dateelement_start = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.dateelement_end = date)} />
          </LocalizationProvider>
        </Grid>
        {/* -----------------วันจบ--------------- */}
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='Graduate_Element'>
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
          <TextField name='middle_school' placeholder='Middle School' fullWidth />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField name='city_state_md' placeholder='City/State' fullWidth />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.mddate_start = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.mddate_end = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='Graduate_md'>
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
          <TextField name='hight_School' placeholder='Hight School/Cert. Of Voc.Ed.' fullWidth />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField name='city_state_h' placeholder='City/State' fullWidth />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.hidate_start = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.hidate_end = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='graduate_hight'>
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
          <TextField name='high_voc' placeholder='High Voc. Cert.' fullWidth />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField name='city_state_hv' placeholder='City/State' fullWidth />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.hvdate_start = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.hvdate_end = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='graduate_high_voc'>
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
          <TextField name='college' placeholder='College' fullWidth />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField name='city_state_co' placeholder='City/State' fullWidth />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.collegedate_start = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={date => (ref.current.collegedate_end = date)} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='graduate_college'>
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
      </Grid>
    </form>
  )
}

export default MedalEducation
