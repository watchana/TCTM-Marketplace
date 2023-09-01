import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Chip } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'

const Product = () => {
  const [Productlist, setProductlist] = useState([])

  useEffect(() => {
    axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.product.allproduct').then(response => {
      console.log('setProduxt:', response.data.message.Data)
      setProductlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchProductData()
  }, [])

  const fetchProductData = () => {
    axios
      .get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.product.allproduct')
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
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.product.ban', {
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
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.product.unban', {
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
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.product_active', {
        product_id
      })
      .then(response => {
        console.log('bill_id', response)
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
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.home_page.product_unactive', {
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
      rows={Productlist.map(val => ({ ...val, id: val.product_id }))} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={product_id => product_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'product_id', headerName: 'ID', width: 120 },
        {
          field: 'product_status',
          headerName: 'สถานะ',
          width: 120,
          renderCell: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
            let chipColor = 'default'
            let chipLabel = ''

            if (subStatus === '1') {
              chipColor = 'warning'
              chipLabel = 'รอการยืนยัน'
            } else if (subStatus === '2') {
              chipColor = 'success'
              chipLabel = 'ปกติ'
            } else if (subStatus === '0') {
              chipColor = 'error'
              chipLabel = 'โดนแบน'
            } else if (subStatus === '3') {
              chipColor = 'info'
              chipLabel = 'แนะนำ'
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'category_name', headerName: 'หมวดหมู่', width: 250 },
        { field: 'product_name', headerName: 'ชื่อสินค้า', width: 200 },
        { field: 'sub_name', headerName: 'ชื่อสมาชิก', width: 150 },
        {
          field: 'actions',
          headerName: 'ปุ่ม',
          width: 400,
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
                      title: 'ต้องการที่จะแบนร้านค้านี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'แบน',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'แบนเรียบร้อย',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleBanClick(params.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถแบนได้',
                      text: 'เนื่องจากสถานะถูกแบนแล้ว',
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
                      title: 'คุณต้องการที่จะปลดแบนร้านค้านี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'ปลดแบน',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnbanClick(params.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถยกเลิกการแบนได้',
                      text: 'เนื่องจากสถานะยืนยันแล้ว',
                      icon: 'error'
                    })
                  }
                }}
                disabled={params.row.product_status === '1' || params.row.product_status === '2' || params.row.product_status === '3'}
              >
                Unban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.product_status !== '0' && params.row.product_status !== '1') {
                    Swal.fire({
                      title: 'ต้องการที่จะแสดงรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Active',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'แสดงเรียบร้อย',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleActiveClick(params.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถแสดงรายการได้',
                      text: 'เนื่องจากสถานะถูกแบนหรือยืนยันแล้ว',
                      icon: 'error'
                    })
                  }
                }}
                disabled={params.row.product_status === '0' || params.row.product_status === '1' || params.row.product_status === '3'}
              >
                Active
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.product_status !== '2') {
                    Swal.fire({
                      title: 'คุณต้องการที่จะหยุดแสดงรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Unactive',
                      cancelButtonText: 'ยกเลิก'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnactiveClick(params.row.product_id)
                      }
                    })
                  } else {
                    Swal.fire({
                      title: 'ไม่สามารถยกเลิกการแบนได้',
                      text: 'เนื่องจากสถานะยืนยันแล้ว',
                      icon: 'error'
                    })
                  }
                }}
                disabled={
                  params.row.product_status === '0' || params.row.product_status === '1' || params.row.product_status === '2'
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
