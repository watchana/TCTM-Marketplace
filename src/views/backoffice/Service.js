import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Chip, TextField, Tooltip } from '@mui/material'
import { StyledDataGrid } from 'src/views/backoffice/styled'
import Swal from 'sweetalert2'

// ** Next Imports
import { useRouter } from 'next/router'

const Service = () => {
  const router = useRouter() // เรียกใช้งาน Router
  const [Userlist, setUserlist] = useState([])

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [rowCertificates, setRowCertificates] = useState({})

  const { ser_id } = router.query
  const serID = ser_id

  const handleCertificateType = (event, rowId) => {
    const updatedCertificates = { ...rowCertificates }
    updatedCertificates[rowId] = event.target.value
    setRowCertificates(updatedCertificates)
    console.log(`Certificate Type for row ${rowId}: ${event.target.value}`)
  }

  useEffect(() => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showalluserservice`).then(response => {
        // console.log('setUser:', response.data.message.Data)
        setUserlist(response.data.message.data)
        console.log('response', response.data.message.Data)
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}TCTM.service.showalluserservice`)
      .then(response => {
        setUserlist(response.data.message.Data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  // ฟังชันส่งข้อมูล Register
  const handleSubmitData = async (event, rowId) => {
    console.log('RowId: ' + rowId)
    event.preventDefault()
    setIsSubmitted(true)

    const certificateType = rowCertificates[rowId]

    // const fieldsToCheck = [certificateType, ser_id]
    if (!certificateType) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณาระบุข้อมูลให้ครบ',
        text: 'โปรดกรอกข้อมูลในช่อง Certificate Type'
      })

      return
    }

    const data = {
      ser_id: rowId,
      ser_type: certificateType
    }
    console.log('data', data)

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API}TCTM.service.update_sertype`,

      data: data
    }

    axios
      .request(config)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'ส่งข้อมูลสำเร็จ',
          text: 'ส่งข้อมูลเสร็จสิ้น'
        })
        fetchUserData()
        setRowCertificates(prevRowCertificates => {
          const updatedCertificates = { ...prevRowCertificates }
          delete updatedCertificates[rowId]

          return updatedCertificates
        })

        console.log(JSON.stringify(response.data))
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Log in ล้มเหลว...',
          text: 'มีข้อผิดพลาดในการเรียก API'
        })
      })
  }

  // const handleBanClick = (account_id, member_id) => {
  //   // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Ban
  //   console.log(`Ban account with ID ${account_id}`)

  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.banuser`, {
  //       account_id,
  //       user_id: member_id // ส่ง account_id ไปที่ API
  //     })
  //     .then(response => {
  //       console.log('UserID', response)
  //       fetchUserData()

  //       // ทำอย่างอื่นตามความต้องการ
  //     })
  //     .catch(error => {
  //       console.error('Error:', error)
  //     })
  // }

  // const handleUnbanClick = (account_id, member_id) => {
  //   // ทำสิ่งที่คุณต้องการเมื่อคลิกปุ่ม Unban
  //   console.log(`Unban account with ID ${account_id}`)

  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_API}TCTM.backoffice.users.unbanuser`, {
  //       account_id,
  //       user_id: member_id // ส่ง account_id ไปที่ API
  //     })
  //     .then(response => {
  //       console.log('UserID', response)
  //       fetchUserData()

  //       // ทำอย่างอื่นตามความต้องการ
  //     })
  //     .catch(error => {
  //       console.error('Error:', error)
  //     })
  // }

  // ฟังชัน download ใบเสร็จ
  const handleDownload = async fileName => {
    try {
      // แสดงกล่องข้อความยืนยันด้วย SweetAlert
      const result = await Swal.fire({
        title: `You want to download resume file?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })

      if (result.isConfirmed) {
        const downloadResponse = await fetch('/api/resumeFile_dowload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fileName }),
          responseType: 'blob' // Indicate that the response should be treated as binary data
        })

        if (downloadResponse.ok) {
          const blob = await downloadResponse.blob()
          const blobUrl = URL.createObjectURL(blob)

          // Create a download link and initiate the download
          const downloadLink = document.createElement('a')
          downloadLink.href = blobUrl
          downloadLink.download = fileName
          downloadLink.click()

          // Clean up the object URL after the download is initiated
          URL.revokeObjectURL(blobUrl)

          console.log('Download initiated')
        } else {
          console.error('Error downloading document:', downloadResponse.statusText)
        }
      } else {
        console.log('Cancel download')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <StyledDataGrid
      autoHeight
      rows={(Userlist || []).filter(val => val.ser_status === '2').map(val => ({ ...val, id: val.ser_id.toString() }))} // กรองแถวที่มี ser_status เท่ากับ 2 และเพิ่มคุณสมบัติ id ในแต่ละแถว
      getRowId={val => val.id} // กำหนดให้ใช้คุณสมบัติ id เป็น id ของแถว
      columns={[
        { field: 'ser_id', headerName: 'ID', width: 120 },
        {
          field: 'ser_status',
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

        { field: 'ser_fname', headerName: 'Name', width: 150 },
        { field: 'ser_lname', headerName: 'Surname', width: 80 },

        { field: 'ser_type', headerName: 'Type', width: 150 },

        {
          field: 'actions',
          headerName: 'Actions',
          width: 300, // ปรับขนาดตามความต้องการ
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
                        // handleBanClick(params.row.account_id, params.row.member_id)
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
                        // handleUnbanClick(params.row.account_id, params.row.member_id)
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

              <Button
                style={{ marginRight: '5px' }}
                variant='contained'
                color='success'
                onClick={() => {
                  router.push(`/member/medalformservice/?ser_id=${params.row.ser_id}`)
                }}
              >
                Details
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
        },
        {
          field: 'Certificate Type',
          headerName: 'Certificate Type',
          sortable: false,
          width: 250,

          renderCell: params => {
            return (
              <div>
                <TextField
                  placeholder='Please fill Certificate Type'
                  fullWidth
                  id={`certificateType_${params.row.id}`}
                  variant='outlined'
                  onChange={event => handleCertificateType(event, params.row.id)}
                  value={rowCertificates[params.row.id] || ''}

                  // helperText={!rowCertificates[params.row.id] && isSubmitted}
                />
              </div>
            )
          }
        },
        {
          field: 'Submit',
          headerName: 'Button',
          sortable: false,
          width: 110,
          renderCell: params => {
            return (
              <div>
                <Button variant='contained' color='success' onClick={event => handleSubmitData(event, params.row.id)}>
                  Submit
                </Button>
              </div>
            )
          }
        },
        {
          field: 'resume',
          headerName: 'Resume file',
          width: 250, // ปรับขนาดตามความต้องการ
          renderCell: params => (
            <div>
              {' '}
              <Tooltip title='This is the resume file from service register'>
                <Button
                  style={{ marginRight: '5px' }}
                  variant='contained'
                  color='success'
                  onClick={() => handleDownload(params.row.ser_filedame)}
                >
                  Download
                </Button>
              </Tooltip>
            </div>
          )
        }
      ]}
    />
  )
}

export default Service
