// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'

const DialogPost = ({ open, handleClose, userId }) => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // console.log('User Dialog', userId)

  // ตัวแปรเก็บค่าข้อมูล
  const [title, setTitle] = useState('') // ข้อมูล title
  const [description, setDescription] = useState('') // ข้อมูล description

  // เซตค่า title และ description เมื่อ open มีการเปลี่ยนแปลง
  useEffect(() => {
    if (open) {
      setTitle('')
      setDescription('')
    }
  }, [open])

  // ฟังชันเก็บค่าข้อมูล
  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDesChange = event => {
    setDescription(event.target.value)
  }

  // ฟังก์ชัน Insert Data
  const handleInsertSubmit = e => {
    e.preventDefault()

    // ตรวจสอบค่าว่างใน TextField
    if (!title || !description) {
      handleClose()
      Swal.fire({
        icon: 'error',
        title: 'คุณกรอกข้อมูลไม่ครบ...',
        text: 'กรุณาระบุข้อมูลให้ครบถ้วน!'
      })

      return
    }

    const data = {
      user_id: userId,
      req_header: title,
      req_description: description
    }

    console.log(data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.postrequirement`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'เพิ่มข้อมูลแล้วเสร็จ กรุณารอการยืนยัน'
    })

    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', padding: 4 }}>
            <Typography variant='h4' fontSize={'36 bold'}>
              Create post
            </Typography>
          </Box>
          <Box sx={{ width: '600px', padding: 4 }}>
            <TextField
              fullWidth
              label='Title'
              value={title}
              onChange={handleTitleChange}
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box>
          <Box sx={{ width: '600px', paddingX: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={5}
              value={description}
              onChange={handleDesChange}
              label='Description'
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box>
          {/* <Box sx={{ width: '600px', padding: 4 }}>
            <TextField
              fullWidth
              label='Desired Price'
              value={price}
              onChange={handlePriceChange}
              variant='outlined'
              InputProps={{
                style: {
                  borderRadius: '7px'
                }
              }}
            />
          </Box> */}
          <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant='contained' color='primary' sx={{ marginRight: 4 }} onClick={handleInsertSubmit}>
              POST
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              CANCEL
            </Button>
          </Box>
        </Paper>
      </Dialog>
    </div>
  )
}

export default DialogPost
