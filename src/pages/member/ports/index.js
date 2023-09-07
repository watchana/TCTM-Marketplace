// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

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

const Posts = () => {
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
            </Grid>
          </Card>
        </Box>
      </Box>
      {/* 📨📨 Props 📨📨 */}
      <DialogPost open={openDialogPost} handleClose={() => setOpenDialogPost(false)} userId={userId} />
      {/* 📨📨 Props 📨📨 */}
    </Container>
  )
}

export default Posts
