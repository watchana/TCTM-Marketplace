// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Material UI Imports
import { Box, Button, Dialog, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'

// ** Axios import
import axios from 'axios'

const DialogEdit = ({ open, handleClose, Data }) => {
  const Route = useRouter()

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปรเก็บค่าข้อมูล
  const [title, setTitle] = useState('') // ข้อมูล title
  const [description, setDescription] = useState('') // ข้อมูล description

  // เซตค่า title และ description เมื่อ open มีการเปลี่ยนแปลง
  useEffect(() => {
    if (open) {
      setTitle(Data.req_header)
      setDescription(Data.req_description)
    }
  }, [open, Data.req_description, Data.req_header])

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
        title: 'You did not fill in all the information...',
        text: 'Please fill in all the information.!'
      })

      return
    }

    const data = {
      req_id: Data.req_id,
      req_header: title,
      req_description: description
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API}DIGITAL.requirements.editrequirement`, data)
      .then(response => {
        // ปิด Dialog
        handleClose(false)

        // reset display หลังจากส่งข้อมูลเสร็จ
        Route.replace(Route.asPath, undefined, { scroll: false })
      })
      .catch(error => {
        // console.log(error)
      })
    Swal.fire({
      icon: 'success',
      title: 'Editing completed'
    })

    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Card variant='outlined' sx={{ maxWidth: '600px' }}>
          <CardContent>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Edit Post
            </Typography>
            <Divider sx={{ marginY: '10px' }} />
            <form onSubmit={handleEditSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Title'
                    value={title}
                    onChange={handleTitleChange}
                    variant='outlined'
                    InputProps={{
                      style: {
                        borderRadius: '10px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={handleDesChange}
                    label='Description'
                    variant='outlined'
                    InputProps={{
                      style: {
                        borderRadius: '10px'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      onClick={handleEditSubmit}
                      sx={{ marginRight: 2 }}
                    >
                      Edit
                    </Button>
                    <Button variant='contained' color='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Dialog>
    </div>
  )
}

export default DialogEdit
