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
  // ** header table
  const columns = [
    { field: 'account_id', headerName: 'Account Id', width: 130 },
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
      field: 'user_company',
      headerName: 'Company',
      width: 150
    },
    {
      field: 'user_email',
      headerName: 'Email',
      width: 150
    },
    {
      field: 'user_tel',
      headerName: 'Tel',
      width: 150
    },
    {
      field: 'approve',
      headerName: 'Approve',
      sortable: false,
      renderCell: params => {
        return (
          <Button variant='contained' color='primary'>
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
          <Button variant='contained' color='secondary'>
            disapproved
          </Button>
        )
      }
    }
  ]

  // ** when rows is empty, show loading
  if (rows.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <DataGrid
        sx={{ paddingX: '10px' }}
        rows={rows}
        columns={columns}
        getRowId={row => row.account_id}
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
