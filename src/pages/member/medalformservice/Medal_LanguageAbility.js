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

// ** axios Imports
import axios from 'axios'
import { useRouter } from 'next/router'

const MedalLanguageAbility = () => {
  const [data, setData] = useState([])

  const router = useRouter() // เรียกใช้งาน Router
  const { ser_id } = router.query
  const serID = ser_id

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.service.showallservice`, {
          params: {
            ser_id: serID
          }
        })

        setData(response.data.message.Data[0])
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [serID])

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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_speak_thai}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_write_thai}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_read_thai}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_speak_eng}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_write_eng}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_read_eng}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_speak_japan}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_write_japan}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_read_japan}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_speak_china}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_write_china}</Typography>
            </Paper>
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
            <Paper
              elevation={1}
              sx={{
                mt: 5,
                bgcolor: 'white',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography fontSize={20}>{data.ser_read_china}</Typography>
            </Paper>
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalLanguageAbility
