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
  Typography,
  useMediaQuery
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

// import Component
import Regispost from 'src/views/post-image/regispost'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'
import typography from 'src/@core/components/typography'

const PosrtDetail = () => {
  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')

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
  const [poDataApprove, setPoDataApprove] = useState('') // ข้อมูล Po ที่ถูก Approve
  const [imageChange, setImageChange] = useState({}) // ข้อมูล image
  const [imagesName, setImagesName] = useState([])
  const [messageImage, setMessageImage] = useState([])

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

      if (reqID) {
        // ตรวจสอบว่า reqID มีค่าหรือไม่
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API}TCTM.requirements.requirement_detail?req_id=${reqID}`
          )

          setPostData(response.data.message.Requirement_Data[0])
          setQuestionData(response.data.message.Question_List)
          setPoData(response.data.message.Po_List)
          setMessageImage(response.data.message.image)

          // ตรวจสอบและดักจับ po_status เป็น 2 และเก็บ po_id ที่เป็น '2' ในตัวแปร poDataApprove
          const poList = response.data.message.Po_List

          const approvedPoIds = poList
            .filter(po => po.po_status === '2')
            .map(po => po.po_id)
            .join(', ') // รวม po_id เป็น string
          setPoDataApprove(approvedPoIds)
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [reqID, shouldFetchData])

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
    if (uploadImages.length > 0 && uploadImages && comments) {
      const response = await axios
        .post(`/api/Chat_Upload`, uploadImages, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(async response => {
          if (response) {
            const data = {
              req_id: reqID,
              sender: userId,
              recipient: recipient,
              query_description: comments,
              req_image_file: response.data.uploadedFileNames || []
            }
            try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.postchat`, data)

              console.log(response)
              SAlert.fire({
                icon: 'success',
                title: 'Posted a successful message'
              })
              setComment('')
              setShouldFetchData(!shouldFetchData)

              window.location.reload()
            } catch (error) {
              console.log(error)
            }
          }
        })
    } else {
      const data = {
        req_id: reqID,
        sender: userId,
        recipient: recipient,
        query_description: comments,
        req_image_file: []
      }
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.postchat`, data)

        console.log(response)
        SAlert.fire({
          icon: 'success',
          title: 'Posted a successful message'
        })
        setComment('')
        setShouldFetchData(!shouldFetchData)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }

    // ดึงค่า uploadedFileNames จาก response

    // ตรวจสอบค่าว่างใน TextField
    if (reqID === 'null' || userId === 'null' || recipient === 'null') {
      SAlert.fire({
        icon: 'error',
        title: 'Error information',
        text: 'No one has answered yet!'
      })

      return
    }

    if (!comments && !uploadedFileNames) {
      SAlert.fire({
        icon: 'error',
        title: 'Error information',
        text: 'Please fill in information before commenting!'
      })

      return
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

  // ฟังชัน Member Approve
  const handleApproveSubmit = async (e, po_id) => {
    e.preventDefault()

    const data = {
      po_id: po_id,
      req_id: reqID
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.approve_po`, data)
      console.log(response)
      SAlert.fire({
        icon: 'success',
        title: 'Approve Success'
      })
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังชัน Member Reject
  const handleRejectSubmit = async (e, po_id) => {
    e.preventDefault()

    const data = {
      po_id: po_id,
      req_id: reqID
    }

    console.log('data', data)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.reject_po`, data)
      console.log(response)
      SAlert.fire({
        icon: 'success',
        title: 'decline Success'
      })
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // ฟังชัน Po dowload Doc
  const handleDownload = async FileName => {
    const fileName = FileName

    try {
      const downloadResponse = await fetch('/api/Po_FileDownload', {
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

  // ฟังชัน Shipping Approve
  const handleShippingSubmit = async (e, po_id) => {
    e.preventDefault()

    const data = {
      po_id: poDataApprove,
      invoice_filename: '-',
      descritp_tion: '-',
      product_id: '-',
      member_id: userId,
      sub_id: postData.sub_id,
      amount: '-',
      total: '-',
      type: 'requirement',
      option: '-'
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.gen_invoice`, data)
      console.log(response)
      SAlert.fire({
        icon: 'success',
        title: 'Approve Success'
      })
      setShouldFetchData(!shouldFetchData)
    } catch (error) {
      console.log(error)
    }
  }

  // หัวตาราง Data Gride
  const columns = [
    { field: 'po_id', headerName: 'ID', minWidth: 100 },
    { field: 'po_file_name', headerName: 'PO', minWidth: 200 },
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
      field: 'download_button',
      headerName: 'Download',
      width: 150,
      renderCell: rowCell => (
        <Button
          variant='outlined'
          onClick={() => handleDownload(rowCell.row.po_file_name)}
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
      )
    },
    {
      field: 'Approve',
      headerName: 'Approve',
      minWidth: 150,
      renderCell: rowCell => (
        <Button
          variant='contained'
          color='success'
          onClick={e => handleApproveSubmit(e, rowCell.row.po_id)}
          disabled={
            rowCell.row.po_status === '2' ||
            rowCell.row.po_status === '0' ||
            postData.req_status === '3' ||
            postData.req_status === '4'
          }
          startIcon={<TaskIcon />}
        >
          Approve
        </Button>
      )
    },
    {
      field: 'Reject',
      headerName: 'Reject',
      minWidth: 150,
      renderCell: rowCell => (
        <Button
          variant='contained'
          color='error'
          onClick={e => handleRejectSubmit(e, rowCell.row.po_id)}
          disabled={
            rowCell.row.po_status === '2' ||
            rowCell.row.po_status === '0' ||
            postData.req_status === '3' ||
            postData.req_status === '4'
          }
          startIcon={<CloseIcon />}
        >
          Reject
        </Button>
      )
    }
  ]

  // const filteredImages = messageImage.filter(image =>
  //   questionData.find(question => {
  //     console.log('question.query_id:', question.query_id)
  //     console.log('image.query_id:', image.query_id)

  //     return question.query_id === image.query_id
  //   })
  // )

  // useEffect(() => {
  //   console.log('filteredImages:', filteredImages)
  // }, [filteredImages])

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
              backgroundColor: '#2d2e81',
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
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant='h4' fontSize='24px bold' color='#000'>
                Offer
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                disabled={!poDataApprove || poDataApprove.trim() === '' || postData.req_status === '4'}
                startIcon={<LocalMallIcon />}
                onClick={handleShippingSubmit}
              >
                Shipping
              </Button>
            </Box>

            {/* ตาราง */}
            <Box sx={{ width: '100%', height: '300px' }}>
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
                              Market
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
    </Container>
  )
}

export default withAuth(PosrtDetail)
