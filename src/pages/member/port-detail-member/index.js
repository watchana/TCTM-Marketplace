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
  Divider,
  Grid,
  Hidden,
  IconButton,
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

  const [shouldFetchData, setShouldFetchData] = useState(false) // ตัวแปรควบคุมการดึงข้อมูลใหม่

  console.log('poDataApprove', poDataApprove)

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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShouldFetchData(!shouldFetchData) // สลับค่า shouldFetchData เพื่อเรียก fetchData ใหม่
  //   }, 1000) // 1 วินาที

  //   return () => {
  //     clearInterval(interval) // ยกเลิก interval เมื่อ Component ถูก unmount
  //   }
  // }, [shouldFetchData])

  //===========================ฟังชัน ดึงข้อมูลทุกๆวินาที=============================//

  // เก็บค่าข้อมูลจาก คอมเม้นต์
  const handleComment = event => {
    setComment(event.target.value)
  }

  // Comment Submit
  const handleCommentSubmit = async e => {
    e.preventDefault()

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

    const data = {
      req_id: reqID,
      sender: userId,
      recipient: recipient,
      query_description: comments
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
    } catch (error) {
      console.log(error)
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

    console.log('Mega Cabill City', data)

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

  console.log('Mega cabill city', postData)

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

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h4' fontSize='21px bold' color='#fff'>
                  Shop
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Home
                    </Typography>
                  </Link>
                  <Link href='/member/ports/' passHref>
                    <Typography color='#fff' variant='h6' fontSize='14px'>
                      Post
                    </Typography>
                  </Link>
                  <Typography color='#fff' variant='h6' fontSize='14px'>
                    Details
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 72, color: '#fff' }} />
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
            <Typography variant='h4' fontSize='24px bold' color='#000' sx={{ marginBottom: 2 }}>
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
                questionData.map((question, index) => (
                  <Card
                    key={index}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      height: '100%',
                      marginBottom: '20px',
                      boxShadow: 2,
                      backgroundColor: question.sender === userId ? '#3A46A7' : '#FFCA64 ' // ตั้งสีพื้นหลังตามเงื่อนไข ไปเปลี่ยนสี blue เป็นสีอื่น
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
                          <Typography variant='h6' fontSize='2.2rem bold' color='#fff'>
                            {question.user_first_name} {question.user_last_name}
                          </Typography>
                        ) : (
                          <Typography variant='h6' fontSize='2.2rem bold' color='#000'>
                            Market
                          </Typography>
                        )}
                        {question.sender === userId && ( // เช็คว่า sender เท่ากับ userId ก่อนแสดง IconButton
                          <IconButton onClick={() => handleDeleteSubmit(question.query_id)}>
                            <DeleteIcon sx={{ fontSize: 28, color: '#fff' }} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%', padding: '0px 20px 20px' }}>
                      <Typography variant='body2' fontSize='1rem' color={question.sender === userId ? '#fff' : '#000'}>
                        {question.query_description}
                      </Typography>
                    </Box>
                  </Card>
                ))
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

export default PosrtDetail
