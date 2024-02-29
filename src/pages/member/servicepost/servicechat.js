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
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
  Typography
} from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

// ** Material-UI Icons Imports
import TaskIcon from '@mui/icons-material/Task'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import ChevronRight from 'mdi-material-ui/ChevronRight'
import DownloadIcon from '@mui/icons-material/Download'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ServiceDetail from './Servicepostdetail'

// import Component
import Regispost from 'src/views/post-image/regispost'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

const PosrtDetail = () => {
  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

  // เรียกใช้งาน router
  const router = useRouter()
  const { ser_req_id, ser_id } = router.query
  const reqID = ser_req_id // เก็บค่า req_id
  const recipient = ser_id // เก็บค่า sub_id (ค่านี้อาจเป็น Null)

  // console.log('reqID', reqID)
  // console.log('recipient', recipient)

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [postData, setPostData] = useState('') // ข้อมูล header and post detail
  const [questionData, setQuestionData] = useState('') // ข้อมูล Question ผู้ส่ง ผู้รับ
  const [comments, setComment] = useState('') // ข้อมูล comments
  const [imagesName, setImagesName] = useState([])
  const [messageImage, setMessageImage] = useState([])
  console.log('messageImage', messageImage)

  const [uploadImages, setUploadImages] = useState([])

  const [shouldFetchData, setShouldFetchData] = useState(false) // ตัวแปรควบคุมการดึงข้อมูลใหม่

  // จัดการตัวแปรชื่อไฟล์ภาพ
  const handleUploadImagesChange = newImages => {
    setUploadImages(newImages)
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

      if (ser_req_id) {
        // ตรวจสอบว่า reqID มีค่าหรือไม่
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}TCTM.requirements.requirement_ser_detail?ser_req_id=${ser_req_id}`
          )

          setQuestionData(response.data.message.Question_List)

          setMessageImage(response.data.message.image)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [ser_req_id, shouldFetchData])

  //===========================ฟังชัน ดึงข้อมูลทุกๆวินาที=============================//

  // ใช้ setInterval ใน useEffect เพื่อเปลี่ยนค่า shouldFetchData ทุกๆ 1 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldFetchData(!shouldFetchData) // สลับค่า shouldFetchData เพื่อเรียก fetchData ใหม่
    }, 10000) // 1 วินาที

    return () => {
      clearInterval(interval) // ยกเลิก interval เมื่อ Component ถูก unmount
    }
  }, [shouldFetchData])

  //===========================ฟังชัน ดึงข้อมูลทุกๆวินาที=============================//

  // เก็บค่าข้อมูลจาก คอมเม้นต์
  const handleComment = event => {
    setComment(event.target.value)
  }

  const [uploadedFileNames, setUploadedFileNames] = useState([])

  // Comment Submit
  const handleCommentSubmit = async e => {
    e.preventDefault()

    if (comments === '') {
      SAlert.fire({
        icon: 'error',
        title: 'Error information',
        text: 'Please fill in information before commenting!'
      })

      return
    }

    let uploadedFileNames = ''
    if (uploadImages.length > 0) {
      const response = await axios.post(`/api/Ser_Chat_Upload`, uploadImages, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      uploadedFileNames = response.data.uploadedFileNames
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

    const data = {
      ser_req_id: reqID,
      sender: userId,
      ser_recipient: recipient,
      ser_query_description: comments,
      ser_req_image_file: uploadedFileNames
    }

    console.log('data1', data)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.ser_postchat`, data)

      console.log(response)
      SAlert.fire({
        icon: 'success',
        title: 'Posted a successful message'
      })
      setComment('')
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังก์ชันลบข้อมูล
  const handleDeleteSubmit = ser_query_id => {
    SAlert.fire({
      title: 'Do you want to delete the data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          ser_query_id: ser_query_id
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.deletechat`, data)
          .then(function (response) {
            console.log(response)

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
            console.log(error)

            SAlert.fire({
              icon: 'error',
              title: 'An error occurred.',
              text: 'Unable to delete data'
            })
          })
      } else if (result.isDenied) {
        console.log('cancelled delete')
      }
    })
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        <Card variant='outlined' sx={{ width: '100%', height: '100%', marginBottom: '20px', boxShadow: 2 }}>
          <Box sx={{ width: '100%', padding: '20px 20px 8px' }}>
            <ServiceDetail />
          </Box>
        </Card>
      </Box>
      <Box>
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
              ></TextField>
              <Regispost onUploadImagesChange={handleUploadImagesChange} />
              <Button variant='contained' onClick={handleCommentSubmit} sx={{ mt: 4 }}>
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
                [...new Set(questionData.map(question => question.ser_query_id))].map((uniqueQueryId, index) => {
                  const uniqueQuestion = questionData.find(question => question.ser_query_id === uniqueQueryId)

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
                              Service
                            </Typography>
                          )}
                          {uniqueQuestion.sender === userId && (
                            <IconButton onClick={() => handleDeleteSubmit(uniqueQuestion.ser_query_id)}>
                              <DeleteIcon sx={{ fontSize: 28, color: '#fff' }} />
                            </IconButton>
                          )}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          width: '100%',
                          padding: '0px 20px 20px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant='body2'
                          fontSize='1rem'
                          color={uniqueQuestion.sender === userId ? '#fff' : '#000'}
                          sx={{ flex: 1 }} // เพิ่ม flex: 1 เพื่อให้ข้อความครอบคลุมพื้นที่ทั้งหมดที่เหลือ
                        >
                          {uniqueQuestion.ser_query_description}
                        </Typography>

                        <ImageList sx={{ flex: 1 }} cols={1} rowHeight={160}>
                          {messageImage
                            .filter(image => image.ser_query_id === uniqueQuestion.ser_query_id)
                            .map((image, imgIndex) => (
                              <ImageListItem key={imgIndex}>
                                <img src={`/serimgpost/${image.ser_req_image_file}`} alt={image.name} />
                              </ImageListItem>
                            ))}
                        </ImageList>
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
    </Container>
  )
}

export default withAuth(PosrtDetail)
