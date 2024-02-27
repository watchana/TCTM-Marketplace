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
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DownloadIcon from '@mui/icons-material/Download'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

// ** dynamicform import

// import timepicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const SpecialAbility = forwardRef((props, ref2) => {
  const handle2Change = e => {
    const { name, value } = e.target
    e.preventDefault()
    ref2.current[name] = value
  }

  return (
    <form>
      <Grid>
        {/* -----------------Special Ability--------------- */}
        <Grid item xs={12} mt={5} mb={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
              Special Ability
            </Typography>
          </Paper>
        </Grid>

        {/* -----------------Typing--------------- */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant='body2' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center' }}>
              Typing
            </Typography>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='typing_yn'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
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

          <Grid item xs={12} sm={12} md={4}>
            <Typography variant='body2' fontWeight='bold'>
              Thai Words/Min.
            </Typography>
            <TextField
              name='typing_thaiwords'
              placeholder='Thai Words/Min.'
              size='small'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant='body2' fontWeight='bold'>
              English Words/Min.
            </Typography>
            <TextField
              name='typing_engwords'
              placeholder='English Words/Min.'
              size='small'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          {/* -----------------computer--------------- */}
        </Grid>

        {/* -----------------Driving--------------- */}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} mt={5}>
            <Typography variant='body2' fontWeight='bold' sx={{ display: 'flex', justifyContent: 'center' }}>
              computer
            </Typography>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='com_yn'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
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
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant='body2' fontWeight='bold'>
              Please Mention
            </Typography>
            <TextField
              name='mention_com'
              placeholder='Please Mention'
              size='small'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} mt={5}>
            <Typography sx={{ display: 'flex', justifyContent: 'center' }} variant='body2' fontWeight='bold'>
              Driving
            </Typography>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='driving_yn'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
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
          <Grid item xs={12} sm={12} md={2.66}>
            <Typography variant='body2' fontWeight='bold'>
              Driving License No.
            </Typography>
            <TextField
              name='dlicense_no'
              placeholder='Driving License No.'
              size='small'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          {/* -----------------Office Machine--------------- */}
          <Grid item xs={12} sm={12} md={2.66}>
            <Typography variant='body2' fontWeight='bold'>
              Office Machine
            </Typography>
            <TextField
              name='office_machine'
              placeholder='Office Machine'
              size='small'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
          {/* -----------------Special knowledge Please Mention--------------- */}
          <Grid item xs={12} sm={12} md={2.66}>
            <Typography variant='body2' fontWeight='bold'>
              Special knowledge Please Mention
            </Typography>
            <TextField
              name='knowledge_mention'
              placeholder='Special knowledge Please Mention'
              fullWidth
              onChange={handle2Change}
              size='small'
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
})

export default SpecialAbility
