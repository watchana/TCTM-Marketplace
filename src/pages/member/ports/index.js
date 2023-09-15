// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import CardActionArea from '@mui/material/CardActionArea'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** MDI Icon Imports
import Send from 'mdi-material-ui/Send'
import CircleSmall from 'mdi-material-ui/CircleSmall'

// ** axios import
import axios from 'axios'

// ** component Import
import DialogPost from './DialogPost'
import DialogEdit from './DialogEdit'

const Posts = () => {
  // ** Router ของ Next.js
  const router = useRouter()

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const [openDialogPost, setOpenDialogPost] = useState(false)
  const [openDialogEdit, setOpenDialogEdit] = useState(false)

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [userStatus, setUserStatus] = useState('') // ข้อมูล user Status
  const [myPose, setMyPose] = useState('') // ข้อมูล My pose
  const [row, setRow] = useState('') // ข้อมูล My pose

  console.log('myPose', myPose)

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    const userStatusFromLocalStorage = localStorage.getItem('User_Status')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
      setUserStatus(userStatusFromLocalStorage)
    }
  }, [])

  // ดึงข้อมูล My pose จาก Api
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูล
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}TCTM.requirements.allrequirement?user_id=${userId}`
        )
        setMyPose(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    if (!openDialogPost || openDialogEdit) {
      fetchData()
    }
  }, [userId, openDialogPost, openDialogEdit])

  // ฟังก์ชันลบข้อมูล
  const handleDeleteSubmit = reqId => {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          req_id: reqId
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.deleterequirement`, data)
          .then(function (response) {
            console.log(response)
            setMyPose(prevData => prevData.filter(myPose => myPose.req_id !== reqId))

            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })
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

  // ปุ่มควบคุมฟังชัน Edit
  const handleEditButtonClick = row => {
    setRow(row)
    setOpenDialogEdit(true)
  } // นะโมมมมมมมมมมมมมมม!!

  const columns = [
    { field: 'req_id', headerName: 'ID', minWidth: 100 },
    { field: 'req_header', headerName: 'Title', minWidth: 160 },
    {
      field: 'req_status',
      headerName: 'Po Status',
      minWidth: 125,
      valueFormatter: params => {
        const reqStatus = params.value

        if (reqStatus === '1') {
          return 'wait'
        } else if (reqStatus === '2') {
          return 'Normal'
        } else if (reqStatus === '3') {
          return 'Success'
        } else {
          return 'Unknow'
        }
      }
    },
    {
      field: 'creation',
      headerName: 'post time',
      minWidth: 250,

      // ตัดค่าข้างหลังให้แสดงถึงแค่เวลา
      valueFormatter: params => {
        const creation = params.value
        const formattedCreation = creation.substr(0, 19)

        return formattedCreation
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      minWidth: 100,
      renderCell: rowCell => {
        const handleDetailClick = () => {
          router.push(
            `/member/port-detail-member/?req_id=${rowCell.row.req_id}&sub_id=${rowCell.row.sub_id}&member_id2=${rowCell.row.member_id}`
          )
        }

        return (
          <Button variant='contained' onClick={handleDetailClick}>
            Detail
          </Button>
        )
      }
    },
    {
      field: 'Edit',
      headerName: 'Edit Data',
      minWidth: 100,
      renderCell: rowCell => (
        <Button variant='contained' onClick={() => handleEditButtonClick(rowCell.row)}>
          Edit
        </Button>
      )
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 100,
      renderCell: cellValues => {
        return (
          <Button variant='text' onClick={() => handleDeleteSubmit(cellValues.row.req_id)}>
            Delete
          </Button>
        )
      }
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
                  Posts
                </Typography>
                <Typography variant='body1' fontSize='1.3rem bold'>
                  Tell me your requirements
                </Typography>
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
          <Card>
            <Grid container direction='column'>
              <Grid item>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4 }}>
                  <Typography variant='h6' fontSize='1.3rem bold'>
                    My Posts
                  </Typography>
                  {/* ปุ่ม POST */}
                  <Button variant='contained' color='primary' onClick={() => setOpenDialogPost(true)}>
                    ADD POST
                  </Button>
                </Box>
              </Grid>
              <Divider />
              <Grid item sx={{ paddingX: 2, paddingBottom: 2 }}>
                {myPose && myPose.length > 0 ? (
                  <DataGrid
                    rows={myPose}
                    columns={columns}
                    getRowId={row => row.req_id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                  />
                ) : (
                  <div>No data</div>
                )}
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}
      <DialogPost open={openDialogPost} handleClose={() => setOpenDialogPost(false)} userId={userId} />
      <DialogEdit open={openDialogEdit} handleClose={() => setOpenDialogEdit(false)} Data={row} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default Posts
