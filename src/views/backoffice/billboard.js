import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'
import { Plus } from 'mdi-material-ui'

const Billboard = () => {
  const [Billboardlist, setBillboardlist] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.all_billboard`).then(response => {
      setBillboardlist(response.data.message.Data)
    })
  }, [])

  useEffect(() => {
    fetchBillboardData()
  }, [])

  const fetchBillboardData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.all_billboard`)
      .then(response => {
        setBillboardlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleActiveClick = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.active_bill_board`, {
        bill_id
      })
      .then(response => {
        // ทำอย่างอื่นตามความต้องการ
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleUnactiveClick = bill_id => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.unactive_bill_board`, {
        bill_id
      })
      .then(response => {
        localStorage.removeItem('billboard2Clicked') // ลบค่าที่ถูกเก็บไว้ใน local storage
        localStorage.removeItem('billboard3Clicked') // ลบค่าที่ถูกเก็บไว้ใน local storage
        setBillboard2Clicked(false) // ตั้งค่า billboard2Clicked เป็น false เพื่อให้ปุ่ม Billboard 2 กลับมาสามารถกดได้
        setBillboard3Clicked(false) // ตั้งค่า billboard2Clicked เป็น false เพื่อให้ปุ่ม Billboard 2 กลับมาสามารถกดได้
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleActiveClickBill2 = bill_id => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.billboards2`, {
        bill_id
      })
      .then(response => {
        localStorage.setItem('billboard2Clicked', 'true') // เก็บค่าการคลิกใน local storage
        setBillboard2Clicked(true) // ตั้งค่า billboard2Clicked เป็น true
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    const isBillboard2Clicked = localStorage.getItem('billboard2Clicked')
    if (isBillboard2Clicked === 'true') {
      setBillboard2Clicked(true)
    }
  }, [])

  const handleActiveClickBill3 = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban

    axios
      .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.home_page.billboards3`, {
        bill_id
      })
      .then(response => {
        localStorage.setItem('billboard3Clicked', 'true') // เก็บค่าการคลิกใน local storage
        setBillboard3Clicked(true) // ตั้งค่า billboard2Clicked เป็น true
        fetchBillboardData()
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    const isBillboard3Clicked = localStorage.getItem('billboard3Clicked')
    if (isBillboard3Clicked === 'true') {
      setBillboard3Clicked(true)
    }
  }, [])

  const handleDeleteClick = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Delete
    console.log(`Delete account with ID ${bill_id}`)
  }

  const handleUndeleteClick = bill_id => {
    // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Undelete
    console.log(`Undelete account with ID ${bill_id}`)
  }

  const [billboard2Clicked, setBillboard2Clicked] = useState(false)
  const [billboard3Clicked, setBillboard3Clicked] = useState(false)

  return (
    <Box>
      <Link href='\backoffice\Add_Billboard'>
        {/* passHref  เมื่อเกิดปัญหาให้เอาตัวนี้ไปใส่เป็น  Link href='\backoffice\Add_Billboard' passHref  */}
        <Button
          variant='contained'
          color='primary'
          startIcon={<Plus />}
          onClick={() => {
            // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม "Add"
            console.log('Add button clicked')

            // เพิ่มโค้ดที่ต้องการทำเมื่อคลิกปุ่ม "Add" ที่นี่
          }}
          style={{ marginBottom: '16px' }}
        >
          Add Billboard
        </Button>
      </Link>
      <StyledDataGrid
        autoHeight
        rows={Billboardlist?.map(val => ({ ...val, id: val.bill_id })) || []}
        getRowId={bill_id => bill_id.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
        columns={[
          { field: 'bill_id', headerName: 'ID', width: 120 },
          {
            field: 'bill_status',
            headerName: 'status',
            width: 120,
            renderCell: params => {
              const subStatus = params.value // ค่าที่อยู่ในช่อง "สถานะไอดี"
              let chipColor = 'default'
              let chipLabel = ''

              if (subStatus === '1') {
                chipColor = 'success'
                chipLabel = 'Active'
              } else if (subStatus === '0') {
                chipColor = 'error'
                chipLabel = 'Unactive'
              } else if (subStatus === '3') {
                chipColor = 'success'
                chipLabel = 'Billboard2'
              } else if (subStatus === '4') {
                chipColor = 'success'
                chipLabel = 'Billboard3'
              }

              return <Chip label={chipLabel} color={chipColor} />
            }
          },
          { field: 'bill_name', headerName: 'billboard', width: 300 },
          { field: 'name', headerName: 'creator', width: 150 },
          { field: 'owner', headerName: 'position', width: 120 },
          {
            field: 'actions',
            headerName: 'Button',
            width: 560, // ปรับขนาดตามความต้องการ
            renderCell: params => (
              <div>
                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    if (params.row.bill_status !== '1') {
                      Swal.fire({
                        title: 'Want to show this item?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Active',
                        cancelButtonText: 'cancle'
                      }).then(result => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Show success',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          handleActiveClick(params.row.bill_id)
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
                  disabled={params.row.bill_status === '1'}
                >
                  Active
                </Button>

                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    if (params.row.bill_status !== '3') {
                      Swal.fire({
                        title: 'Want to show this item?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Active',
                        cancelButtonText: 'cancle'
                      }).then(result => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Show success',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          handleActiveClickBill2(params.row.bill_id)
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
                  disabled={params.row.bill_status === '3' || billboard2Clicked} // ปิดปุ่มถ้า account_status เป็น 3 หรือ billboard2Clicked เป็น true
                >
                  Billboard 2
                </Button>

                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    if (params.row.bill_status !== '4') {
                      Swal.fire({
                        title: 'Want to show this item?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Active',
                        cancelButtonText: 'cancle'
                      }).then(result => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Show success',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          handleActiveClickBill3(params.row.bill_id)
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
                  disabled={params.row.bill_status === '4' || billboard3Clicked}
                >
                  Billboard 3
                </Button>

                <Button
                  variant='contained'
                  color='success'
                  className='btn btn-info'
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    if (params.row.bill_status !== '2') {
                      Swal.fire({
                        title: 'Do you want to stop showing this show??',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Unactive',
                        cancelButtonText: 'cancle'
                      }).then(result => {
                        if (result.isConfirmed) {
                          handleUnactiveClick(params.row.bill_id)
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
                  disabled={params.row.bill_status === '0'} // ปิดปุ่มถ้า account_status เป็น 1 หรือ 2
                >
                  Unactive
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
    </Box>
  )
}

export default Billboard
