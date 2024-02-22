// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
  Typography
} from '@mui/material'

// ** Material-UI Icons Imports
import TaskIcon from '@mui/icons-material/Task'
import CloseIcon from '@mui/icons-material/Close'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Plus from 'mdi-material-ui/Plus'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'
import MySeo from 'src/pages/seo'

const Requirement = SubID => {
  // next Router
  const router = useRouter()

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  // ตัวแปรเก็บค่าข้อมูล
  const sub_id = SubID.sub_id
  const [rowdata, setRowData] = useState([])

  // console.log('row', rowdata)

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}TCTM.requirements.allrequirement_inone_market`,
          {
            params: {
              sub_id: sub_id
            }
          }
        )

        // console.log('Api', response.data.message.Data[0].member_id)
        setRowData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [sub_id])

  // ฟังก์ชันสำหรับ  Band User
  const handleRejectSubmit = reqId => {
    console.log('reqId', reqId)

    // แสดงกล่องข้อความยืนยัน
    Swal.fire({
      title: 'Confirm Reject',
      text: 'Are you sure you want to reject this submission?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject'
    }).then(result => {
      // ถ้าผู้ใช้กดปุ่ม Confirm (Yes)
      if (result.isConfirmed) {
        const data = {
          req_id: reqId
        }

        axios
          .put(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirementreject`, data)
          .then(function (response) {
            // หลังจากที่แตะเสร็จ ลบแถวที่ถูก แตะ ออกจากข้อมูล
            const updatedRows = rowdata.filter(row => row.req_id !== reqId)

            setRowData(updatedRows)

            Swal.fire({
              icon: 'success',
              title: 'Reject success',
              text: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch(function (error) {
            console.log(error)
            Swal.fire({
              icon: 'error',
              title: 'Reject Error',
              text: 'Something went wrong!'
            })
          })
      }
    })
  }

  // ** Data Grid Columns
  const columns = [
    { field: 'req_id', headerName: 'ID  ', width: 90 },
    { field: 'req_header', headerName: 'Title', width: 250 },
    {
      field: 'creation',
      headerName: 'Post Time',
      width: 300,
      valueGetter: params => {
        return params.row.creation.substring(0, 19)
      }
    },
    {
      field: 'req_status',
      headerName: 'Status',
      width: 150,

      renderCell: params => {
        const reqStatus = params.row.req_status
        if (reqStatus === '2') {
          return <Chip label='Pending' color='warning' />
        } else if (reqStatus === '3') {
          return <Chip label='Success' color='success' />
        } else if (reqStatus === '4') {
          return <Chip label='Success' color='success' />
        } else {
          return <Chip label='Unknow' color='secondary' />
        }
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      minWidth: 100,
      renderCell: rowCell => {
        const handleDetailClick = () => {
          router.push(
            `/market/port-detail-marker/?req_id=${rowCell.row.req_id}&sub_id=${sub_id}&member_id2=${rowCell.row.member_id}`
          )
        }

        return (
          <Button variant='outlined' endIcon={<EyeOutline />} onClick={handleDetailClick}>
            View
          </Button>
        )
      }
    },
    {
      field: 'Reject',
      headerName: 'Reject',
      minWidth: 150,
      renderCell: rowCell => {
        const reqStatus = rowCell.row.req_status

        return (
          <Button
            variant='contained'
            color='error'
            startIcon={<CloseIcon />}
            onClick={() => handleRejectSubmit(rowCell.row.req_id)}
            disabled={reqStatus === '3' || reqStatus === '4' || reqStatus === '5'}
          >
            Reject
          </Button>
        )
      }
    }
  ]

  //==================================ฟังชันค้นหาข้อมูล==================================//
  const [selectedReqStatus, setSelectedReqStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const getUniqueReqStatus = () => {
    if (!rowdata) {
      return []
    }
    const uniqueReqStatus = [...new Set(rowdata.map(row => row.req_status))]

    return uniqueReqStatus
  }

  const handleChange = event => {
    const { name, value } = event.target
    if (name === 'searchTerm') {
      setSearchTerm(value)
    } else if (name === 'selectedReqStatus') {
      setSelectedReqStatus(value)
    }
  }

  // ฟังก์ชันสำหรับรีเซตข้อมูลค้นหา
  const handleReset = () => {
    setSelectedReqStatus('') // รีเซตค่า selectedReqStatus เป็นค่าว่าง
    setSearchTerm('') // รีเซตค่า searchTerm เป็นค่าว่าง
  }

  return (
    <Box sx={{ padding: '10px 10px 15px' }}>
      <MySeo
        title={'Management : Requirements'}

        // details={OptionData}
        description={'Product Requirement Orders'}

        // content={SeoProductpage.content}
        keywords={'Order,Product,market,E-commerce,Chat,Creative'}

        // ogimg={
        //   informationimg[stateImages]?.image_file_infname
        //     ? `/imageInfor/${informationimg[presentState].image_file_infname}`
        //     : ''
        // }

        // url={`http://${host}${currentPath}/${Object.keys(parameters).length > 0 ? '?' : ''}${new URLSearchParams(
        //   parameters
        // )}`}
      />
      <Grid container spacing={3}>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <FormControl fullWidth size='small' variant='outlined' sx={{ maxHeight: '42px', height: '42px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Status'
              name='selectedReqStatus'
              value={selectedReqStatus}
              onChange={handleChange}
            >
              <MenuItem value=''>All</MenuItem>
              {getUniqueReqStatus().length === 0 ? (
                <MenuItem value='NoData' disabled>
                  No Data
                </MenuItem>
              ) : (
                getUniqueReqStatus().map(status => (
                  <MenuItem key={status} value={status}>
                    {status === '2'
                      ? 'Pending'
                      : status === '3'
                      ? 'Success'
                      : status === '4'
                      ? 'Success Nissan'
                      : 'Unknown'}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
          <TextField
            fullWidth
            size='small'
            label='Search'
            variant='outlined'
            name='searchTerm'
            value={searchTerm}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={4} xs={4}>
          <Button
            fullWidth
            size='small'
            variant='outlined'
            sx={{ height: '100%' }}
            onClick={handleReset} // เรียกใช้ฟังก์ชัน handleReset เมื่อคลิกปุ่ม "Reset"
          >
            Reset
          </Button>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 1 }}>
            <Typography variant='body1' fontWeight='' fontSize='1.0rem' color='#000'>
              {(rowdata &&
                rowdata.filter(
                  row =>
                    (searchTerm === '' || row.req_header.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (selectedReqStatus === '' || row.req_status === selectedReqStatus)
                ).length) ||
                '0 '}
              Requirements
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        {rowdata && rowdata.length > 0 ? (
          <DataGrid
            rows={rowdata.filter(
              row =>
                (searchTerm === '' || row.req_header.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (selectedReqStatus === '' || row.req_status === selectedReqStatus)
            )}
            columns={columns}
            getRowId={row => row.req_id}
            pageSize={5}
          />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h6' fontSize='24px bold'>
              There are no Requirements.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Requirement
