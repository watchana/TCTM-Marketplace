import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Chip } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'

const User = () => {
  const [Userlist, setUserlist] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.alluser`).then(response => {
      // console.log('setUser:', response.data.message.Data)
      setUserlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.alluser`)
      .then(response => {
        setUserlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleBanClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Ban account with ID ${account_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.banuser`, {
        account_id,
        user_id: member_id // ส่ง account_id ไปที่ API
      })
      .then(response => {
        console.log('UserID', response)
        fetchUserData()

        // ทำอย่างอื่นตามความต้องการ
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnbanClick = (account_id, member_id) => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unban account with ID ${account_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.unbanuser`, {
        account_id,
        user_id: member_id // ส่ง account_id ไปที่ API
      })
      .then(response => {
        console.log('UserID', response)
        fetchUserData()

        // ทำอย่างอื่นตามความต้องการ
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={Userlist?.map(val => ({ ...val, id: val.account_id, sub_status: val.account_status.toString() })) || []} // เพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={account_id => account_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'account_id', headerName: 'ID', width: 120 },
        {
          field: 'account_status',
          headerName: 'ID status',
          width: 120,
          renderCell: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
            let chipColor = 'default'
            let chipLabel = ''

            if (subStatus === '1') {
              chipColor = 'warning'
              chipLabel = 'Waiting'
            } else if (subStatus === '2') {
              chipColor = 'success'
              chipLabel = 'Normal'
            } else if (subStatus === '0') {
              chipColor = 'error'
              chipLabel = 'Banned'
            }

            return <Chip label={chipLabel} color={chipColor} />
          }
        },
        { field: 'member_id', headerName: 'ID Supply', width: 120 },
        { field: 'sub_id', headerName: 'ID Member', width: 120 },
        { field: 'user_company', headerName: 'Company', width: 150 },
        { field: 'user_first_name', headerName: 'Name', width: 150 },
        { field: 'user_last_name', headerName: 'Surname', width: 120 },
        { field: 'user_role', headerName: 'Type', width: 80 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 400, // ปรับขนาดตามความต้องการ
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
                        handleBanClick(params.row.account_id, params.row.member_id)
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
                Ban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.account_status !== '2') {
                    Swal.fire({
                      title: 'Do you want to unban this user??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'yes',
                      cancelButtonText: 'no'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnbanClick(params.row.account_id, params.row.member_id)
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
                disabled={params.row.account_status === '1' || params.row.account_status === '2'}
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

export default User
