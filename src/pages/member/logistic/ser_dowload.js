// MainForm.js
import React, { useState, useRef, useEffect } from 'react'
import FormComponent from './FormComponent'
import FamilyHistoryForm from './FamilyHistoryForm'
import Education from './EducationForm'
import Information from './information'
import LanguageAbility from './LanguageAbility'
import SpecialAbility from './SpecialAbility'
import CloudUpload from 'mdi-material-ui/CloudUpload'
import ServiceDowload from './ser_dowload'
import html2canvas from 'html2canvas'
import axios from 'axios'
import jsPDF from 'jspdf'
import { useRouter } from 'next/router'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import DownloadIcon from '@mui/icons-material/Download'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

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

// import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align'

const SerDowload = () => {
  // ใช้งาน Router
  const router = useRouter() // use router
  const { member_id, usertype } = router.query

  //ตัวแปรเก็บค่าข้อมูล
  const [ServiceDowload, setServiceDowload] = useState('') // Order Data

  // เก็บค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showallservice`, {
          params: {
            member_id: member_id
          }
        })
        setServiceDowload(response.data.message.Data[0])
        console.log('API Response:', response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [member_id])

  // ฟังชัน download ใบเสร็จ
  const handleDownload = async () => {
    try {
      const downloadResponse = await fetch('/api/resumeFile_dowload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName: ServiceDowload.ser_filedame }), // ให้ชื่อไฟล์เท่ากับ ServiceDowload.ser_filedame
        responseType: 'blob' // Indicate that the response should be treated as binary data
      })

      if (downloadResponse.ok) {
        const blob = await downloadResponse.blob()
        const blobUrl = URL.createObjectURL(blob)

        // Create a download link and initiate the download
        const downloadLink = document.createElement('a')
        downloadLink.href = blobUrl
        downloadLink.download = ServiceDowload.ser_filedame // ให้ชื่อไฟล์ตรงกับ ServiceDowload.ser_filedame
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
      <Button variant='outlined' onClick={handleDownload} startIcon={<DownloadIcon />}>
        Download
      </Button>
    </Grid>
  )
}

export default SerDowload
