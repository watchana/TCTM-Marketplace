// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Axios
import axios from 'axios'

const MemberTable = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios
      .get('http://111.223.38.19/api/method/frappe.API.TCTM.approve.userqueue', {
        headers: {
          Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
        }
      })
      .then(response => {
        console.log(response.data.message.Data)
        setRows(response.data.message.Data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const columns = [
    { field: 'account_id', headerName: 'Account Id', width: 70 },
    {
      field: 'member_id',
      headerName: 'Member Id',
      width: 70
    },
    {
      field: 'user_first_name',
      headerName: 'First Name',
      width: 130
    },
    {
      field: 'user_last_name',
      headerName: 'Last Name',
      width: 130
    },
    {
      field: 'user_company',
      headerName: 'Company',
      width: 130
    },
    {
      field: 'user_email',
      headerName: 'Email',
      width: 130
    },
    {
      field: 'user_tel',
      headerName: 'Tel',
      width: 130
    }
  ]

  if (rows.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <DataGrid
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Card>
  )
}

export default MemberTable
