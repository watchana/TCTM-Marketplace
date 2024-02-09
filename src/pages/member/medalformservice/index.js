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

import MedalEducation from './Medal_EducationForm'
import MedalFamilyHistoryForm from './Medal_FamilyHistoryForm'
import MedalInformation from './Medal_information'
import MedalLanguageAbility from './Medal_LanguageAbility'
import MedalSpecialAbility from './Medal_SpecialAbility'

import { useRouter } from 'next/router'

const MedalMainform = () => {
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

  // ฟังชัน download ใบเสร็จ
  const handleDownload = async FileName => {
    const fileName = FileName

    try {
      const downloadResponse = await fetch('/api/resumeFile_dowload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName }),
        responseType: 'blob' // Indicate that the response should be treated as binary data
      })

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob()
        const blobUrl = URL.createObjectURL(blob)

        // Create a download link and initiate the download
        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = fileName
        downloadLink.click()

        // Clean up the object URL after the download is initiated
        URL.revokeObjectURL(blobUrl)

        console.log('Download initiated')
      } else {
        console.error('Error downloading document:', downloadResponse.statusText)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <Grid container id='form-to-image' sx={{ px: { xs: 12, sm: 12, md: 12, lg: 24 } }}>
      <Paper elevation={3} style={{ padding: '60px' }}>
        {/* ----------------information---------------- */}

        <MedalInformation />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------FamilyHistoryForm---------------- */}

        <MedalFamilyHistoryForm />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------EducationForm---------------- */}

        <MedalEducation />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------LanguageAbility---------------- */}

        <MedalLanguageAbility />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------SpecialAbility---------------- */}

        <MedalSpecialAbility />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      </Paper>

      <Button variant='outlined' onClick={() => handleDownload}>
        Download
      </Button>
    </Grid>
  )
}

export default MedalMainform
