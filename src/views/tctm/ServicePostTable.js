// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Typography, Card, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Axios
import axios from 'axios'

const ServiceTable = ({ rows }) => {
  const [tableRows, setTableRows] = useState(rows) //เก็บข้อมูล Row ใน table
  const [SerID, setSerID] = useState(rows) //เก็บข้อมูล Sub id
  console.log('SerID999', SerID)

  // ตัวแปรเก็บ State Select ไว้ชั่วคราว
  const [SerIDSelected, setSerIDSelected] = useState(null)

  // console.log(tableRows)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.all_ser_servicename`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })
        setSerID(Response.data.message.Data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ** header table
  const columns = [
    { field: 'ser_req_id', headerName: 'Req ID', width: 130 },
    {
      field: 'ser_req_header',
      headerName: 'Header Req',
      width: 150
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 130,
      sortable: false,
      renderCell: params => {
        const selectedSerID = SerIDSelected && SerIDSelected[params.row.ser_req_id]

        return (
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleApproveSubmit(params.row.ser_req_id, selectedSerID)}
            disabled={!selectedSerID}
          >
            Approve
          </Button>
        )
      }
    },
    {
      field: 'select',
      headerName: 'Select Ser_id Before Approve',
      width: 280,
      sortable: false,
      renderCell: params => {
        const selectedSerID = SerIDSelected && SerIDSelected[params.row.ser_req_id]

        return (
          <FormControl fullWidth style={{ marginRight: '10px' }} size='small'>
            <InputLabel id={`select-label-${params.row.ser_req_id}`}>SerID</InputLabel>
            <Select
              labelId={`select-label-${params.row.ser_req_id}`}
              id={`select-${params.row.ser_req_id}`}
              value={selectedSerID || ''}
              label='SerID'
              onChange={event =>
                setSerIDSelected({
                  ...SerIDSelected,
                  [params.row.ser_req_id]: event.target.value
                })
              }
            >
              {SerID && SerID.length > 0 ? (
                SerID.map(ser => (
                  <MenuItem key={ser.ser_id} value={ser.ser_id}>
                    {ser.ser_fname}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value=''>No data</MenuItem>
              )}
            </Select>
          </FormControl>
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
          <Button variant='contained' color='secondary' onClick={() => handleRejectSubmit(params.row.ser_req_id)}>
            disapproved
          </Button>
        )
      }
    }
  ]

  // ฟังก์ชันสำหรับ Approve DATA
  const handleApproveSubmit = (reqId, SerID) => {
    const data = {
      ser_req_id: reqId,
      ser_id: SerID
    }

    console.log('dataapprove', data)

    axios
      .put(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirement_ser_approve`, data)
      .then(function (response) {
        // หลังจากที่อนุมัติสำเร็จ ลบแถวที่ถูก Approve ออกจากข้อมูล
        const updatedRows = tableRows.filter(row => row.ser_req_id !== reqId)

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
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Approve Error',
          text: 'Something went wrong!'
        })
      })
  }

  // ฟังก์ชันสำหรับ  Band ร้านค้า
  const handleRejectSubmit = reqId => {
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
          ser_req_id: reqId
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirement_ser_reject`, data)
          .then(function (response) {
            // หลังจากที่แตะเสร็จ ลบแถวที่ถูก แตะ ออกจากข้อมูล
            const updatedRows = tableRows.filter(row => row.ser_req_id !== reqId)

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
            console.log(error)
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
        rows={tableRows}
        columns={columns}
        getRowId={row => row.ser_req_id}
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
