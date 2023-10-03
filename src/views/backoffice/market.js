import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, palette, Chip, Stack } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import userid from './user'
import Swal from 'sweetalert2'

const Market = () => {
  const [Marketlist, setMarketlist] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.market.allmarket`).then(response => {
      console.log('setMarket:', response.data.message.Data)
      setMarketlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchMarketData()
  }, [])

  const fetchMarketData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.market.allmarket`)
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
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.market.banmarket`, {
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

  const handleActiveClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
    console.log(`Active account with ID ${sub_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.market_active`, {
        sub_id
      })
      .then(response => {
        console.log('bill_id', response)

        // ทำอย่างอื่นตามความต้องการ
        fetchMarketData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnactiveClick = sub_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
    console.log(`Unactive account with ID ${sub_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.market_unactive`, {
        sub_id
      })
      .then(response => {
        console.log('UserID', response)

        // ทำอย่างอื่นตามความต้องการ
        fetchMarketData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnbanClick = sub_id => {
    console.log(`Unban account with ID ${sub_id}`)

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.market.unbanmarket`, {
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

  return (
    <StyledDataGrid
      autoHeight
      rows={Marketlist && Array.isArray(Marketlist) ? Marketlist.map(val => ({ ...val, id: val.member_id })) : []}
      getRowId={member_id => member_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'sub_id', headerName: 'ID', width: 80 },
        { field: 'member_id', headerName: 'member id', width: 80 },
        {
          field: 'sub_status',
          headerName: 'id status',
          width: 120,
          renderCell: params => {
            const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
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
        { field: 'sub_name', headerName: 'Shop name', width: 130 },
        { field: 'user_company', headerName: 'company', width: 150 },
        { field: 'user_first_name', headerName: 'name', width: 150 },
        { field: 'user_last_name', headerName: 'last name', width: 80 },
        {
          field: 'actions',
          headerName: 'Button',
          width: 400,
          renderCell: params => (
            <div>
              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.sub_status !== '0') {
                    Swal.fire({
                      title: 'Want to ban this store??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'band',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'band success',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleBanClick(params.row.sub_id)
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
                disabled={params.row.sub_status === '0' || params.row.sub_status === '3'}
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
                    Swal.fire({
                      title: 'Do you want to unban this store??',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'unband',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnbanClick(params.row.sub_id)
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
                  params.row.sub_status === '1' || params.row.sub_status === '2' || params.row.sub_status === '3'
                }
              >
                Unban
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.sub_status !== '0' && params.row.sub_status !== '1') {
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
                          title: 'show data successfully',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        handleActiveClick(params.row.sub_id)
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
                  params.row.sub_status === '0' || params.row.sub_status === '1' || params.row.sub_status === '3'
                }
              >
                Active
              </Button>

              <Button
                variant='contained'
                color='success'
                className='btn btn-info'
                style={{ marginRight: '5px' }}
                onClick={() => {
                  if (params.row.sub_status !== '2') {
                    Swal.fire({
                      title: 'Do you want to stop showing this show?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Unactive',
                      cancelButtonText: 'cancle'
                    }).then(result => {
                      if (result.isConfirmed) {
                        handleUnactiveClick(params.row.sub_id)
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
                  params.row.sub_status === '0' || params.row.sub_status === '1' || params.row.sub_status === '2'
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

export default Market
