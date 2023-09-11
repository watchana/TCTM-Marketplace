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

const DialogEdit = ({ open, handleClose, Data }) => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

console.log('Data Svj', Data)

  // ตัวแปรเก็บค่าข้อมูล
  const [title, setTitle] = useState('') // ข้อมูล title
  const [description, setDescription] = useState('') // ข้อมูล description

  // เซตค่า title และ description เมื่อ open มีการเปลี่ยนแปลง
  useEffect(() => {
    if (open) {
      setTitle(Data.req_header)
      setDescription(Data.req_description)
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
  const handleEditSubmit = e => {
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
      req_id: Data.req_id,
      req_header: title,
      req_description: description
    }

    console.log('ข้อมูลตอนส่ง',data)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.requirements.editrequirement`, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'แก้ไขข้อมูลแล้วเสร็จ'
    })

    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ width: '100%', padding: 4 }}>
            <Typography variant='h4' fontSize={'36 bold'}>
              Edit Post
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
          <Box sx={{ width: '100%', padding: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button variant='contained' color='primary' sx={{ marginRight: 4 }} onClick={handleEditSubmit}>
              Edit
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

export default DialogEdit
