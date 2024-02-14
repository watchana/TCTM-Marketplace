// FormComponent.js
import React, { forwardRef } from 'react'

// ** Material UI Imports
import {
  TextField,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Box
} from '@mui/material'

import InputAdornment from '@mui/material/InputAdornment'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useMediaQuery } from '@mui/material'

const Information = forwardRef((props, ref2) => {
  const handle2Change = e => {
    const { name, value } = e.target
    e.preventDefault()
    ref2.current[name] = value
  }

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Box>
      {/* -----------------information--------------- */}
      <Grid>
        <Paper
          sx={{
            height: isSmallScreen ? '50px' : '60px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: '#2d2e81',
            border: '1px solid #primary.main'
          }}
        >
          <Typography
            textAlign={'center'}
            color='#fff'
            variant='h5'
            sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' } }}
          >
            Job Application
          </Typography>
        </Paper>
      </Grid>

      <Grid>
        <Paper
          sx={{
            height: isSmallScreen ? '50px' : '60px',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            backgroundColor: '#2d2e81',
            border: '1px solid #primary.main'
          }}
        >
          <Typography
            textAlign={'center'}
            color='#fff'
            variant='h5'
            sx={{ fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.3rem' } }}
          >
            Personal information
          </Typography>
        </Paper>
      </Grid>

      <Grid container>
        {/* -------------------------------------------------- COLUMN 1 ---------------------------------------------------------- */}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' fontWeight='bold'>
              First Name
            </Typography>
            <TextField size='small' name='fname' placeholder='Name' fullWidth onChange={handle2Change} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' fontWeight='bold'>
              Last Name
            </Typography>
            <TextField size='small' name='lname' placeholder='Last Name' fullWidth onChange={handle2Change} />
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 2 ---------------------------------------------------------- */}

        <Grid container spacing={2} mt={1}>
          {/* -----------------อีเมล--------------- */}
          <Grid item xs={12} sm={4.5} lg={4.5}>
            <Typography variant='body2' fontWeight='bold'>
              Email
            </Typography>
            <TextField size='small' name='email' placeholder='Email' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------โทรศัพท์--------------- */}
          <Grid item xs={4} sm={2.5} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Phone
            </Typography>
            <TextField
              size='small'
              name='phone'
              placeholder='XXX-XXX-XXXX'
              type='tel'
              inputProps={{
                pattern: '[0-9]*',
                maxLength: 10
              }}
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          {/* -----------------วันเกิด--------------- */}
          <Grid item xs={4} sm={2.5} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Date Of Birt
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: 'small' } }}
                onChange={date => (ref2.current.dateofbirt = date)}
              />
            </LocalizationProvider>
          </Grid>
          {/* -----------------อายุ--------------- */}
          <Grid item xs={4} sm={2.5} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Age
            </Typography>
            <TextField size='small' name='age' placeholder='Age' fullWidth onChange={handle2Change} />
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 3 ---------------------------------------------------------- */}

        <Grid container spacing={2} mt={1}>
          {/* -----------------ที่อยู่--------------- */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' fontWeight='bold'>
              Address
            </Typography>
            <TextField size='small' name='address' placeholder='Address' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------ที่อยู่--------------- */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' fontWeight='bold'>
              Address Line 2
            </Typography>
            <TextField
              size='small'
              name='addressline2'
              placeholder='Address Line 2'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 4 ---------------------------------------------------------- */}
        <Grid container spacing={3} mt={1}>
          {/* -----------------ประกันสังคม--------------- */}
          <Grid item xs={12} md={4.5} lg={4.5}>
            <Typography variant='body2' fontWeight='bold'>
              Social Security
            </Typography>
            <TextField
              size='small'
              name='social_security'
              placeholder='Social Security'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          {/* -----------------สถานะความเป็นอยู่--------------- */}
          <Grid item xs={12} md={7.5} lg={7.5}>
            <Typography variant='body2' fontWeight='bold'>
              Living Status
            </Typography>

            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='livingStatus'
              onChange={handle2Change}
            >
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  value='Living With Parent'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Living With Parent</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  value='Own Home'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Own Home</Typography>}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  value='Hired House'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Hired House</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <FormControlLabel
                  value='Hiredflat/Hotel'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Hiredflat/Hotel</Typography>}
                />
              </Grid>
            </RadioGroup>
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 5 ---------------------------------------------------------- */}

        <Grid container spacing={1} mt={1}>
          {/* -----------------เชื้อชาติ--------------- */}
          <Grid item xs={6} sm={4.5}>
            <Typography variant='body2' fontWeight='bold'>
              Ethnicity
            </Typography>
            <TextField size='small' name='ethnicity' placeholder='Ethnicity' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------สัญชาติ--------------- */}
          <Grid item xs={6} sm={3.75}>
            <Typography variant='body2' fontWeight='bold'>
              Nationality
            </Typography>
            <TextField size='small' name='nationality' placeholder='Nationality' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------ศาสนา--------------- */}
          <Grid item xs={12} sm={3.75}>
            <Typography variant='body2' fontWeight='bold'>
              Religion
            </Typography>
            <TextField size='small' name='religion' placeholder='Religion' fullWidth onChange={handle2Change} />
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 6  ---------------------------------------------------------- */}

        <Grid container spacing={1} mt={1}>
          {/* -----------------บัตรประชาชน--------------- */}
          <Grid item xs={12} md={6} lg={4.5}>
            <Typography variant='body2' fontWeight='bold'>
              Identity card no.
            </Typography>
            <TextField size='small' name='idcard' placeholder='XXXXXXXXXXXXX' fullWidth onChange={handle2Change} />
          </Grid>

          {/* -----------------วันหมดอายุบัตร--------------- */}
          <Grid item xs={4} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Expiration date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                slotProps={{ textField: { size: 'small' } }}
                onChange={date => (ref2.current.expiration_date = date)}
              />
            </LocalizationProvider>
          </Grid>
          {/* -----------------ส่วนสูง--------------- */}
          <Grid item xs={4} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Height
            </Typography>
            <TextField size='small' name='height' placeholder='Height Cm.' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------น้ำหนัก--------------- */}
          <Grid item xs={4} lg={2.5}>
            <Typography variant='body2' fontWeight='bold'>
              Weight
            </Typography>
            <TextField size='small' name='weight' placeholder='Weight Kgs.' fullWidth onChange={handle2Change} />
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 7 ---------------------------------------------------------- */}
        <Grid container spacing={1} mt={1} mr={8} width={'100%'}>
          {/* -----------------สถานะทางทหาร--------------- */}
          <Grid item xs={7} md={7} lg={7}>
            <Typography variant='body2' fontWeight='bold'>
              Military Status
            </Typography>

            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='military_status'
              onChange={handle2Change}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  fullWidth
                  value='Exempted'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Exempted</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  fullWidth
                  value='Served'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Served</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormControlLabel
                  fullWidth
                  value='Not yet served'
                  control={<Radio size='small' />}
                  label={<Typography variant='body2'>Not yet served</Typography>}
                />
              </Grid>
            </RadioGroup>
          </Grid>
          <Grid item xs={5} md={5} lg={5}>
            {/* -----------------เพศ--------------- */}
            <Grid item xs={12}>
              <Typography variant='body2' fontWeight='bold'>
                Gender
              </Typography>

              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='gender'
                onChange={handle2Change}
              >
                <Grid item xs={12} sm={6} md={4} lg={6}>
                  <FormControlLabel
                    value='Male'
                    control={<Radio size='small' />}
                    label={<Typography variant='body2'>Male</Typography>}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={6}>
                  <FormControlLabel
                    value='Female'
                    control={<Radio size='small' />}
                    label={<Typography variant='body2'>Female</Typography>}
                  />
                </Grid>
              </RadioGroup>
            </Grid>
          </Grid>
        </Grid>

        {/* -------------------------------------------------- COLUMN 1 ---------------------------------------------------------- */}

        {/* -----------------สถานภาพ--------------- */}
        <Grid item xs={6}>
          <Typography variant='body2' fontWeight='bold'>
            Marital status
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='marital_status'
              onChange={handle2Change}
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
        <Grid item xs={2}>
          <Typography variant='body2' fontWeight='bold'>
            Date Available
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              slotProps={{ textField: { size: 'small' } }}
              onChange={date => (ref2.current.dateavail = date)}
            />
          </LocalizationProvider>
        </Grid>
        {/* -----------------ตำแหน่งที่อยากทำ--------------- */}
        <Grid item xs={4}>
          <Typography variant='body2' fontWeight='bold'>
            Position Applied For
          </Typography>
          <TextField
            size='small'
            name='positionap'
            placeholder='Position Applied For'
            fullWidth
            onChange={handle2Change}
          />
        </Grid>

        {/* -------------------------------------------------- COLUMN 1 ---------------------------------------------------------- */}

        {/* -----------------เงินเดือนที่ต้องการ--------------- */}
        <Grid item xs={4}>
          <Typography variant='body2' fontWeight='bold'>
            Desired Pay
          </Typography>
          <TextField
            size='small'
            name='desired_pay'
            placeholder='desired pay'
            fullWidth
            onChange={handle2Change}
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
              onChange={handle2Change}
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
        <Grid item xs={5}>
          <Typography variant='body2' fontWeight='bold'>
            Employment Desired
          </Typography>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='employment_desired'
            onChange={handle2Change}
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
      </Grid>
    </Box>
  )
})

export default Information
