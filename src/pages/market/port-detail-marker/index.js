// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import UploadIcon from '@mui/icons-material/Upload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** Material Design Icons Imports
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'
import Regispost from 'src/views/post-image/regispost'
import typography from 'src/@core/components/typography'
import { useTheme } from '@material-ui/core/styles'

const PosrtDetail = () => {
  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

  const theme = useTheme()

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
  const [imagesName, setImagesName] = useState([])

  const [messageImage, setMessageImage] = useState([])
  const [uploadImages, setUploadImages] = useState([])

  const [shouldFetchData, setShouldFetchData] = useState(false) // ตัวแปรควบคุมการดึงข้อมูลใหม่
  const [selectedFileName, setSelectedFileName] = useState('') // เก็บชื่อไฟล์ Po

  // ประกาศตัวแปร mergedData และกำหนดค่าเป็น questionData รวมกับ commentsData

  const mergedData = [
    ...(questionData ? Object.values(questionData) : []),
    ...(commentsData ? Object.values(commentsData) : [])
  ]

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

  useEffect(() => {
    const imageNames = uploadImages.map(image => image.name)

    // ตรวจสอบว่าค่า imageNames ไม่เหมือนกับค่าปัจจุบันของ imagesName ก่อนที่จะเรียก setImagesName
    if (JSON.stringify(imageNames) !== JSON.stringify(imagesName)) {
      setImagesName(imageNames)
    }
  }, [uploadImages, imagesName])

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
            `${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.requirement_detail?req_id=${reqID}`
          )
          setPostData(response.data.message.Requirement_Data[0])
          setQuestionData(response.data.message.Question_List)
          setPoData(response.data.message.Po_List)
          setMessageImage(response.data.message.image)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [reqID, shouldFetchData])

  // จัดการตัวแปรชื่อไฟล์ภาพ
  const handleUploadImagesChange = newImages => {
    setUploadImages(newImages)
  }

  //===========================ฟังชัน ดึงข้อมูลทุกๆวินาที=============================//

  // ใช้ setInterval ใน useEffect เพื่อเปลี่ยนค่า shouldFetchData ทุกๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldFetchData(!shouldFetchData) // สลับค่า shouldFetchData เพื่อเรียก fetchData ใหม่
    }, 1000) // 1 วินาที

    return () => {
      clearInterval(interval) // ยกเลิก interval เมื่อ Component ถูก unmount
    }
  }, [shouldFetchData])

  //===========================ฟังชัน ดึงข้อมูลทุกๆวินาที=============================//

  // เก็บค่าข้อมูลจาก คอมเม้นต์
  const handleComment = event => {
    setComment(event.target.value)
  }

  const [commentsData, setCommentsData] = useState([]) // อัปเดตเพื่อเก็บทั้งข้อควา
  const [uploadedFileNames, setUploadedFileNames] = useState([])

  // Comment Submit

  const handleCommentSubmit = async e => {
    e.preventDefault()

    if (comments !== '') {
      setUploadedFileNames('')
      if (comments !== '' && uploadedFileNames !== '') {
        const response = await axios.post(`/api/Chat_Upload`, uploadImages, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        setUploadedFileNames(response.data.uploadedFileNames)
      }
    }

    // ตรวจสอบค่าว่างใน TextField
    if (reqID === 'null' || userId === 'null' || recipient === 'null') {
      SAlert.fire({
        icon: 'error',
        title: 'Error information',
        text: 'No one has answered yet!'
      })

      return
    }

    if (!comments) {
      SAlert.fire({
        icon: 'error',
        title: 'Error information',
        text: 'Please fill in information before commenting!'
      })

      return
    }

    // รวมข้อมูลข้อความและรูปภาพเข้าด้วยกันสำหรับความคิดเห็น
    const dataAdd = {
      req_id: reqID,
      sender: userId,
      recipient: recipient,
      query_description: comments,
      req_image_file: uploadedFileNames
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.postchat`, dataAdd)

      SAlert.fire({
        icon: 'success',
        title: 'โพสต์ข้อความสำเร็จ'
      })

      setComment('')
      setImageFile(null)
      setImagePreview(null)
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      // console.log(error)
    }
  }

  // ฟังก์ชันลบข้อมูล
  const handleDeleteSubmit = query_id => {
    SAlert.fire({
      title: 'Do you want to delete the data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          query_id: query_id
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.deletechat`, data)
          .then(function (response) {
            if (response.status === 200) {
              SAlert.fire({
                icon: 'success',
                title: 'Delete completed',
                text: 'You are unable to recover data.'
              })
              setShouldFetchData(!shouldFetchData)
            } else {
              SAlert.fire({
                icon: 'error',
                title: 'An error occurred.',
                text: 'Unable to delete data'
              })
            }
          })
          .catch(function (error) {
            // console.log(error)

            SAlert.fire({
              icon: 'error',
              title: 'An error occurred.',
              text: 'Unable to delete data'
            })
          })
      } else if (result.isDenied) {
      }
    })
  }

  // ฟังชัน Delete Po_pdf
  const handlePo_FileDelete = async (e, po_id) => {
    e.preventDefault()

    const confirmed = await SAlert.fire({
      title: 'Do you want to delete the data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    })

    if (!confirmed.isConfirmed) {
      return
    }

    const data = {
      po_id: po_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.delete_po`, data)
      SAlert.fire({
        icon: 'success',
        title: 'decline Success'
      })
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      // console.log(error)
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.addnew_po`, data)
      // console.log(response)
      handleClose()
      SAlert.fire({
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
        // console.log('response Api', response)
      } catch (error) {
        // console.log(error)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  // หัวตาราง Data Gride
  const columns = [
    { field: 'po_id', headerName: 'ID', minWidth: 100 },
    { field: 'po_file_name', headerName: 'PO', minWidth: 300 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 200,
      renderCell: rowCell => {
        if (rowCell.row.po_status === '1') {
          return <Chip label='Waiting for approval' color='primary' />
        } else if (rowCell.row.po_status === '2') {
          return <Chip label='Approve Success' color='success' />
        } else if (rowCell.row.po_status === '0') {
          return <Chip label='Decline' color='error' />
        } else {
          return <Chip label='Unknow' color='secondary' />
        }
      }
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      minWidth: 120,
      renderCell: rowCell => (
        <Button
          variant='contained'
          color='error'
          onClick={e => handlePo_FileDelete(e, rowCell.row.po_id)}
          startIcon={<DeleteIcon />}
          disabled={postData.req_status === '3' || postData.req_status === '4'}
        >
          Delete
        </Button>
      )
    }
  ]

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = event => {
    const file = event.target.files[0]
    setImageFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const isSmallScreen = useMediaQuery('(max-width: 600px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '70px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: theme.palette.primary.dark,
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography sx={typography.h1.title} color='#fff'>
                  Shop
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/member/ports/' passHref>
                    <Typography sx={typography.subtitle1.title} color='#fff'>
                      Post
                    </Typography>
                  </Link>
                  <Typography sx={typography.subtitle1.title} color='#fff'>
                    Details
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>
        {/* ---------- content ---------- */}
        <Card variant='outlined' sx={{ width: '100%', height: '100%', marginBottom: '20px', boxShadow: 2 }}>
          <Box sx={{ width: '100%', padding: '20px 20px 8px' }}>
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
                <Typography variant='h6' fontSize='24px bold' textAlign='center' color='#222'>
                  {postData.user_first_name} {postData.user_last_name}
                </Typography>
              )}
            </Box>
            {/* หัวข้อ */}
            <Typography variant='h4' fontSize='24px bold' color='#222'>
              Title: {postData.req_header}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ width: '100%', padding: '10px 20px 20px' }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h5' fontSize='24px bold' color='#222' sx={{ marginBottom: 2 }}>
                Detail
              </Typography>
            </Box>
            {/* เนื้อหาคน post */}
            <Typography variant='body2' fontSize='18px' color='#222'>
              {postData.req_description}
            </Typography>
            <Divider sx={{ marginTop: 4 }} />
          </Box>
          <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 2
              }}
            >
              <Typography variant='h4' fontSize='24px bold' color='#000' sx={{ marginBottom: 2 }}>
                Offer
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
                disabled={poData && poData.some(item => item.po_status === '2') ? true : false}
                startIcon={<UploadIcon />}
              >
                Add Po
              </Button>
              {/* ตาราง */}
            </Box>
            <DataGrid
              rows={poData || []}
              columns={columns}
              getRowId={row => row.po_id}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              components={{
                NoRowsOverlay: () => <div style={{ textAlign: 'center', padding: '16px' }}>No data</div>
              }}
            />
          </Box>
        </Card>
        {/* ---------- Comment ---------- */}
        <Card variant='outlined' sx={{ width: '100%', height: '100%', marginBottom: '20px', boxShadow: 2 }}>
          <Box sx={{ width: '100%', padding: '20px 20px 8px' }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h5' fontSize='24px bold' color='#222' sx={{ marginBottom: 2 }}>
                Post Comments
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 4 }}
                onChange={handleComment}
                value={comments}
              />

              <Regispost onUploadImagesChange={handleUploadImagesChange} />
              <Button variant='contained' onClick={handleCommentSubmit}>
                Post Comment
              </Button>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ width: '100%', padding: '10px 20px 20px' }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant='h6' fontSize='18px bold' color='#222' sx={{ marginBottom: 2 }}>
                Comment
              </Typography>
              {questionData && questionData.length > 0 ? (
                [...new Set(questionData.map(question => question.query_id))].map((uniqueQueryId, index) => {
                  const uniqueQuestion = questionData.find(question => question.query_id === uniqueQueryId)

                  return (
                    <Card
                      key={index}
                      variant='outlined'
                      sx={{
                        width: '100%',
                        height: '100%',
                        marginBottom: '20px',
                        boxShadow: 2,
                        backgroundColor: uniqueQuestion.sender === userId ? '#3A46A7' : '#FFCA64'
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
                          {uniqueQuestion.sender === userId ? (
                            <Typography variant='h6' fontSize='2.2rem bold' color='#fff'>
                              {uniqueQuestion.user_first_name} {uniqueQuestion.user_last_name}
                            </Typography>
                          ) : (
                            <Typography variant='h6' fontSize='2.2rem bold' color='#000'>
                              Member
                            </Typography>
                          )}
                          {uniqueQuestion.sender === userId && (
                            <IconButton onClick={() => handleDeleteSubmit(uniqueQuestion.query_id)}>
                              <DeleteIcon sx={{ fontSize: 28, color: '#fff' }} />
                            </IconButton>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
                        <Typography
                          variant='body2'
                          fontSize='1rem'
                          color={uniqueQuestion.sender === userId ? '#fff' : '#000'}
                        >
                          {uniqueQuestion.query_description}
                        </Typography>

                        {messageImage
                          .filter(image => image.query_id === uniqueQuestion.query_id)
                          .map((image, imgIndex) => (
                            <ImageList key={imgIndex}>
                              <ImageListItem>
                                <img src={`/imgpost/${image.req_image_file}`} alt={image.name} />
                              </ImageListItem>
                            </ImageList>
                          ))}
                      </Box>
                    </Card>
                  )
                })
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant='h6' fontSize='24px bold'>
                    No one has commented yet.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
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
            <IconButton component='span' color='secondary' aria-label='upload file'>
              <FileUploadIcon />
              <Typography>{selectedFileName || 'Select a PDF file'}</Typography>
            </IconButton>
          </label>
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='secondary' onClick={handleClose}>
            Closs
          </Button>
          <Button variant='contained' color='primary' onClick={handlePoSubmit} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default withAuth(PosrtDetail)
