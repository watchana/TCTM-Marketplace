// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ButtonBase from '@mui/material/ButtonBase'
import Breadcrumbs from '@mui/material/Breadcrumbs'

// ** Icons MUI Imports
import DeleteIcon from '@mui/icons-material/Delete'

// ** Icons MDI Imports
import Send from 'mdi-material-ui/Send'
import MessageText from 'mdi-material-ui/MessageText'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Imports components 📨
import DialogPost from './components/dialogPost'

// ** axios import
import axios from 'axios'

const Requirements = () => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  const [openDialogPost, setOpenDialogPost] = useState(false)

  // ตัวแปรเก็บค่าข้อมูล
  const [userId, setUserId] = useState('') // ข้อมูล user_Id
  const [myPose, setMyPose] = useState('') // ข้อมูล My pose

  // รับค่าข้อมูล จาก local Storage
  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  // ดึงข้อมูล My pose จาก Api
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}TCTM.requirements.allrequirement?user_id=${userId}`
      )
      setMyPose(response.data.message.Data)
    } catch (error) {
      console.error(error)
    }
  }, [userId])

  // เรียกใช้ fetchData ทุกครั้งที่ User Id เปลียนแปลง
  useEffect(() => {
    fetchData()
  }, [userId, fetchData])

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

            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'ลบข้อมูลแล้วเสร็จ',
                text: 'คุณไม่สามารถกู้คืนข้อมูลได้แล้ว'
              })
              fetchData()
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

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/designs/requirements/'>
              My Requirements
            </Link>
          </Breadcrumbs>
        </Box>

        {/* ชื่อหน้า */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Typography variant='h4' fontSize={36}>
            My Requirements
          </Typography>
          {/* ปุ่ม POST */}
          <Button variant='contained' color='primary' endIcon={<Send />} onClick={() => setOpenDialogPost(true)}>
            POST
          </Button>
        </Box>

        {/* เนื้อหา */}
        <Box sx={{ width: '100%', marginY: 4 }}>
          <Grid container spacing={10}>
            {myPose === undefined ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '300px'
                }}
              >
                Loading...
              </div>
            ) : myPose.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '300px'
                }}
              >
                No Data
              </div>
            ) : (
              myPose.map(poseData => (
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={poseData.req_id}>
                  <Box sx={{ width: '100%', height: '150px', bgcolor: '#fff', borderRadius: '10px' }}>
                    {/* ลิงค์ไปอีกหน้า */}
                    <ButtonBase href='/designs/requirementsDetail' sx={{ width: '100%', height: '120px' }}>
                      <Box sx={{ width: '100%', height: '120px' }}>
                        <Box sx={{ width: '100%', height: '50px', padding: 2 }}>
                          {/* หัวข้อ */}
                          <Typography
                            variant='h4'
                            align='start'
                            fontSize={36}
                            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                          >
                            {poseData.req_header}
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', height: '70px', paddingY: 6, paddingX: 3 }}>
                          {/* เนื้อหา */}
                          <Typography
                            variant='body2'
                            noWrap
                            sx={{
                              wordWrap: 'break-word'
                            }}
                          >
                            {poseData.req_description}
                          </Typography>
                        </Box>
                      </Box>
                    </ButtonBase>
                    <Box
                      sx={{
                        width: '100%',
                        height: '30px',
                        paddingX: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'flex-start'
                      }}
                    >
                      <IconButton onClick={() => handleDeleteSubmit(poseData.req_id)}>
                        {/* ปุ่มลบ */}
                        <DeleteIcon />
                      </IconButton>
                      <MessageText />
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}
      <DialogPost open={openDialogPost} handleClose={() => setOpenDialogPost(false)} userId={userId} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default Requirements
