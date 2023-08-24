import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import userid from './user'

const User = () => {
  const [Userlist, setUserlist] = useState([])

  useEffect(() => {
    axios.get('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.users.alluser').then(response => {
      console.log('setUser:', response.data.message.Data)
      setUserlist(response.data.message.Data)
    })
  }, [])

  const handleBanClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Ban account with ID ${account_id}`)

    axios
      .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.users.banuser', {
        account_id,
        user_id: member_id // ส่ง account_id ไปที่ API
      })
      .then(response => {
        console.log('UserID', response)
        // ทำอย่างอื่นตามความต้องการ
      })
      .catch(error => {
        console.error('Error:', error)
      })

      window.location.reload();
    
  }

  const handleUnbanClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unban account with ID ${account_id}`)

    axios
    .post('http://111.223.38.19/api/method/frappe.API.TCTM.backoffice.users.unbanuser', {
      account_id,
      user_id: member_id // ส่ง account_id ไปที่ API
    })
    .then(response => {
      console.log('UserID', response)
      // ทำอย่างอื่นตามความต้องการ
    })
    .catch(error => {
      console.error('Error:', error)
    })

    window.location.reload();
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
      rows={Userlist.map(val => ({ ...val, id: val.account_id, sub_status: val.account_status.toString() }))} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={account_id => account_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'account_id', headerName: 'ID', width: 120 },
        {
          field: 'account_status',
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
        { field: 'member_id', headerName: 'รหัสซัพาย', width: 80 },
        { field: 'sub_id', headerName: 'รหัสมาชิก', width: 80 },
        { field: 'user_company', headerName: 'บริษัท', width: 150 },
        { field: 'user_first_name', headerName: 'ชื่อ', width: 150 },
        { field: 'user_last_name', headerName: 'นามสกุล', width: 80 },
        { field: 'user_role', headerName: 'กลุ่ม', width: 80 },
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
                  onClick={() => handleBanClick(params.row.account_id, params.row.member_id)}
                >
                  Ban
                </Button>

                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleUnbanClick(params.row.account_id, params.row.member_id)}
                >
                  Unban
                </Button>
                <Button
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
                </Button>
            </div>
          )
        }
      ]}
    />
  )
}

export default User;
