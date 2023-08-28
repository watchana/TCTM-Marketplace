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

  const handleDeleteClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Delete
    console.log(`Delete account with ID ${account_id}`)
  }

  const handleUndeleteClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Undelete
    console.log(`Undelete account with ID ${account_id}`)
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
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'category_name', headerName: 'หมวดหมู่', width: 250 },
        { field: 'product_name', headerName: 'ชื่อสินค้า', width: 200 },
        { field: 'sub_name', headerName: 'ชื่อสมาชิก', width: 150 },
        { field: 'product_price', headerName: 'ราคา', width: 120 },
        {
          field: 'actions',
          headerName: 'ปุ่ม',
          width: 250, // ปรับขนาดตามความต้องการ
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
                      title: 'ต้องการที่จะแบนรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'แบน',
                      cancelButtonText: 'ปลดแบน'
                    }).then(result => {
                      if (result.isConfirmed) {
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
                disabled={params.row.product_status === '0'}
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
                      title: 'คุณต้องการที่จะปลดแบนรายการนี้ไหม?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'แบน',
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
                disabled={params.row.product_status === '1' || params.row.product_status === '2'} // ปิดปุ่มถ้า account_status เป็น 1 หรือ 2
              >
                Unban
              </Button>
              {/* <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleDeleteClick(params.row.account_id, params.row.member_id)}
                >
                  Delete
                </Button>
                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleUndeleteClick(params.row.account_id, params.row.member_id)}
                >
                  Undelete
                </Button> */}
            </div>
          )
        }
      ]}
    />
  )
}

export default Product
