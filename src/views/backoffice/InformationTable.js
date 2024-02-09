import React, { useState, useEffect } from 'react'
import { Button, Input, Grid, TextField, Stack, Box, Typography, Card, Link, Chip } from '@mui/material'
import Plus from 'mdi-material-ui/Plus'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const InformationTable = () => {
  const router = useRouter()
  const [dataInformation, setDataInformation] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.post.allpost`).then(res => {
      setDataInformation(res.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.post.allpost`)
      .then(response => {
        setDataInformation(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleBanClick = post_id => {
    console.log(`Ban account with ID ${post_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.post.banpost`, {
        post_id: post_id
      })
      .then(response => {
        console.log('UserID', response)
        fetchUserData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnbanClick = postId => {
    Swal.fire({
      title: 'You Want to hide Data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        if (postId !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.post.unbanpost`, {
              post_id: postId
            })
            .then(response => {
              console.log(response)
              fetchUserData()

              Swal.fire({
                icon: 'success',
                title: 'Delete Success'
              })
            })
            .catch(error => {
              console.log(error)

              Swal.fire({
                icon: 'error',
                title: 'Error'
              })
            })
        } else {
          console.log('Error')
        }
      } else if (result.isDenied) {
        console.log('Cancelled Error')
      }
    })
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={dataInformation?.map(val => ({ ...val, id: val.post_id.toString() })) || []}
      getRowId={post_id => post_id.id}
      columns={[
        { field: 'post_id', headerName: 'Information ID', width: 150 },
        {
          field: 'post_status',
          headerName: 'Post status',
          width: 120,
          renderCell: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
            let chipColor = 'default'
            let chipLabel = ''

            if (subStatus === '0') {
              chipColor = 'error'
              chipLabel = 'Hide Post'
            } else if (subStatus === '1') {
              chipColor = 'success'
              chipLabel = 'Show Post'
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'post_name', headerName: 'Title', width: 350 },

        {
          field: 'Acction',
          headerName: 'Action',
          width: 200,
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='success'
                disabled={params.row.post_status === '1'}
                onClick={e => handleUnbanClick(params.row.post_id, e)}
              >
                Unhide
              </Button>

              <Button
                variant='contained'
                color='error'
                className='btn btn-info'
                disabled={params.row.post_status === '0'}
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.post_status !== '0') {
                    Swal.fire({
                      title: 'Want to Unhide this post?',
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
                          title: 'Unhide success',
                          showConfirmButton: false,
                          timer: 1500
                        })
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'Cannot be Unhide',
                      text: 'Because the status has been banned.',
                      icon: 'error'
                    })
                  }
                }}
              >
                Hide
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
              disabled={params.row.post_status === '1'}
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
