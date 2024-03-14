// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Axios
import axios from 'axios'

// ** Custom Components
// ** merge first name and last name
function getFullName(params) {
  return `${params.row.user_first_name || ''} ${params.row.user_last_name || ''}`
}

const MemberTable = ({ rows }) => {
  const [tableRows, setTableRows] = useState(rows) //เก็บข้อมูล Row ใน table

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ** header table
  const columns = [
    { field: 'sub_id', headerName: 'Account Id', width: 130 },
    {
      field: 'sub_name',
      headerName: 'Market name',
      width: 150
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 160,
      valueGetter: getFullName
    },
    {
      field: 'user_company',
      headerName: 'Company',
      width: 150
    },
    {
      field: 'sub_tel',
      headerName: 'Tel',
      width: 150
    },
    {
      field: 'approve',
      headerName: 'Approve',
      sortable: false,
      renderCell: params => {
        return (
          <Button variant='contained' color='primary' onClick={() => handleApproveSubmit(params.row.sub_id)}>
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
          <Button variant='contained' color='secondary' onClick={() => handleRejectSubmit(params.row.sub_id)}>
            disapproved
          </Button>
        )
      }
    }
  ]

  // ฟังก์ชันสำหรับ Approve DATA
  const handleApproveSubmit = id => {
    const data = {
      sub_id: id
    }

    axios
      .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.supplierapprove`, data)
      .then(function (response) {
        // หลังจากที่อนุมัติสำเร็จ ลบแถวที่ถูก Approve ออกจากข้อมูล
        const updatedRows = tableRows.filter(row => row.sub_id !== id)

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

  // ฟังก์ชันสำหรับ  Band ร้านค้า
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
          sub_id: id
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}DIGITAL.approve.supplierreject`, data)
          .then(function (response) {
            // หลังจากที่แตะเสร็จ ลบแถวที่ถูก แตะ ออกจากข้อมูล
            const updatedRows = tableRows.filter(row => row.sub_id !== id)

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
    return <div>Loading...</div>
  }

  return (
    <Card>
      <DataGrid
        sx={{ paddingX: '10px' }}
        rows={tableRows}
        columns={columns}
        getRowId={row => row.sub_id}
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

export default MemberTable
