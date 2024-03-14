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

const MedalEducation = () => {
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
          <TextField
            value={data.ser_elementary_level}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField
            value={data.ser_city_state_ele}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------วันเริ่ม--------------- */}
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <TextField
            value={data.ser_dateelement_start ? data.ser_dateelement_start.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <TextField
            value={data.ser_dateelement_end ? data.ser_dateelement_end.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------วันจบ--------------- */}
        <Grid item xs={2} mt={5} mr={10}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <TextField
            sx={{ width: 100 }}
            value={data.ser_graduate_element}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------มัธยมต้น--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontWeight={'bold'} fontSize={20}>
            Middle School
          </Typography>
          <TextField
            fullWidth
            value={data.ser_middle_school}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField
            fullWidth
            value={data.ser_city_state_md}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <TextField
            value={data.ser_mddate_start ? data.ser_mddate_start.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <TextField
            value={data.ser_mddate_end ? data.ser_mddate_end.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <TextField
            sx={{ width: 100 }}
            value={data.ser_graduate_md}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------มัธยมปลาย--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontWeight={'bold'} fontSize={20}>
            Hight School/Cert. Of Voc.Ed.
          </Typography>
          <TextField
            fullWidth
            value={data.ser_hight_school}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField
            fullWidth
            value={data.ser_city_state_h}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <TextField
            value={data.ser_hidate_start ? data.ser_hidate_start.substring(0, 10) : ''}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <TextField
            value={data.ser_hidate_end ? data.ser_hidate_end.substring(0, 10) : ''}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <TextField
            sx={{ width: 100 }}
            value={data.ser_graduate_hight}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------ปวส--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontWeight={'bold'} fontSize={20}>
            High Voc. Cert.
          </Typography>
          <TextField
            fullWidth
            value={data.ser_high_voc}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField
            fullWidth
            value={data.ser_city_state_hv}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <TextField
            value={data.ser_hvdate_start ? data.ser_hvdate_start.substring(0, 10) : ''}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <TextField
            value={data.ser_hvdate_end ? data.ser_hvdate_end.substring(0, 10) : ''}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <TextField
            sx={{ width: 100 }}
            value={data.ser_graduate_high_voc}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        {/* -----------------มหาลัย--------------- */}
        <Grid item xs={6} mt={5}>
          <Typography fontWeight={'bold'} fontSize={20}>
            College
          </Typography>
          <TextField
            fullWidth
            value={data.ser_college}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={6} mt={5}>
          <Typography fontSize={20}>City/State</Typography>
          <TextField
            fullWidth
            value={data.ser_city_state_co}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>From</Typography>
          <TextField
            value={data.ser_collegedate_start ? data.ser_collegedate_start.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5}>
          <Typography fontSize={20}>To</Typography>
          <TextField
            value={data.ser_collegedate_end ? data.ser_collegedate_end.substring(0, 10) : ''}
            fullWidth
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
        <Grid item xs={2} mt={5} ml={5}>
          <Typography fontSize={20}>Graduate ?</Typography>
          <TextField
            sx={{ width: 100 }}
            value={data.ser_graduate_college}
            InputProps={{
              readOnly: true // ทำให้ textfield เป็นแบบอ่านเท่านั้น
            }}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export default MedalEducation
