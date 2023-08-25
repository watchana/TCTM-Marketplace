import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, palette, Chip, Stack } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import userid from './user'

const Market = () => {
  const [Marketlist, setMarketlist] = useState([])

  useEffect(() => {
    axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.allmarket').then(response => {
      // console.log('setMarket:', response.data.message.Data)
      setMarketlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchMarketData()
  }, [])

  const fetchMarketData = () => {
    axios
      .get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.allmarket')
      .then(response => {
        setMarketlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleBanClick = sub_id => {
    console.log(`Ban account with ID ${sub_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.banmarket', {
        sub_id
      })
      .then(response => {
        console.log('UserID', response)
        // หลังจากทำการ Ban สำเร็จ ให้เรียกฟังก์ชัน fetchMarketData เพื่ออัปเดตข้อมูลใหม่
        fetchMarketData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnbanClick = sub_id => {
    console.log(`Unban account with ID ${sub_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.unbanmarket', {
        sub_id
      })
      .then(response => {
        console.log('UserID', response)
        // หลังจากทำการ Unban สำเร็จ ให้เรียกฟังก์ชัน fetchMarketData เพื่ออัปเดตข้อมูลใหม่
        fetchMarketData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleDeleteClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Delete
    console.log(`Delete account with ID ${sub_id}`)
  }

  const handleUndeleteClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Undelete
    console.log(`Undelete account with ID ${sub_id}`)
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={Marketlist.map(val => ({ ...val, id: val.member_id }))} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={member_id => member_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'sub_id', headerName: 'ID', width: 80 },
        { field: 'member_id', headerName: 'รหัสสมาชิก', width: 80 },
        {
          field: 'sub_status',
          headerName: 'สถานะไอดี',
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
        { field: 'sub_name', headerName: 'ชื่อร้าน', width: 130 },
        { field: 'user_company', headerName: 'บริษัท', width: 150 },
        { field: 'user_first_name', headerName: 'ชื่อ', width: 150 },
        { field: 'user_last_name', headerName: 'นามสกุล', width: 80 },
        {
          field: 'actions',
          headerName: 'ปุ่ม',
          width: 400, // ปรับขนาดตามความต้องการ
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.sub_status !== '0') {
                    // ตรวจสอบว่าไม่ใช่ "ยืนยันแล้ว"
                    handleBanClick(params.row.sub_id)
                  }
                }}
                disabled={params.row.sub_status === '0'} // ปิดปุ่มถ้า sub_status เป็น 0
              >
                Ban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.sub_status !== '2') {
                    // ตรวจสอบว่าไม่ใช่ "ยืนยันแล้ว"
                    handleUnbanClick(params.row.sub_id)
                  }
                }}
                disabled={params.row.sub_status === '1' || params.row.sub_status === '2'} // ปิดปุ่มถ้า account_status เป็น 1 หรือ 2
              >
                Unban
              </Button>
            </div>
          )
        }
      ]}
    />
  )
}

export default Market
