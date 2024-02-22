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

const OrdersReq = ({ subId }) => {
  const router = useRouter() //use router

  // ตัวแปรเก็บค่าข้อมูล
  const [rows, setRows] = useState([]) // เก็บค่า Sub Id
  const [shouldFetchData, setShouldFetchData] = useState(true)

  const usertype = '2' // usertype = '1'(member) usertype = '2'(marker)

  // console.log('rows', rows)

  // ** Switch Alert Import
  const Swal = require('sweetalert2')

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.market_req_order`, {
          params: {
            sub_id: subId
          }
        })

        // console.log('data', response.data.message.Data)
        setRows(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
    if (shouldFetchData) {
      fetchData()
      setShouldFetchData(false)
    }
  }, [subId, shouldFetchData])

  // ฟังชัน ย้ายไปหน้า ดูรายละเอียดผลิตภัณ
  const handleDetailPage = invoice_id => {
    router.push(`/member/order/ordersdetailReq/?invoice_id=${invoice_id}&usertype=${usertype}`)
  }

  // ประกาศ Colum
  const columns = [
    { field: 'invoice_id', headerName: 'invoid id', width: 100 },
    {
      field: 'creation',
      headerName: 'Date',
      width: 200,
      renderCell: rowCell => {
        const dateString = new Date(rowCell.value).toLocaleString()

        return <span>{dateString}</span>
      }
    },
    {
      field: 'invoice_status',
      headerName: 'Status',
      width: 180,
      renderCell: rowCell => {
        const reqStatus = rowCell.row.invoice_status
        if (reqStatus === '1') {
          return <Chip label='Waiting Comfirm' color='warning' />
        } else if (reqStatus === '2') {
          return <Chip label='Waiting payment' color='primary' />
        } else if (reqStatus === '3') {
          return <Chip label='Waiting verify' color='warning' />
        } else if (reqStatus === '4') {
          return <Chip label='Delivery' color='primary' />
        } else if (reqStatus === '5') {
          return <Chip label='Complete' color='success' />
        } else if (reqStatus === '0') {
          return <Chip label='Reject' color='secondary' />
        } else {
          return <Chip label='Unknow' color='secondary' />
        }
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      width: 150,
      renderCell: rowCell => (
        <Button variant='outlined' endIcon={<EyeOutline />} onClick={() => handleDetailPage(rowCell.row.invoice_id)}>
          View
        </Button>
      )
    },
    {
      field: 'Approve',
      headerName: 'Approve',
      minWidth: 150,
      renderCell: rowCell => (
        <Button
          variant='contained'
          color='success'
          startIcon={<TaskIcon />}
          disabled={rowCell.row.invoice_status !== '1'}
          onClick={e => handleApproveClick(e, rowCell.row.invoice_id, rowCell.row.member_id)}
        >
          Approve
        </Button>
      )
    },
    {
      field: 'Reject',
      headerName: 'Reject',
      minWidth: 150,
      renderCell: rowCell => (
        <Button
          variant='contained'
          color='error'
          startIcon={<CloseIcon />}
          disabled={rowCell.row.invoice_status !== '1'}
          onClick={e => handleDeleteSubmit(e, rowCell.row.invoice_id, rowCell.row.member_id)}
        >
          Reject
        </Button>
      )
    }
  ]

  // Approve Data
  const handleApproveClick = async (e, invoice_id, member_id) => {
    e.preventDefault()

    const data = {
      invoice_id: invoice_id,
      member_id: member_id
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.confirm`, data)
      console.log(response)
      Swal.fire({
        icon: 'success',
        title: 'Send Data Success'
      })
      setShouldFetchData(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error'
      })
      console.log(error)
    }
  }

  // Delete Data
  const handleDeleteSubmit = (e, invoice_id, member_id) => {
    e.preventDefault()

    Swal.fire({
      title: 'You Want to Reject Data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        const data = {
          invoice_id: invoice_id,
          member_id: member_id
        }

        if (invoice_id !== '' && member_id !== '') {
          axios
            .put(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.reject`, data)
            .then(function (response) {
              console.log(response)

              Swal.fire({
                icon: 'success',
                title: 'Reject Success'
              })

              setShouldFetchData(true)
            })
            .catch(function (error) {
              console.log(error)

              Swal.fire({
                icon: 'error',
                title: 'Erroe'
              })
            })
        } else {
          console.log('Error')
        }
      } else if (result.isDenied) {
        console.log('cancelled Error')
      }
    })
  }

  //==================================ฟังชันค้นหาข้อมูล==================================//
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState('')

  const filteredRows = rows
    ? rows.filter(row => {
        if (selectedInvoiceStatus === '') {
          return true
        }

        return row.invoice_status === selectedInvoiceStatus
      })
    : []

  return (
    <Box sx={{ padding: '10px 10px 15px' }}>
      <MySeo
        title={'Management : Product Requirement Orders'}
        
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
            <InputLabel id='demo-simple-select-outlined-label'>Invoice Status</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Invoice Status'
              value={selectedInvoiceStatus}
              onChange={e => setSelectedInvoiceStatus(e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              {rows && rows.length > 0 ? (
                Array.from(new Set(rows.map(row => row.invoice_status))).map(invoiceStatus => (
                  <MenuItem key={invoiceStatus} value={invoiceStatus}>
                    {invoiceStatus === '1'
                      ? 'Waiting Confirm'
                      : invoiceStatus === '2'
                      ? 'Waiting payment'
                      : invoiceStatus === '3'
                      ? 'Waiting verify'
                      : invoiceStatus === '4'
                      ? 'Delivery'
                      : invoiceStatus === '5'
                      ? 'Complete'
                      : invoiceStatus === '0'
                      ? 'Reject'
                      : 'Unknown'}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Data</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 1 }}>
            <Typography variant='body1' fontSize='1.5rem bold' color='#000'>
              {filteredRows.length} Orders
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        {rows ? (
          <DataGrid rows={filteredRows} columns={columns} getRowId={row => row.invoice_id} />
        ) : (
          <Typography variant='body1' fontSize='1.0rem' color='#000'>
            No data
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default OrdersReq
