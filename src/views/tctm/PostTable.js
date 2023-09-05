// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Axios
import axios from 'axios'

const ProductTable = ({ rows }) => {
  const [tableRows, setTableRows] = useState(rows) //เก็บข้อมูล Row ใน table
  const [SubId, setSubId] = useState(rows) //เก็บข้อมูล Sub id

  // ตัวแปรเก็บ State Select ไว้ชั่วคราว
  const [subIdSelected, setSubIdSelected] = useState(null)

  // console.log(tableRows)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.allsuppliername`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })
        setSubId(Response.data.message.Data)
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
    { field: 'req_id', headerName: 'Req ID', width: 130 },
    {
      field: 'req_header',
      headerName: 'Header Req',
      width: 150
    },
    {
      field: 'approve',
      headerName: 'Approve',
      width: 130,
      sortable: false,
      renderCell: params => {
        const selectedSubId = subIdSelected && subIdSelected[params.row.req_id]

        return (
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleApproveSubmit(params.row.req_id, selectedSubId)}
            disabled={!selectedSubId}
          >
            Approve
          </Button>
        )
      }
    },
    {
      field: 'select',
      headerName: 'Select Sub_id Before Approve',
      width: 280,
      sortable: false,
      renderCell: params => {
        const selectedSubId = subIdSelected && subIdSelected[params.row.req_id]

        return (
          <FormControl fullWidth style={{ marginRight: '10px' }}>
            <InputLabel id={`select-label-${params.row.req_id}`}>SubID</InputLabel>
            <Select
              labelId={`select-label-${params.row.req_id}`}
              id={`select-${params.row.req_id}`}
              value={selectedSubId || ''}
              label='SubID'
              onChange={event =>
                setSubIdSelected({
                  ...subIdSelected,
                  [params.row.req_id]: event.target.value
                })
              }
            >
              {SubId && SubId.length > 0 ? (
                SubId.map(sub => (
                  <MenuItem key={sub.sub_id} value={sub.sub_id}>
                    {sub.sub_name}
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
          <Button variant='contained' color='secondary' onClick={() => handleRejectSubmit(params.row.req_id)}>
            disapproved
          </Button>
        )
      }
    }
  ]

  // ฟังก์ชันสำหรับ Approve DATA
  const handleApproveSubmit = (reqId, subId) => {
    const data = {
      req_id: reqId,
      sub_id: subId
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirementapprove`, data)
      .then(function (response) {
        // หลังจากที่อนุมัติสำเร็จ ลบแถวที่ถูก Approve ออกจากข้อมูล
        const updatedRows = tableRows.filter(row => row.req_id !== reqId)

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
          req_id: reqId
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirementreject`, data)
          .then(function (response) {
            // หลังจากที่แตะเสร็จ ลบแถวที่ถูก แตะ ออกจากข้อมูล
            const updatedRows = tableRows.filter(row => row.req_id !== reqId)

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
    return <div>Loading...</div>
  }

  return (
    <Card>
      <DataGrid
        sx={{ paddingX: '10px' }}
        rows={tableRows}
        columns={columns}
        getRowId={row => row.req_id}
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

export default ProductTable
