// MainForm.js
import React, { useState, useRef, useEffect } from 'react'

// import form
import FormComponent from './FormComponent'
import FamilyHistoryForm from './FamilyHistoryForm'
import Education from './EducationForm'
import Information from './information'
import LanguageAbility from './LanguageAbility'
import SpecialAbility from './SpecialAbility'

//import library
import CloudUpload from 'mdi-material-ui/CloudUpload'
import SerDowload from './ser_dowload'
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

const MainForm = ({ PDF_File }) => {
  const formdataref = useRef({})

  const Swal = require('sweetalert2')

  const handleDownloadClick = () => {
    generatePDF()
  }

  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์
  const [File, setFile] = useState(null) // เก็บค่า  File
  const [FileName, setFileName] = useState('') // เก็บค่าชื่อของ File

  // ฟังก์ชัน อัปโหลดไฟล์
  const handleFileUpload = event => {
    const selectedFile = event.target.files[0]
    setSelectedFileName(selectedFile ? selectedFile.name : '')

    // ใช้ Date เพื่อสร้างเวลาปัจจุบัน
    const currentTime = new Date()

    // ดึงชื่อไฟล์จาก selectedFile
    const fileName = selectedFile ? selectedFile.name : ''

    // แยกนามสกุลไฟล์ออกมา
    const fileExtension = fileName.split('.').pop()
    const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '')

    // รวมชื่อไฟล์และเวลาเข้าด้วยกัน
    const fileNameWithTime = `${currentTime.toISOString()}_${fileNameWithoutExtension}`
    const sanitizedFileName = fileNameWithTime.replace(/[^a-z0-9.]/gi, '_') // แทนที่อักขระที่ไม่ใช่ a-z, 0-9, หรือ . ด้วย "_"
    setFile(selectedFile)
    setFileName(`${sanitizedFileName}.${fileExtension}`) // ชื่อไฟล์ใหม่
  }

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [member_id, setMemberId] = useState(null)

  useEffect(() => {
    console.log(localStorage) // ตรวจสอบว่า localStorage ถูกนำเข้าหรือไม่
    const storedMemberId = localStorage.getItem('Member_Id')
    console.log(storedMemberId)

    // กำหนดค่า member_id ใน state
    setMemberId(storedMemberId)
  }, [])

  const data = {
    member_id: member_id,
    ser_fname: formdataref.current.fname || '',
    ser_lname: formdataref.current.lname || '',
    ser_email: formdataref.current.email || '',
    ser_phone: formdataref.current.phone || '',
    ser_dateofbirt: formdataref.current.dateofbirt || '',
    ser_age: formdataref.current.age || '',
    ser_address: formdataref.current.address || '',
    ser_addressline2: formdataref.current.addressline2 || '',
    ser_social_security: formdataref.current.social_security || '',
    ser_livingstatus: formdataref.current.livingStatus || '',
    ser_ethnicity: formdataref.current.ethnicity || '',
    ser_nationality: formdataref.current.nationality || '',
    ser_idcard: formdataref.current.idcard || '',
    ser_expiration_date: formdataref.current.expiration_date || '',
    ser_height: formdataref.current.height || '',
    ser_weight: formdataref.current.weight || '',
    ser_military_status: formdataref.current.military_status || '',
    ser_gender: formdataref.current.gender || '',
    ser_marital_status: formdataref.current.marital_status || '',
    ser_dateavail: formdataref.current.dateavail || '',
    ser_positionap: formdataref.current.positionap || '',
    ser_desired_pay: formdataref.current.desired_pay || '',
    ser_hour_salary: formdataref.current.hour_salary || '',
    ser_employment_desired: formdataref.current.employment_desired || '',
    ser_father_firstname: formdataref.current.father_firstname || '',
    ser_father_lastname: formdataref.current.father_lastname || '',
    ser_father_occ: formdataref.current.father_occ || '',
    ser_father_age: formdataref.current.father_Age || '',
    ser_mother_firstname: formdataref.current.mother_firstname || '',
    ser_mother_lastname: formdataref.current.mother_lastname || '',
    ser_mother_age: formdataref.current.mother_age || '',
    ser_mother_occ: formdataref.current.mother_occ || '',
    ser_wifeorhusband_fname: formdataref.current.wifeorhusband_fname || '',
    ser_wifeorhusband_lname: formdataref.current.wifeorhusband_lname || '',
    ser_wifeorhusband_age: formdataref.current.wifeorhusband_age || '',
    ser_wifeorhusband_occ: formdataref.current.wifeorhusband_occ || '',
    ser_numofchildren: formdataref.current.numofChildren || '',
    ser_elementary_level: formdataref.current.elementary_level || '',
    ser_city_state_ele: formdataref.current.city_state_ele || '',
    ser_dateelement_start: formdataref.current.dateelement_start || '',
    ser_dateelement_end: formdataref.current.dateelement_end || '',
    ser_graduate_element: formdataref.current.Graduate_Element || '',
    ser_middle_school: formdataref.current.middle_school || '',
    ser_city_state_md: formdataref.current.city_state_md || '',
    ser_mddate_start: formdataref.current.mddate_start || '',
    ser_mddate_end: formdataref.current.mddate_end || '',
    ser_graduate_md: formdataref.current.Graduate_md || '',
    ser_hight_school: formdataref.current.hight_School || '',
    ser_city_state_h: formdataref.current.city_state_h || '',
    ser_hidate_start: formdataref.current.hidate_start || '',
    ser_hidate_end: formdataref.current.hidate_end || '',
    ser_graduate_hight: formdataref.current.graduate_hight || '',
    ser_high_voc: formdataref.current.high_voc || '',
    ser_city_state_hv: formdataref.current.city_state_hv || '',
    ser_hvdate_start: formdataref.current.hvdate_start || '',
    ser_hvdate_end: formdataref.current.hvdate_end || '',
    ser_graduate_high_voc: formdataref.current.graduate_high_voc || '',
    ser_college: formdataref.current.college || '',
    ser_city_state_co: formdataref.current.city_state_co || '',
    ser_collegedate_start: formdataref.current.collegedate_start || '',
    ser_collegedate_end: formdataref.current.collegedate_end || '',
    ser_graduate_college: formdataref.current.graduate_college || '',
    ser_speak_thai: formdataref.current.speak_thai || '',
    ser_write_thai: formdataref.current.write_thai || '',
    ser_read_thai: formdataref.current.read_thai || '',
    ser_speak_eng: formdataref.current.speak_eng || '',
    ser_write_eng: formdataref.current.write_eng || '',
    ser_read_eng: formdataref.current.read_eng || '',
    ser_speak_japan: formdataref.current.speak_japan || '',
    ser_write_japan: formdataref.current.write_japan || '',
    ser_read_japan: formdataref.current.read_japan || '',
    ser_speak_china: formdataref.current.speak_china || '',
    ser_write_china: formdataref.current.write_china || '',
    ser_read_china: formdataref.current.read_china || '',
    ser_typing_yn: formdataref.current.typing_yn || '',
    ser_typing_thaiwords: formdataref.current.typing_thaiwords || '',
    ser_typing_engwords: formdataref.current.typing_engwords || '',
    ser_com_yn: formdataref.current.com_yn || '',
    ser_mention_com: formdataref.current.mention_com || '',
    ser_driving_yn: formdataref.current.driving_yn || '',
    ser_dlicense_no: formdataref.current.dlicense_no || '',
    ser_office_machine: formdataref.current.office_machine || '',
    ser_knowledge_mention: formdataref.current.knowledge_mention || '',
    ser_imagedata: '5555',
    ser_filedame: FileName
  }
  console.log(FileName)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitted(true)

    // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
    const formData = new FormData()
    formData.append('file', File)
    formData.append('FileName', FileName)

    // ส่งไฟล์ไปยัง API

    axios.post(`/api/resumeFile_upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.service.addservice`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Success'
      })
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังชัน download ใบเสร็จ
  // const handleDownload = async FileName => {
  //   const fileName = FileName

  //   console.log('fileName', fileName)

  //   try {
  //     const downloadResponse = await fetch('/api/receipt_FileDownload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ fileName }),
  //       responseType: 'blob' // Indicate that the response should be treated as binary data
  //     })

  //     if (downloadResponse.ok) {
  //       const blob = await downloadResponse.blob()
  //       const blobUrl = URL.createObjectURL(blob)

  //       // Create a download link and initiate the download
  //       const downloadLink = document.createElement('a')
  //       downloadLink.href = blobUrl
  //       downloadLink.download = fileName
  //       downloadLink.click()

  //       // Clean up the object URL after the download is initiated
  //       URL.revokeObjectURL(blobUrl)

  //       console.log('Download initiated')
  //     } else {
  //       console.error('Error downloading document:', downloadResponse.statusText)
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error)
  //   }
  // }

  // ทำสิ่งที่ต้องการกับข้อมูลที่ได้จาก form component ที่นี่

  // const formData = new FormData()
  // formData.append('pdfFile', pdfFile) // Assuming pdfFile is the File object obtained from an input element

  // axios.post('/api/resumeFile', formData, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
  //   }
  // })

  // ฟังก์ชันสำหรับการอัพโหลดไฟล์ PDF ผ่าน API
  // const uploadPDFFile = async (file, fileName) => {
  //   const formData = new FormData()
  //   formData.append('pdfFile', file, fileName) // 'pdfFile' คือชื่อ field ที่ API ต้องการรับไฟล์ PDF

  //   try {
  //     const response = await axios.post('URL_ของ_API', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data' // ใช้ multipart/form-data เพื่ออัพโหลดไฟล์
  //         // อาจจะต้องการ headers อื่น ๆ ตามที่ API ระบุ
  //       }
  //     })

  //     if (response.status === 200) {
  //       console.log('อัพโหลดไฟล์ PDF สำเร็จ')

  //       // ทำสิ่งที่ต้องการหลังจากอัพโหลดไฟล์สำเร็จ
  //     } else {
  //       console.error('อัพโหลดไฟล์ PDF ไม่สำเร็จ')

  //       // ทำสิ่งที่ต้องการหลังจากอัพโหลดไฟล์ไม่สำเร็จ
  //     }
  //   } catch (error) {
  //     console.error('มีข้อผิดพลาดในการอัพโหลดไฟล์ PDF:', error)

  //     // ทำสิ่งที่ต้องการเมื่อเกิดข้อผิดพลาดในการอัพโหลดไฟล์ PDF
  //   }
  // }

  // // เมื่อผู้ใช้เลือกไฟล์ PDF จากอินพุต (input) หรือต่างๆ
  // const handleFileSelect = event => {
  //   const file = event.target.files[0] // ไฟล์ที่เลือกจากอินพุต
  //   const fileNameElement = document.getElementById('fileName') // เลือก Element ที่จะแสดงชื่อไฟล์

  //   if (file) {
  //     const fileName = file.name
  //     fileNameElement.textContent = fileName // แสดงชื่อไฟล์ใน Element
  //     uploadPDFFile(file, fileName) // เรียกใช้ uploadPDFFile พร้อมกับชื่อไฟล์
  //   } else {
  //     fileNameElement.textContent = '' // กรณีไม่มีการเลือกไฟล์ กำหนดให้เป็นค่าว่าง
  //   }
  // }

  //ฟังค์ชั่นแคปรูปและนำไปแปลงไฟล์เป็น PDF

  // const generatePDF = async () => {
  //   // สร้างไฟล์ PDF
  //   const pdf = new jsPDF()

  //   // สร้างหน้าแรก
  //   const page1 = document.getElementById('page-1')
  //   const canvas1 = await html2canvas(page1, { scale: 1, logging: false }) // ปรับ scale ตามต้องการ
  //   const imgData1 = canvas1.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  //   const imgWidth = 200
  //   const imgHeight = (canvas1.height * imgWidth) / canvas1.width
  //   pdf.addImage(imgData1, 'JPEG', 5, 5, imgWidth, imgHeight)

  //   pdf.addPage()

  //   // สร้างหน้าที่สอง
  //   const page2 = document.getElementById('page-2')
  //   const canvas2 = await html2canvas(page2, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  //   const imgData2 = canvas2.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  //   pdf.addImage(imgData2, 'JPEG', 5, 5, imgWidth, imgHeight)

  //   pdf.addPage()

  //   // สร้างหน้าที่สอง
  //   const page3 = document.getElementById('page-3')
  //   const canvas3 = await html2canvas(page3, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  //   const imgData3 = canvas3.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  //   pdf.addImage(imgData3, 'JPEG', 5, 5, imgWidth, imgHeight)

  //   pdf.addPage()

  //   // สร้างหน้าที่สอง
  //   const page4 = document.getElementById('page-4')
  //   const canvas4 = await html2canvas(page4, { scale: 2, logging: false }) // ปรับ scale ตามต้องการ
  //   const imgData4 = canvas4.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  //   pdf.addImage(imgData4, 'JPEG', 5, 5, imgWidth, imgHeight)

  //   pdf.addPage()

  //   // สร้างหน้าที่สอง
  //   const page5 = document.getElementById('page-5')
  //   const canvas5 = await html2canvas(page5, { scale: 2, logging: true }) // ปรับ scale ตามต้องการ
  //   const imgData5 = canvas5.toDataURL('image/jpeg', 0.7) // ลดคุณภาพรูปภาพด้วยการกำหนดค่า quality

  //   pdf.addImage(imgData5, 'JPEG', 5, 5, imgWidth, imgHeight)

  //   // ดาวน์โหลดไฟล์ PDF
  //   pdf.save('multi_page.pdf')
  // }

  return (
    <Grid container id='form-to-image' sx={{ px: { xs: 12, sm: 12, md: 12, lg: 24 } }}>
      <Paper elevation={3} style={{ padding: '60px' }}>
        {/* ----------------information---------------- */}
        <div id='page-1'>
          <Information ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------FamilyHistoryForm---------------- */}
        <div id='page-2'>
          <FamilyHistoryForm ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------EducationForm---------------- */}
        <div id='page-3'>
          <Education ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------LanguageAbility---------------- */}
        <div id='page-4'>
          <LanguageAbility ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* ----------------SpecialAbility---------------- */}
        <div id='page-5'>
          <SpecialAbility ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {/* -----------------Resume--------------- */}

        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
              Resume
            </Typography>
          </Paper>
        </Grid>
        {/* อัปโหลดรูปภาพร้านค้า */}
        <Box sx={{ width: '100%', marginBottom: 4 }}>
          <Divider sx={{ marginY: 6, color: '#3A46A7' }}>Please upload your Resume only PDF</Divider>
          <input
            accept='application/pdf' // ระบุชนิดของไฟล์ที่อนุญาตให้อัปโหลดเป็น PDF
            style={{ display: 'none' }}
            id='upload-pdf' // ID สำหรับ input element
            type='file'
            onChange={handleFileUpload} // เมื่อมีการเปลี่ยนแปลงไฟล์จะเรียกใช้ handlePdfChange
          />

          <label htmlFor='upload-pdf'>
            <Button fullWidth variant='outlined' component='span' startIcon={<CloudUpload />} sx={{ marginBottom: 2 }}>
              Upload PDF
            </Button>
          </label>
        </Box>
        <Typography
          textAlign={'center'}
          style={{ textTransform: 'lowercase' }}
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >
          {selectedFileName}
        </Typography>
        <Grid item xs={12} mt={3} textAlign={'center'}>
          <Typography variant='body1' style={{ opacity: 0.5 }} fontSize={30} fontWeight={'bold'}>
            <span id='fileName'></span>
          </Typography>
        </Grid>
      </Paper>
      <Button variant='contained' type='submit' onClick={handleSubmit} color='primary'>
        Submit
      </Button>
      {/* <Button variant='contained' onClick={handleDownloadClick} color='primary'>
        Download
      </Button> */}
    </Grid>
  )
}

export default MainForm
