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
      <Grid container>
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
              onChange={handle2Change}
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
            <TextField name='typing_thaiwords' placeholder='Thai Words/Min.' fullWidth onChange={handle2Change} />
          </Grid>
          <Grid item xs={2.3} mt={5} mr={130}>
            <Typography fontSize={20}>English Words/Min.</Typography>
            <TextField name='typing_engwords' placeholder='English Words/Min.' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------computer--------------- */}
          <Grid item xs={2} mt={5}>
            <Typography fontSize={20}>computer</Typography>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='com_yn' onChange={handle2Change}>
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
          <Grid item xs={6} mt={5} mr={90}>
            <Typography fontSize={20}>Please Mention</Typography>
            <TextField name='mention_com' placeholder='Please Mention' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------Driving--------------- */}
          <Grid item xs={2} mt={5}>
            <Typography fontSize={20}>Driving</Typography>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='driving_yn'
              onChange={handle2Change}
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
            <TextField name='dlicense_no' placeholder='Driving License No.' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------Office Machine--------------- */}
          <Grid item xs={8} mt={5}>
            <Typography fontSize={20}>Office Machine</Typography>
            <TextField name='office_machine' placeholder='Office Machine' fullWidth onChange={handle2Change} />
          </Grid>
          {/* -----------------Special knowledge Please Mention--------------- */}
          <Grid item xs={8} mt={5}>
            <Typography fontSize={20}>Special knowledge Please Mention</Typography>
            <TextField
              name='knowledge_mention'
              placeholder='Special knowledge Please Mention'
              fullWidth
              onChange={handle2Change}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
})

export default SpecialAbility
