import axios from 'axios'
import { Box, Card, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid'

const ShowWorkOrder = invoice_id => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (!invoice_id.invoice_id) {
        // console.error('productId is undefined or null')

        return
      }
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}DIGITAL.workorder.get_work_order`, {
          params: {
            invoice_id: invoice_id.invoice_id
          }
        })
        setData(response.data.message.work_order_data)

        // console.clear()
      } catch (error) {
        // console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [invoice_id.invoice_id]) // ใช้เพียง invoice_id เป็น dependency เท่านั้น

  return (
    <Box>
      {data && data.length > 0 ? (
        <Card
          sx={{
            marginBottom: '30px',
            padding: { xs: '10px', sm: '15px 25px 20px' }, // Adjust padding for different screen sizes
            border: '2px solid #primary.main',
            borderRadius: '8px'
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
            Work Order
          </Typography>
          <Box>
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
              height={{ xs: '200px', sm: '300px' }} // Adjust height for different screen sizes
              getRowId={row => row.wod_id}
            />
          </Box>
        </Card>
      ) : (
        <Typography></Typography>
      )}
    </Box>
  )
}

export default ShowWorkOrder
