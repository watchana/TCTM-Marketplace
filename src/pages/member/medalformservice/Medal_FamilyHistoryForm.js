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

const MedalFamilyHistoryForm = () => {
  const [data, setData] = useState([])

  const router = useRouter() // เรียกใช้งาน Router
  const { ser_id } = router.query
  const serID = ser_id

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
      {/* -----------------ประวัติครอบครัว--------------- */}
      <Grid container spacing={2}>
        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
              Family Information
            </Typography>
          </Paper>
        </Grid>
        {/* ----------------ชื่อพ่อ---------------- */}
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20} fontWeight={'bold'}>
            Father/Firstname
          </Typography>
          <TextField
            value={data.ser_father_firstname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20}>Last Name</Typography>
          <TextField
            value={data.ser_father_lastname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Age</Typography>
          <TextField
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
            value={data.ser_father_age}
            sx={{ maxWidth: 70 }}
          />
        </Grid>
        <Grid item xs={5} mt={5} mr={100}>
          <Typography fontSize={20}>Occupation</Typography>
          <TextField
            value={data.ser_father_occ}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* ----------------ชื่อแม่---------------- */}
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20} fontWeight={'bold'}>
            Mother/Firstname
          </Typography>
          <TextField
            value={data.ser_mother_firstname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20}>Last Name</Typography>
          <TextField
            value={data.ser_mother_lastname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Age</Typography>
          <TextField
            value={data.ser_mother_age}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
            sx={{ maxWidth: 70 }}
          />
        </Grid>
        <Grid item xs={5} mt={5} mr={100}>
          <Typography fontSize={20}>Occupation</Typography>
          <TextField
            value={data.ser_mother_occ}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* ----------------ชื่อสามีหรือภรรยา---------------- */}
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20} fontWeight={'bold'}>
            Name of wife or Husband
          </Typography>
          <TextField
            value={data.ser_wifeorhusband_fname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20}>Last Name</Typography>
          <TextField
            value={data.ser_wifeorhusband_lname}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>Age</Typography>
          <TextField
            value={data.ser_wifeorhusband_age}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
            sx={{ maxWidth: 70 }}
          />
        </Grid>
        <Grid item xs={5} mt={5}>
          <Typography fontSize={20}>Occupation</Typography>
          <TextField
            value={data.ser_wifeorhusband_occ}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>

        <Grid item xs={3} mt={5} mr={50}>
          <Typography fontSize={20}>Number of Children</Typography>
          <TextField
            value={data.ser_numofchildren}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
            sx={{ maxWidth: 190 }}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalFamilyHistoryForm
