// MainForm.js
import React, { useState, useRef } from 'react'
import FormComponent from './FormComponent'
import FamilyHistoryForm from './FamilyHistoryForm'
import Education from './EducationForm'
import Information from './information'
import LanguageAbility from './LanguageAbility'
import SpecialAbility from './SpecialAbility'
import CloudUpload from 'mdi-material-ui/CloudUpload'
import html2canvas from 'html2canvas'
import axios from 'axios'
import jsPDF from 'jspdf'

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

const MainForm = () => {
  const formdataref = useRef({})

  const handleDownloadClick = () => {
    generatePDF()
  }

  const [pdfFile, setPdfFile] = useState(null) // ตัวแปรเก็บข้อมูลไฟล์ PDF
  const [pdfFileName, setPdfFileName] = useState(null) // ตัวแปรเก็บชื่อของไฟล์ PDF

  const handlePdfChange = async event => {
    setPdfFile(event.target.files[0])

    const file = event.target.files[0]
    if (file) {
      const fileName = file.name // ชื่อไฟล์
      setPdfFileName(fileName) // ชื่อและนามสกุลไฟล์
    }

    if (file) {
      const formData = new FormData()
      formData.append('PDF_File', file) // เพิ่มไฟล์ใน FormData

      try {
        const response = await fetch('/api/resumeFile', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          console.log('อัปโหลดไฟล์ PDF เรียบร้อยแล้ว')
        } else {
          console.error('มีข้อผิดพลาดในการอัปโหลดไฟล์ PDF')
        }
      } catch (error) {
        console.error('มีข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์', error)
      }
    }
  }
  console.log('ชื่อไฟล์', pdfFileName)

  const [isSubmitted, setIsSubmitted] = useState(false)

  if (isSubmitted) {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.service.addservice`, {
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
        ser_filedame: pdfFileName
      })
      .catch(error => {
        console.error(error)
        SAlert.fire({
          icon: 'error',
          title: 'Log in failed...',
          text: 'Error calling API'
        })
      })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitted(true)
    console.log(formdataref.current)

    // ตรวจสอบค่าว่างก่อนส่ง
    const fieldsToCheck = [formdataref.current.fname]
    if (fieldsToCheck.some(field => field === '' || field === null || field === undefined)) {
      SAlert.fire({
        icon: 'error',
        title: 'Please provide all information.',
        text: 'Please fill in all fields.'
      })

      return
    }

    // ทำสิ่งที่ต้องการกับข้อมูลที่ได้จาก form component ที่นี่
  }

  const formData = new FormData()
  formData.append('pdfFile', pdfFile) // Assuming pdfFile is the File object obtained from an input element

  axios.post('/api/resumeFile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
    }
  })

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
          <Divider sx={{ marginY: 6, color: '#3A46A7' }}>Upload PDF</Divider>
          <input
            accept='application/pdf' // ระบุชนิดของไฟล์ที่อนุญาตให้อัปโหลดเป็น PDF
            style={{ display: 'none' }}
            id='upload-pdf' // ID สำหรับ input element
            type='file'
            onChange={handlePdfChange} // เมื่อมีการเปลี่ยนแปลงไฟล์จะเรียกใช้ handlePdfChange
          />

          <label htmlFor='upload-pdf'>
            <Button fullWidth variant='outlined' component='span' startIcon={<CloudUpload />} sx={{ marginBottom: 2 }}>
              Upload PDF
            </Button>
          </label>
          {pdfFileName}
        </Box>
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
