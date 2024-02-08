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

const MedalLanguageAbility = () => {
  return (
    <form>
      {/* -----------------Language Ability--------------- */}
      <Grid container>
        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='speak_thai'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='write_thai'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='read_thai'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='speak_eng'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='write_eng'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='read_eng'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='speak_japan'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='write_japan'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='read_japan'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='speak_china'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='write_china'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
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
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='read_china'>
              <FormControlLabel
                value='good'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Good'
              />
              <FormControlLabel
                value='fair'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Fair'
              />
              <FormControlLabel
                value='poor'
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 34 } }} />}
                label='Poor'
              />
            </RadioGroup>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalLanguageAbility
