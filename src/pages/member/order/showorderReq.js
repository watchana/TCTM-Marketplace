// ** React Imports
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { DataGrid } from '@mui/x-data-grid'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'

//** axios Import
import axios from 'axios'

//** Next Import */
import { useRouter } from 'next/router'

const ShowOrderReq = ({ userId }) => {
  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')
  const router = useRouter() //use router

  // ตัวแปรเก็บค่าข้อมูล
  const [rows, setRows] = useState([]) // ข้อมูล row

  // State Control
  const [shouldFetchData, setShouldFetchData] = useState(true) // ควบคุมการดึงข้อมูล Api

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_req_order`, {
          params: {
            member_id: userId
          }
        })

        // console.log('Api', response.data.message.Data[0])
        setRows(response.data.message.Data)
        setShouldFetchData(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [userId, shouldFetchData])

  // ฟังชันยืนยันข้อมูล
  const handleConfirmProduct = async (event, invoice_id) => {
    event.preventDefault()

    try {
      const data = {
        invoice_id: invoice_id
      }

      console.log('data', data)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_confirm_product`, data)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success'
        })
        console.log(response.status)
        setShouldFetchData(true)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Api Has a Problem'
        })
      }
    } catch (error) {
      console.error(error)
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'การส่งข้อมูลล้มเหลว',
        text: 'มีข้อผิดพลาดในการเรียก API'
      })
    }
  }

  // ฟังชัน ย้ายไปหน้า แนบบหลักฐาน
  const handleApprovePage = (sub_id, invoice_id) => {
    router.push(`/member/order/orderReq/?sub_id=${sub_id}&invoice_id=${invoice_id}`)
  }

  // colum
  const columns = [
    { field: 'invoice_id', headerName: 'invoice ID', width: 90 },
    {
      field: 'modified',
      headerName: 'Created Time',
      width: 160,
      editable: true,
      valueFormatter: params => {
        const date = new Date(params.value)

        return date.toLocaleString()
      }
    },
    { field: 'req_header', headerName: 'Header', width: 300 },
    {
      field: 'invoice_status',
      headerName: 'Order Status',
      width: 130,
      renderCell: params => {
        const { value } = params

        let statusElement
        switch (value) {
          case '1':
            statusElement = <Chip label='Wait Market Approve' color='warning' />
            break
          case '2':
            statusElement = <Chip label='Wait Member send proof' color='primary' />
            break
          case '3':
            statusElement = <Chip label='Wait Market verify' color='warning' />
            break
          case '4':
            statusElement = <Chip label='Delivery' color='primary' />
            break
          case '5':
            statusElement = <Chip label='Complete' color='success' />
            break
          case '0':
            statusElement = <Chip label='Reject' color='error' />
            break
          default:
            statusElement = <Chip label='Unknow' color='secondary' />
        }

        return statusElement
      }
    },

    {
      field: 'payment',
      headerName: 'payment',
      minWidth: 140,
      renderCell: rowCell => {
        const invoiceStatus = rowCell.row.invoice_status

        const isDisabled =
          invoiceStatus === '0' ||
          invoiceStatus === '1' ||
          invoiceStatus === '3' ||
          invoiceStatus === '4' ||
          invoiceStatus === '5'

        return (
          <Button
            variant='outlined'
            onClick={() => handleApprovePage(rowCell.row.sub_id, rowCell.row.invoice_id)}
            disabled={isDisabled}
          >
            Attach file
          </Button>
        )
      }
    },

    {
      field: 'Detail_Approve',
      headerName: 'Order Detail',
      minWidth: 140,
      renderCell: rowCell => {
        const invoiceStatus = rowCell.row.invoice_status

        const handleDetailClick = () => {
          router.push(`/member/order/ordersdetailReq/?invoice_id=${rowCell.row.invoice_id}&usertype=1`)
        }

        const isDisabled = invoiceStatus === '0' || invoiceStatus === '1' || invoiceStatus === '2'

        return (
          <Button variant='outlined' onClick={handleDetailClick} disabled={isDisabled}>
            view
          </Button>
        )
      }
    },
    {
      field: 'Detail',
      headerName: 'Requirement Detail',
      minWidth: 180,
      renderCell: rowCell => {
        const invoiceStatus = rowCell.row.invoice_status

        const handleDetailClick = () => {
          router.push(
            `/market/port-detail-marker/?req_id=${rowCell.row.po_requirement}&sub_id=${rowCell.row.sub_id}&member_id2=${rowCell.row.member_id}`
          )
        }

        const isDisabled = invoiceStatus === '0' || invoiceStatus === '1' || invoiceStatus === '2'

        return (
          <Button variant='outlined' onClick={handleDetailClick} disabled={isDisabled}>
            view
          </Button>
        )
      }
    },
    {
      field: 'Coonfirm',
      headerName: 'Coonfirm',
      minWidth: 140,
      renderCell: rowCell => {
        const invoiceStatus = rowCell.row.invoice_status

        const isDisabled =
          invoiceStatus === '0' ||
          invoiceStatus === '1' ||
          invoiceStatus === '2' ||
          invoiceStatus === '3' ||
          invoiceStatus === '5'

        return (
          <Button
            variant='outlined'
            onClick={event => handleConfirmProduct(event, rowCell.row.invoice_id)}
            disabled={isDisabled}
          >
            Confirm
          </Button>
        )
      }
    }
  ]

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {rows === null || rows === undefined || rows.length === 0 ? (
        <div>No data</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={row => row.po_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  )
}

export default ShowOrderReq
