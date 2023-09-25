// ** React Imports
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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

  console.log('rows: ', rows)

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
    { field: 'po_id', headerName: 'PO ID', width: 120 },
    {
      field: 'modified',
      headerName: 'Created Time',
      width: 250,
      editable: true,
      valueFormatter: params => {
        const date = new Date(params.value)

        return date.toLocaleString()
      }
    },
    { field: 'descritp_tion', headerName: 'Description', width: 320 },
    {
      field: 'payment',
      headerName: 'payment',
      minWidth: 100,
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
            แนบหลักฐาน
          </Button>
        )
      }
    },

    {
      field: 'Detail_Approve',
      headerName: 'Detail Approve',
      minWidth: 100,
      renderCell: rowCell => {
        const invoiceStatus = rowCell.row.invoice_status

        const handleDetailClick = () => {
          router.push(`/member/order/ordersdetailReq/?invoice_id=${rowCell.row.invoice_id}&usertype=1`)
        }

        const isDisabled = invoiceStatus === '0' || invoiceStatus === '1' || invoiceStatus === '2'

        return (
          <Button variant='outlined' onClick={handleDetailClick} disabled={isDisabled}>
            ดูรายละเอียด
          </Button>
        )
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      minWidth: 100,
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
            ดูรายละเอียด
          </Button>
        )
      }
    },
    {
      field: 'Coonfirm',
      headerName: 'Coonfirm',
      minWidth: 100,
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
            ยอมรับสินค้า
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
