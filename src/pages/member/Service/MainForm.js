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

import axios from 'axios'

// ** Switch Alert Import
const SAlert = require('sweetalert2')

// ** Material UI Imports
import { TextField, Button, Grid, Typography, Paper, Divider, Box } from '@mui/material'

// import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align'

// SEO

import { SeoServiceRegisterpage } from 'src/seo/homepage'
import MySeo from 'src/pages/seo'

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
    ser_religion: formdataref.current.religion || '',
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

  return (
    <Grid container id='form-to-image' sx={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
      <MySeo
        title={'Service Register'}
        description={SeoServiceRegisterpage.description}
        keywords={SeoServiceRegisterpage.keywords}
        content={SeoServiceRegisterpage.content}
      />
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
        {/* ----------------SpecialAbility แตก ---------------- */}
        <div id='page-5'>
          <SpecialAbility ref={formdataref} />
        </div>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        {/* -----------------Resume แตก --------------- */}
        <Grid item xs={12} mt={5}>
          <Paper elevation={3} style={{ borderRadius: '10px', backgroundColor: '#333399' }}>
            <Typography textAlign={'center'} variant='h5' sx={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>
              Resume
            </Typography>
          </Paper>
        </Grid>
        {/* อัปโหลดรูปภาพร้านค้า */}
        <Grid>
          <Typography sx={{ marginY: 6, color: '#3A46A7' }}>Please upload your Resume only PDF</Typography>
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
        </Grid>
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
        <Button
          variant='contained'
          type='submit'
          onClick={handleSubmit}
          color='primary'
          sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  )
}

export default MainForm
