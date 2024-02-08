import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Chip } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'

const Product = () => {
  const [Productlist, setProductlist] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.product.allproduct`).then(response => {
      console.log('setProduxt:', response.data.message.Data)

      // setProductlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchProductData()
  }, [])

  const fetchProductData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.product.allproduct`)
      .then(response => {
        setProductlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleBanClick = product_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Ban account with ID ${product_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.product.ban`, {
        product_id
      })
      .then(response => {
        console.log('UserID', response)

        // ทำอย่างอื่นตามความต้องการ
        fetchProductData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnbanClick = product_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unban account with ID ${product_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.product.unban`, {
        product_id
      })
      .then(response => {
        console.log('UserID', response)

        // ทำอย่างอื่นตามความต้องการ
        fetchProductData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleActiveClick = product_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Active account with ID ${product_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.product_active`, {
        product_id
      })
      .then(response => {
        // ทำอย่างอื่นตามความต้องการ
        fetchProductData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnactiveClick = product_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unactive account with ID ${product_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.product_unactive`, {
        product_id
      })
      .then(response => {
        console.log('UserID', response)

        // ทำอย่างอื่นตามความต้องการ
        fetchProductData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={Productlist && Productlist.length > 0 ? Productlist.map(val => ({ ...val, id: val.product_id })) : []}
      getRowId={product_id => product_id.id}
      columns={[
        { field: 'product_id', headerName: 'ID', width: 120 },
        {
          field: 'product_status',
          headerName: 'status',
          width: 120,
          renderCell: params => {
            const subStatus = params.value
            let chipColor = 'default'
            let chipLabel = ''

            if (subStatus === '1') {
              chipColor = 'warning'
              chipLabel = 'Waiting for confirmation'
            } else if (subStatus === '2') {
              chipColor = 'success'
              chipLabel = 'normal'
            } else if (subStatus === '0') {
              chipColor = 'error'
              chipLabel = 'Banned'
            } else if (subStatus === '3') {
              chipColor = 'info'
              chipLabel = 'recommend'
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'category_name', headerName: 'Category', width: 150 },
        { field: 'product_name', headerName: 'Product name', width: 300 },
        { field: 'sub_name', headerName: 'Member name', width: 150 },
        {
          field: 'actions',
          headerName: 'Button',
          width: 200,
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.product_status !== '0') {
                    Swal.fire({
                      title: 'Want to ban this store??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Band',
                      cancelButtonText: 'Cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Band Success',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleBanClick(params.row.product_id)
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
                disabled={params.row.product_status === '0' || params.row.product_status === '3'}
              >
                Ban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.product_status !== '2') {
                    Swal.fire({
                      title: 'Do you want to unban this store??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'unbanned',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnbanClick(params.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'Unable to unban.',
                      text: 'Due to confirmed status',
                      icon: 'error'
                    })
                  }
                }}
                disabled={
                  params.row.product_status === '1' ||
                  params.row.product_status === '2' ||
                  params.row.product_status === '3'
                }
              >
                Unban
              </Button>
            </div>
          )
        },
        {
          field: 'recommends',
          headerName: 'Recommend',
          width: 250,
          renderCell: paramsV2 => (
            <div>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (paramsV2.row.product_status !== '0' && paramsV2.row.product_status !== '1') {
                    Swal.fire({
                      title: 'Want to show this item??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Active',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Show data successfully',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleActiveClick(paramsV2.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'Unable to display items',
                      text: 'Due to banned or verified status',
                      icon: 'error'
                    })
                  }
                }}
                disabled={
                  paramsV2.row.product_status === '0' ||
                  paramsV2.row.product_status === '1' ||
                  paramsV2.row.product_status === '3'
                }
              >
                Active
              </Button>

              <Button
                variant='contained'
                color='error'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (paramsV2.row.product_status !== '2') {
                    Swal.fire({
                      title: 'Do you want to stop showing this show?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Unactive',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnactiveClick(paramsV2.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'Unable to unban.',
                      text: 'Due to confirmed status',
                      icon: 'error'
                    })
                  }
                }}
                disabled={
                  paramsV2.row.product_status === '0' ||
                  paramsV2.row.product_status === '1' ||
                  paramsV2.row.product_status === '2'
                }
              >
                Unactive
              </Button>
            </div>
          )
        }
      ]}
    />
  )
}

export default Product
