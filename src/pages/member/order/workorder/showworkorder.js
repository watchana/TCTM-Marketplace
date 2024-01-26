import axios from 'axios'
import { Box, Card, Typography, TableCell, TableRow, TableBody, TableHead, Table, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid'

const ShowWorkOrder = () => {
  const [data, setData] = useState([])

  const router = useRouter() // use router
  const { invoice_id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice details
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.workorder.get_work_order`, {
          params: {
            invoice_id: invoice_id
          }
        })
        setData(response.data.message.work_order_data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id])

  return (
    <Box>
      {data && data.length > 0 ? (
        <Card
          sx={{
            width: '100%',
            marginBottom: '30px',
            padding: '15px 25px 20px',
            border: '2px solid #primary.main',
            borderRadius: '8px'
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
            Work Order
          </Typography>
          <DataGrid
            rows={data}
            columns={[
              { field: 'wod_name', headerName: 'Name', width: 300 },
              { field: 'wod_complete_quantity', headerName: 'Complete Qty', width: 150 },
              { field: 'wod_loss_quantity', headerName: 'Process Loss Qty', width: 200 },
              { field: 'wod_bom', headerName: 'BOM', width: 200 },
              { field: 'wod_work_station', headerName: 'Work Station', width: 100 },
              { field: 'wod_time', headerName: 'Time', width: 100 }
            ]}
            height={'300px'}
            getRowId={row => row.wod_id} // Specify your unique identifier field here
            sortingMode='single'
          />
        </Card>
      ) : (
        <Typography></Typography>
      )}
    </Box>
  )
}

export default ShowWorkOrder
