import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import userid from './user'

const Market = () => {
  const [Marketlist, setMarketlist] = useState([])

  useEffect(() => {
    axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.allmarket').then(response => {
      console.log('setMarket:', response.data.message.Data)
      setMarketlist(response.data.message.Data)
    })
  }, [])

  const handleBanClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Ban account with ID ${sub_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.banmarket', {
        sub_id // ส่ง account_id ไปที่ API
      })
      .then(response => {
        console.log('UserID', response)
        // ทำอย่างอื่นตามความต้องการ
      })
      .catch(error => {
        console.error('Error:', error)
      })

    window.location.reload()
  }

  const handleUnbanClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unban account with ID ${sub_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.market.unbanmarket', {
        sub_id // ส่ง account_id ไปที่ API
      })
      .then(response => {
        console.log('UserID', response)
        // ทำอย่างอื่นตามความต้องการ
      })
      .catch(error => {
        console.error('Error:', error)
      })

    window.location.reload()
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
      rows={Marketlist.map(val => ({ ...val, id: val.member_id, sub_status: val.sub_status.toString() }))} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={member_id => member_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'sub_id', headerName: 'ID', width: 80 },
        { field: 'member_id', headerName: 'รหัสสมาชิก', width: 80 },
        {
          field: 'sub_status',
          headerName: 'สถานะไอดี',
          width: 120,
          valueFormatter: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
            if (subStatus === '1') {
              return 'ไม่โดนแบน'
            } else if (subStatus === '2') {
              return 'ยืนยันแล้ว'
            } else if (subStatus === '0') {
              return 'โดนแบน'
            }
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
                onClick={() => handleBanClick(params.row.sub_id)}
              >
                Ban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => handleUnbanClick(params.row.sub_id)}
              >
                Unban
              </Button>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => handleDeleteClick(params.row.sub_id)}
              >
                Delete
              </Button>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => handleUndeleteClick(params.row.sub_id)}
              >
                Undelete
              </Button>
            </div>
          )
        }
      ]}
    />
  )
}

export default Market
