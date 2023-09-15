// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FileUploadIcon from '@mui/icons-material/FileUpload'

// ** Next Router
import { useRouter } from 'next/router'

// ** Axios Import
import axios from 'axios'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** MDI Icon Imports
import CircleSmall from 'mdi-material-ui/CircleSmall'

const PosrtDetail = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // เรียกใช้งาน router
  const router = useRouter()
  const { req_id, sub_id } = router.query
  const reqID = req_id // เก็บค่า req_id
  const recipient = sub_id // เก็บค่า sub_id (ค่านี้อาจเป็น Null)

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [postData, setPostData] = useState('') // ข้อมูล header and post detail
  const [questionData, setQuestionData] = useState('') // ข้อมูล Question ผู้ส่ง ผู้รับ
  const [comments, setComment] = useState('') // ข้อมูล comments
  const [poData, setPoData] = useState('') // ข้อมูล Po
  const [poFile, setPoFile] = useState(null) // เก็บค่า Po File
  const [poFileName, setPoFileName] = useState('') // เก็บค่าชื่อของ Po File

  const [shouldFetchData, setShouldFetchData] = useState(false) // ตัวแปรควบคุมการดึงข้อมูลใหม่
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์ Po

  // dialo State Control
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedFileName('')
    setPoFile(null)
  }

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  // เก็บค่าข้อมูลแชทจาก Api
  useEffect(() => {
    const fetchData = async () => {
      const userIdFromLocalStorage = localStorage.getItem('Member_Id')
      if (userIdFromLocalStorage) {
        setUserId(userIdFromLocalStorage)
      }

      if (reqID) {
        // ตรวจสอบว่า reqID มีค่าหรือไม่
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}TCTM.requirements.requirement_detail?req_id=${reqID}`
          )
          setPostData(response.data.message.Requirement_Data[0])
          setQuestionData(response.data.message.Question_List)
          setPoData(response.data.message.Po_List)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData() // เรียกใช้ fetchData() ครั้งแรกที่เปิดหน้า

    const intervalId = setInterval(() => {
      fetchData() // เรียกใช้ fetchData ทุกๆ 1 วินาที
    }, 1000)

    // เมื่อ component unmount ให้เคลียร์ interval
    return () => {
      clearInterval(intervalId)
    }
  }, [reqID, shouldFetchData])

  // เก็บค่าข้อมูลจาก คอมเม้นต์
  const handleComment = event => {
    setComment(event.target.value)
  }

  // Comment Submit
  const handleCommentSubmit = async e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (reqID === 'null' || userId === 'null' || recipient === 'null') {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลผิดพลาด...',
        text: 'ยังไม่มีคนตอบแชท !'
      })

      return
    }

    if (!comments) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลผืดพลาด...',
        text: 'กรุณากรอกข้อมูลก่อน Comment !'
      })

      return
    }

    const data = {
      req_id: reqID,
      sender: userId,
      recipient: recipient,
      query_description: comments
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.postchat`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'โพสข้อความสำเร็จ'
      })
      setComment('')
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังก์ชันลบข้อมูล
  const handleDeleteSubmit = query_id => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          query_id: query_id
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.deletechat`, data)
          .then(function (response) {
            console.log(response)

            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })
              setShouldFetchData(!shouldFetchData)
            } else {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถลบข้อมูลได้'
              })
            }
          })
          .catch(function (error) {
            console.log(error)

            Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถลบข้อมูลได้'
            })
          })
      } else if (result.isDenied) {
        console.log('cancelled delete')
      }
    })
  }

  // ฟังชัน Delete Po_pdf
  const handlePo_FileDelete = async (e, po_id) => {
    e.preventDefault()

    const confirmed = await Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    })

    if (!confirmed.isConfirmed) {
      return
    }

    const data = {
      po_id: po_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.delete_po`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'decline Success'
      })
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังก์ชัน อัปโหลดไฟล์ Po
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

    setPoFile(selectedFile)
    setPoFileName(`${sanitizedFileName}.${fileExtension}`) // ชื่อไฟล์ใหม่
  }

  // ฟังชัน Add Po Pdf (Not Save)
  const handlePoSubmit = async e => {
    e.preventDefault()

    const data = {
      member_id: userId,
      sub_id: recipient,
      po_requirement: reqID,
      po_file_name: poFileName
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.addnew_po`, data)
      console.log(response)
      handleClose()
      Swal.fire({
        icon: 'success',
        title: 'Approve Success'
      })
      setShouldFetchData(!shouldFetchData)

      // เรียกใช้ฟังก์ชัน อัปโหลดไฟล์รูปภาพลงเครื่อง
      const formData = new FormData()
      formData.append('file', poFile)
      formData.append('poFileName', poFileName)

      // ส่งไฟล์ไปยัง API
      try {
        const response = await axios.post(`/api/Po_FileUpload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('response Api', response)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // หัวตาราง Data Gride
  const columns = [
    { field: 'po_id', headerName: 'ID', minWidth: 100 },
    { field: 'po_file_name', headerName: 'po', minWidth: 250 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 160,
      renderCell: rowCell => {
        if (rowCell.row.po_status === '1') {
          return <span>Normol</span>
        } else if (rowCell.row.po_status === '2') {
          return <span>Approve Success</span>
        } else if (rowCell.row.po_status === '0') {
          return <span>Decline</span>
        } else {
          return <span>Unknow</span>
        }
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      minWidth: 120,
      renderCell: rowCell => (
        <Button variant='contained' sx={{ marginRight: 2 }} onClick={e => handlePo_FileDelete(e, rowCell.row.po_id)}>
          Delete
        </Button>
      )
    }
  ]

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              width: '100%',
              height: '100px',
              mb: '20px',
              p: '20px 25px 20px',
              bgcolor: '#FDEDE8',
              border: '1px solid #FDEDE8'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='1.3rem bold' color='#FA896B'>
                  Blog Marker Detail
                </Typography>
                <Breadcrumbs separator={<CircleSmall />} aria-label='breadcrumb'>
                  <Link underline='none' color='inherit' href='/'>
                    <Typography variant='body2'>Home</Typography>
                  </Link>
                  <Link underline='none' color='inherit' href='/member/ports/'>
                    <Typography variant='body2'>Posts</Typography>
                  </Link>
                  <Link underline='none' color='inherit'>
                    <Typography variant='body2'>Blog post</Typography>
                  </Link>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 52, color: '#FA896B' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/* เนื้อหา */}
        <Box sx={{ width: '100%' }}>
          <Card sx={{ width: '100%', height: '100%', mb: '20px', border: '1px solid #FDEDE8' }}>
            <Box sx={{ width: '100%', padding: '20px' }}>
              <Box
                sx={{
                  width: '100%',
                  marginBottom: 4,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <Avatar alt='John Doe' sx={{ width: 40, height: 40, marginRight: 4 }} src='/images/avatars/1.png' />
                {/* ชื่อคน post */}
                {postData && (
                  <Typography variant='body1' fontSize='1.2rem bold' textAlign='center' color='#222'>
                    Post By : {postData.user_first_name} {postData.user_last_name}
                  </Typography>
                )}
              </Box>
              {/* หัวข้อ */}
              <Typography variant='h4' fontSize='2.2rem bold' color='#222'>
                Title {postData.req_header}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ width: '100%', padding: '10px 20px 20px' }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant='h5' fontSize='1.8rem bold' color='#222' sx={{ marginBottom: 2 }}>
                  Detail
                </Typography>
              </Box>
              {/* เนื้อหาคน post */}
              <Typography variant='body2' fontSize='1rem' color='#222'>
                {postData.req_description}
              </Typography>
              <Divider />
            </Box>
            <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
              <Typography variant='h5' fontSize='1.8rem bold' color='#222' sx={{ marginBottom: 2 }}>
                Offer
              </Typography>
              {/* ตาราง */}
              <Button
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
                sx={{ mb: 1 }}
                disabled={poData && poData.some(item => item.po_status === '2') ? true : false}
              >
                Add Po
              </Button>

              <Box sx={{ width: '100%', height: '300px' }}>
                <DataGrid
                  rows={poData}
                  columns={columns}
                  getRowId={row => row.po_id}
                  pageSize={5}
                  rowsPerPageOptions={[5, 10, 20]}
                />
              </Box>
            </Box>
          </Card>
        </Box>

        {/* แสดงความคิดเห็น */}
        <Box sx={{ width: '100%' }}>
          {/* Post Comment */}
          <Box sx={{ width: '100%', padding: '20px' }}>
            <Typography variant='h6' fontSize='2.2rem bold' color='#222' sx={{ marginBottom: 2 }}>
              Post Comments
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: 4 }}
              onChange={handleComment}
              value={comments}
            ></TextField>
            <Button variant='contained' onClick={handleCommentSubmit}>
              Post Comment
            </Button>
          </Box>

          {questionData && questionData.length > 0 ? (
            questionData.map((question, index) => (
              <Card
                key={index}
                sx={{
                  width: '100%',
                  height: '100%',
                  mb: '20px',
                  bgcolor: question.sender === userId ? 'blue' : '#FDEDE8', // ตั้งสีพื้นหลังตามเงื่อนไข ไปเปลี่ยนสี blue เป็นสีอื่น
                  border: '3px solid #FDEDE8'
                }}
              >
                <Box sx={{ width: '100%', padding: '20px' }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignContent: 'center'
                    }}
                  >
                    {question.sender === userId ? (
                      <Typography variant='h6' fontSize='2.2rem bold' color='white'>
                        {question.user_first_name} {question.user_last_name}
                      </Typography>
                    ) : (
                      <Typography variant='h6' fontSize='2.2rem bold' color='#222'>
                        ลูกค้า
                      </Typography>
                    )}
                    {question.sender === userId && ( // เช็คว่า sender เท่ากับ userId ก่อนแสดง IconButton
                      <IconButton onClick={() => handleDeleteSubmit(question.query_id)}>
                        <DeleteIcon sx={{ fontSize: 28, color: 'text.primary' }} />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
                  <Typography variant='body2' fontSize='1rem' color={question.sender === userId ? 'white' : '#222'}>
                    {question.query_description}
                  </Typography>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant='body2'>No data</Typography>
          )}
        </Box>
      </Box>

      {/* Dialog Data */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='md'
        fullWidth
        sx={{
          '& .MuiDialogTitle-root': {
            backgroundColor: '#f5f5f5',
            padding: '16px 24px'
          },
          '& .MuiDialogContent-root': {
            padding: '16px 24px'
          },
          '& .MuiDialogActions-root': {
            padding: '16px 24px'
          }
        }}
      >
        <DialogTitle id='alert-dialog-title'>{'Add Po File'}</DialogTitle>
        <DialogContent>
          <label htmlFor='file-input'>
            <input type='file' accept='.pdf' id='file-input' style={{ display: 'none' }} onChange={handleFileUpload} />
            <IconButton component='span' color='primary' aria-label='upload file'>
              <FileUploadIcon />
            </IconButton>
            <span>{selectedFileName || 'Select a PDF file'}</span>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Closs</Button>
          <Button onClick={handlePoSubmit} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default PosrtDetail
