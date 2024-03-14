// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Card, Button, Typography, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Axios
import axios from 'axios'

import { useRouter } from 'next/router'

// ** Custom Components
// ** merge first name and last name
function getFullName(params) {
  return `${params.row.ser_name || ''} ${params.row.ser_lname || ''}`
}

const ServiceTable = ({ rows }) => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const [tableRows, setTableRows] = useState(rows) //เก็บข้อมูล Row ใน table
  const router = useRouter() // เรียกใช้งาน Router

  const rounter = useRouter()
  const member_id = rounter.query
  const memID = member_id

  const handleDownload = async fileName => {
    try {
      // แสดงกล่องข้อความยืนยันด้วย SweetAlert
      const result = await Swal.fire({
        title: `You want to download resume file?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })

      if (result.isConfirmed) {
        const downloadResponse = await fetch('/api/resumeFile_dowload', {
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
        } else {
          console.error('Error downloading document:', downloadResponse.statusText)
        }
      } else {
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  // ** header table
  const columns = [
    { field: 'ser_id', headerName: 'Account Id', width: 130 },
    {
      field: 'member_id',
      headerName: 'Member Id',
      width: 150
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 160,
      valueGetter: getFullName
    },
    {
      field: 'ser_email',
      headerName: 'Email',
      width: 150
    },
    {
      field: 'ser_phone',
      headerName: 'Tel',
      width: 150
    },
    {
      field: 'approve',
      headerName: 'Approve',
      sortable: false,
      renderCell: params => {
        return (
          <Button
            variant='contained'
            color='success'
            onClick={() => handleApproveSubmit(params.row.ser_id, params.row.member_id)}
          >
            approve
          </Button>
        )
      }
    },
    {
      field: 'disapproved',
      headerName: 'Disapproved',
      sortable: false,
      width: 150,
      renderCell: params => {
        return (
          <Button variant='contained' color='secondary' onClick={() => handleRejectSubmit(params.row.ser_id)}>
            disapproved
          </Button>
        )
      }
    },
    {
      field: 'detail',
      headerName: 'Detail',
      sortable: false,
      width: 150,
      renderCell: params => {
        return (
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              router.push(`
                    /member/medalformservice/?ser_id=${params.row.ser_id}`)
            }}
          >
            Details
          </Button>
        )
      }
    },
    {
      field: 'resume',
      headerName: 'Resume file',
      width: 250, // ปรับขนาดตามความต้องการ
      renderCell: params => (
        <div>
          {' '}
          <Tooltip title='This is the resume file from service register'>
            <Button
              style={{ marginRight: '5px' }}
              variant='contained'
              color='success'
              onClick={() => handleDownload(params.row.ser_filedame)}
            >
              Download
            </Button>
          </Tooltip>
        </div>
      )
    }
  ]

  // เซตค่า Rows เมื่อเปิดหน้าครั้งแรก
  useEffect(() => {
    setTableRows(rows)
  }, [rows])

  // ฟังก์ชันสำหรับ Approve DATA
  const handleApproveSubmit = (id, memID) => {
    const data = {
      ser_id: id,
      member_id: memID
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.serviceapprove`, data)
      .then(function (response) {
        // หลังจากที่อนุมัติสำเร็จ ลบแถวที่ถูก Approve ออกจากข้อมูล
        const updatedRows = tableRows.filter(row => row.ser_id !== id)

        setTableRows(updatedRows)

        Swal.fire({
          icon: 'success',
          title: 'Approve success',
          text: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(function (error) {
        // console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Approve Error',
          text: 'Something went wrong!'
        })
      })
  }

  // ฟังก์ชันสำหรับ  Band User
  const handleRejectSubmit = id => {
    // แสดงกล่องข้อความยืนยัน
    Swal.fire({
      title: 'Confirm Reject',
      text: 'Are you sure you want to reject this submission?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject'
    }).then(result => {
      // ถ้าผู้ใช้กดปุ่ม Confirm (Yes)
      if (result.isConfirmed) {
        const data = {
          ser_id: id
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.servicereject`, data)
          .then(function (response) {
            // หลังจากที่แตะเสร็จ ลบแถวที่ถูก แตะ ออกจากข้อมูล
            const updatedRows = tableRows.filter(row => row.ser_id !== id)

            setTableRows(updatedRows)

            Swal.fire({
              icon: 'success',
              title: 'Reject success',
              text: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(function (error) {
            // console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Reject Error',
              text: 'Something went wrong!'
            })
          })
      }
    })
  }

  // ** when rows is empty, show loading
  if (rows.length === 0) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h6' fontSize='16px bold' color='#000'>
          No data
        </Typography>
      </Box>
    )
  }

  return (
    <Card>
      <DataGrid
        sx={{ paddingX: '10px' }}
        rows={(tableRows || [])
          .filter(val => val.ser_status === '1')
          .map(val => ({ ...val, id: val.ser_id.toString() }))}
        columns={columns}
        getRowId={row => row.ser_id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Card>
  )
}

export default ServiceTable
