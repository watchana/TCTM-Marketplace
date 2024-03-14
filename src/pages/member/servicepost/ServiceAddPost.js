// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Breadcrumbs, Button, Card, Container, Chip, Divider, Grid, Hidden, Typography } from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios import
import axios from 'axios'

// ** Component Import
import ServicePo from './ServicePost'
import ServiceEdit from './ServiceEdit'

// ** Auth Check
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

const ServicePosts = () => {
  // ** Router ของ Next.js
  const router = useRouter()

  const handleClick = () => {
    // ทำการเด้งไปหน้าอื่น ในที่นี้เราเด้งไปที่หน้า '/otherpage'
    router.push('/member/servicepost/ServicePost')
  }

  // นำเข้าตัวsweetalert2
  const SAlert = require('sweetalert2')
  const [openDialogPost, setOpenDialogPost] = useState(false)
  const [openDialogEdit, setOpenDialogEdit] = useState(false)

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [userStatus, setUserStatus] = useState('') // ข้อมูล user Status
  const [myPose, setMyPose] = useState('') // ข้อมูล My pose
  const [row, setRow] = useState('') // ข้อมูล My pose

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
          `${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.get_all_ser_requirement?user_id=${userId}`
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
    SAlert.fire({
      title: 'Do you want to delete the data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, keep it'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          req_id: reqId
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.deleterequirement`, data)
          .then(function (response) {
            setMyPose(prevData => prevData.filter(myPose => myPose.req_id !== reqId))

            if (response.status === 200) {
              SAlert.fire({
                icon: 'success',
                title: 'Delete completed',
                text: 'You are unable to recover data.'
              })
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

  // ปุ่มควบคุมฟังชัน Edit
  const handleEditButtonClick = row => {
    setRow(row)
    setOpenDialogEdit(true)
  } // นะโมมมมมมมมมมมมมมม!!

  const columns = [
    { field: 'name', headerName: 'ID', minWidth: 100 },
    { field: 'ser_req_header', headerName: 'Title', minWidth: 250 },
    {
      field: 'ser_req_status',
      headerName: 'Po Status',
      minWidth: 200,
      renderCell: rowCell => {
        const reqStatus = rowCell.value
        if (reqStatus === '1') {
          return <Chip label='Wait Digital2day Approve' color='warning' />
        } else if (reqStatus === '2') {
          return <Chip label='Wait for Po Approve' color='primary' />
        } else if (reqStatus === '3') {
          return <Chip label='Wait for Shipping' color='primary' />
        } else if (reqStatus === '4') {
          return <Chip label='Success' color='success' />
        } else {
          return <Chip label='Unknow' color='secondary' />
        }
      }
    },
    {
      field: 'creation',
      headerName: 'Post time',
      minWidth: 200,

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
      minWidth: 150,
      renderCell: rowCell => {
        const handleDetailClick = () => {
          router.push(
            `/member/servicepost/servicechat?ser_req_id=${rowCell.row.ser_req_id}&ser_id=${rowCell.row.ser_id}`
          )
        }

        return (
          <Button
            variant='outlined'
            onClick={handleDetailClick}
            endIcon={<EyeOutline />}
            disabled={rowCell.row.ser_req_status === '1'}
          >
            View
          </Button>
        )
      }
    }

    // {
    //   field: 'detailpost',
    //   headerName: 'Detail Post',
    //   minWidth: 150,
    //   renderCell: rowCell => {
    //     const handleDetailClick = () => {
    //       router.push(`/member/servicepost/Servicepostdetail/?ser_req_id=${rowCell.row.ser_req_id}`)
    //     }

    //     return (
    //       <Button disabled={rowCell.row.ser_req_status === '1'} variant='contained' onClick={handleDetailClick}>
    //         Detail Post
    //       </Button>
    //     )
    //   }
    // }

    // {
    //   field: 'Edit',
    //   headerName: 'Edit Port',
    //   minWidth: 150,
    //   renderCell: rowCell => (
    //     <Button variant='contained' onClick={() => handleEditButtonClick(rowCell.row)} endIcon={<EditIcon />}>
    //       Edit
    //     </Button>
    //   )
    // },
    // {
    //   field: 'Delete',
    //   headerName: 'Delete',
    //   width: 80,
    //   renderCell: cellValues => {
    //     return (
    //       <Button variant='text' onClick={() => handleDeleteSubmit(cellValues.row.req_id)} color='error'>
    //         <DeleteIcon />
    //       </Button>
    //     )
    //   }
    // }
  ]

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* ---------- content ---------- */}
        <Box sx={{ width: '100%' }}>
          <Card variant='outlined'>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1rem 0rem'
                  }}
                >
                  <Typography
                    variant='h5'
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' },

                      fontWeight: 'bold',
                      textAlign: 'center',
                      padding: '12px'
                    }}
                  >
                    My Posts
                  </Typography>
                  {/* ---------- Button POST ---------- */}
                  <Button variant='contained' onClick={handleClick}>
                    ADD Post
                  </Button>
                </Box>
                <Divider />
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', height: '100%', padding: '1rem' }}>
                    {myPose && myPose.length > 0 ? (
                      <DataGrid
                        rows={myPose}
                        columns={columns}
                        getRowId={row => row.ser_req_id}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                      />
                    ) : (
                      <div>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography
                            variant='subtitle1'
                            sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                          >
                            There is no post information.
                          </Typography>
                        </Box>
                      </div>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}

      <ServiceEdit open={openDialogEdit} handleClose={() => setOpenDialogEdit(false)} Data={row} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default withAuth(ServicePosts)
