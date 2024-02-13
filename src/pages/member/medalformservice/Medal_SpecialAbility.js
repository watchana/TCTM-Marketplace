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

const MedalSpecialAbility = () => {
  const [data, setData] = useState([])

  const router = useRouter() // เรียกใช้งาน Router
  const { ser_id } = router.query
  const serID = ser_id

  useEffect(() => {
    console.log('data', data)
  }, [data])

  // Call Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showallservice`, {
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
            <TextField
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_typing_yn}
              sx={{ maxWidth: 80 }}
            />
          </Grid>
          <Grid item xs={2} mt={5}>
            <Typography fontSize={20}>Thai Words/Min.</Typography>
            <TextField
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_typing_thaiwords}
              sx={{ maxWidth: 50 }}
            />
          </Grid>
          <Grid item xs={2.3} mt={5} mr={130}>
            <Typography fontSize={20}>English Words/Min.</Typography>
            <TextField
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_typing_engwords}
              sx={{ maxWidth: 50 }}
            />
          </Grid>
          {/* -----------------computer--------------- */}
          <Grid item xs={2} mt={5}>
            <Typography fontSize={20}>computer</Typography>
            <TextField
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_com_yn}
              sx={{ maxWidth: 80 }}
            />
          </Grid>
          <Grid item xs={6} mt={5} mr={90}>
            <Typography fontSize={20}>Please Mention</Typography>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_mention_com}
            />
          </Grid>
          {/* -----------------Driving--------------- */}
          <Grid item xs={2} mt={5}>
            <Typography fontSize={20}>Driving</Typography>
            <TextField
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_driving_yn}
              sx={{ maxWidth: 80 }}
            />
          </Grid>
          <Grid item xs={6} mt={5}>
            <Typography fontSize={20}>Driving License No.</Typography>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_dlicense_no}
            />
          </Grid>
          {/* -----------------Office Machine--------------- */}
          <Grid item xs={8} mt={5}>
            <Typography fontSize={20}>Office Machine</Typography>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_office_machine}
            />
          </Grid>
          {/* -----------------Special knowledge Please Mention--------------- */}
          <Grid item xs={8} mt={5}>
            <Typography fontSize={20}>Special knowledge Please Mention</Typography>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
              }}
              value={data.ser_knowledge_mention}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalSpecialAbility
