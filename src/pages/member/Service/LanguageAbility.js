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

const LanguageAbility = forwardRef((props, ref) => {
  const handle2Change = e => {
    const { name, value } = e.target
    e.preventDefault()
    ref.current[name] = value
  }

  return (
    <form>
      {/* -----------------Language Ability--------------- */}
      <Grid container spacing={2}>
        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
              Language Ability
            </Typography>
          </Paper>
        </Grid>

        <Grid container spacing={2} ml={10}>
          {/* -----------------Thai--------------- */}
          <Grid item xs={12} sm={12} lg={1} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Thai
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
            <Paper
              elevation={1}
              sx={{
                bgcolor: '#DDE9F5',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Typography variant='body2' fontWeight='bold'>
                Speaking
              </Typography>
            </Paper>

            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='speak_thai'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Writing
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='write_thai'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Reading
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='read_thai'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container spacing={2} ml={10}>
          {/* -----------------Eng--------------- */}
          <Grid item xs={12} sm={12} lg={1} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                English
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Speaking
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='speak_eng'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Writing
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='write_eng'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Reading
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='read_eng'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* -----------------japan--------------- */}
        <Grid container spacing={2} ml={10}>
          <Grid item xs={12} sm={12} lg={1} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Japan
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Speaking
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='speak_japan'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Writing
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='write_japan'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Reading
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='read_japan'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* -----------------china--------------- */}

        <Grid container spacing={2} ml={10}>
          <Grid item xs={12} sm={12} lg={1} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                China
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Speaking
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='speak_china'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Writing
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='write_china'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} md={3.3} lg={3} mt={5} mr={10}>
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
              <Typography variant='body2' fontWeight='bold'>
                Reading
              </Typography>
            </Paper>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='read_china'
              onChange={handle2Change}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <FormControlLabel
                value='good'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Good</Typography>}
              />
              <FormControlLabel
                value='fair'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Fair</Typography>}
              />
              <FormControlLabel
                value='poor'
                control={<Radio size='small' />}
                label={<Typography variant='body2'>Poor</Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
})

export default LanguageAbility
