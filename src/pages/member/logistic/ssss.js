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

const MainForm = () => {
  return (
    <Grid container id='form-to-image' style={{ userSelect: 'none' }} sx={{ px: { xs: 12, sm: 12, md: 12, lg: 24 } }}>
      55555
      <Button variant='contained' type='submit' color='primary' onClick={() => handleDownload(PDF_File)}>
        Download
      </Button>
    </Grid>
  )
}

export default MainForm
