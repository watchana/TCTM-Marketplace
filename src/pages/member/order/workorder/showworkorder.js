import { TableBody, TableCell, TableHead, Typography } from '@mui/material'
import axios from 'axios'
import { Grid, Box, Card, Table, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

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
            border: '2px solid #primary.main'
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                Work Order
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Complete Quantity</TableCell>
                    <TableCell>Process Loss Quantity</TableCell>
                    <TableCell>BOM</TableCell>
                    <TableCell>Work Station</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index} sx={{ verticalAlign: 'top' }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.wod_name}</TableCell>
                      <TableCell>{item.wod_complete_quantity}</TableCell>
                      <TableCell>{item.wod_loss_quantity}</TableCell>
                      <TableCell>{item.wod_bom}</TableCell>
                      <TableCell>{item.wod_work_station}</TableCell>
                      <TableCell>{item.wod_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Typography></Typography>// If no data, display a message
      )}
    </Box>
  )
}

export default ShowWorkOrder
