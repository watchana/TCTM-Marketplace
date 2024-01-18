import React, { useState, useEffect } from 'react'
import { Button, Input, Grid, TextField, Stack, Box, Typography, Card, Link } from '@mui/material'
import Plus from 'mdi-material-ui/Plus'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

// ** Next Imports
import { useRouter } from 'next/router'

const Information = subId => {
  const router = useRouter()
  const Swal = require('sweetalert2')

  const [dataInformation, setDataInformation] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinf`, {
        params: {
          sub_id: subId.sub_id
        }
      })
      .then(res => {
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

  const columns = [
    { field: 'post_id', headerName: 'Information ID  ', width: 150 },
    { field: 'post_name', headerName: 'Title ', width: 350 },
    {
      field: 'actions',
      headerName: 'Delete',
      width: 120,
      renderCell: params => (
        <Button variant='contained' color='error' onClick={e => handleDelete(params.row.post_id, e)}>
          Delete
        </Button>
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
  ]

  useEffect(() => {
    console.log('sub', subId)
  }, [subId])

  const HandleLink = () => {
    router.push(`/market/add-information/?sub_id=${subId.sub_id}`)
  }

  //==================================ฟังชันค้นหาข้อมูล==================================//
  const [searchText, setSearchText] = useState('') // ฟังก์ชัน Search

  const filteredRows = dataInformation
    ? dataInformation.filter(row => {
        // กรองข้อมูลตาม product_name ที่มี searchText
        return row.post_name?.toLowerCase().includes(searchText.toLowerCase())
      })
    : []

  return (
    <Grid container spacing={3} alignItems='center'>
      <Grid item xl={6} lg={6} md={8} sm={8} xs={8}>
        <TextField
          fullWidth
          size='small'
          label='Search '
          variant='outlined'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Grid>
      <Grid item xl={1} lg={1} md={4} sm={4} xs={4}>
        <Button fullWidth variant='outlined' sx={{ height: '100%' }} onClick={() => setSearchText('')}>
          Reset
        </Button>
      </Grid>

      <Grid item xl={5} lg={5} md={12} sm={12} xs={12}>
        <Box>
          <Button variant='contained' color='primary' startIcon={<Plus />} fullWidth onClick={HandleLink}>
            Add Information
          </Button>
        </Box>
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 1 }}>
          <Typography variant='body1' fontSize='1.5rem bold' color='#000'>
            {filteredRows.length} Information
          </Typography>
        </Box>
      </Grid>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        {dataInformation ? (
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={row => row.post_id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5]}
          />
        ) : (
          <Typography variant='body1' fontSize='1.0rem' color='#000'>
            No data
          </Typography>
        )}
      </Box>
    </Grid>
  )
}

export default Information
