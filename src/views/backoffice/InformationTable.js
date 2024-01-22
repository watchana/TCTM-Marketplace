import React, { useState, useEffect } from 'react'
import { Button, Input, Grid, TextField, Stack, Box, Typography, Card, Link } from '@mui/material'
import Plus from 'mdi-material-ui/Plus'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { StyledDataGrid } from 'src/views/backoffice/styled'

// ** Next Imports
import { useRouter } from 'next/router'

const InformationTable = () => {
  const router = useRouter()
  const Swal = require('sweetalert2')

  const [dataInformation, setDataInformation] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.tctmgetallinf`).then(res => {
      setDataInformation(res.data.message.Data)
    })
  }, [])

  const handleDelete = primary => {
    Swal.fire({
      title: 'You Want to Delete Data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          // table: 'informationsV2',
          post_id: primary
        }

        if (primary !== '') {
          console.log('post_id : ', data)
          axios
            .put(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.deleteinf`, data)
            .then(function (response) {
              console.log(response)

              Swal.fire({
                icon: 'success',
                title: 'Delete Success'
              })
            })
            .catch(function (error) {
              console.log(error)

              Swal.fire({
                icon: 'error',
                title: 'Errorr'
              })
            })
        } else {
          console.log('Error')
        }
      } else if (result.isDenied) {
        console.log('cancelled Error')
      }
    })
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={dataInformation?.map(val => ({ ...val, id: val.post_id.toString() })) || []} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={post_id => post_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'post_id', headerName: 'Information ID  ', width: 150 },
        { field: 'post_name', headerName: 'Title ', width: 350 },
        {
          field: 'Acction',
          headerName: 'Acction',
          width: 200,
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='error'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.account_status !== '0') {
                    Swal.fire({
                      title: 'Want to ban this user??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'yes',
                      cancelButtonText: 'no'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleBanClick(params.row.post_id)
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'band success',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'cannot be banned',
                      text: 'Because the status has been banned.',
                      icon: 'error'
                    })
                  }
                }}
                disabled={params.row.account_status === '0'}
              >
                Hide
              </Button>

              <Button variant='contained' color='secondary' onClick={e => handleDelete(params.row.post_id, e)}>
                Delete
              </Button>
            </div>
          )
        },

        {
          field: 'Details',
          headerName: 'Details',
          width: 120,
          renderCell: params => (
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                router.push(`/market/information-detail/?post_id=${params.row.post_id}`)
              }}
            >
              Details
            </Button>
          )
        }
      ]}
    />
  )
}

export default InformationTable
