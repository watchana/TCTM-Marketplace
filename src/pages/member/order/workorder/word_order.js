// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

// ** Axios import
import axios from 'axios'

//** Auth check
import { withAuth } from 'src/@core/utils/AuthCheck'

const Word_order = () => {
  // ใช้งาน Router
  const router = useRouter()
  const { invoice_id } = router.query
  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoice details
        const invoiceResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id
          }
        })
        const invoiceData = invoiceResponse.data.message.Data[0]
        setProcess(invoiceData.process_status)

        // Fetch user profile
        const userIdFromLocalStorage = localStorage.getItem('Member_Id')
        if (userIdFromLocalStorage) {
          setUserId(userIdFromLocalStorage)

          const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
            params: {
              member_id: userIdFromLocalStorage
            }
          })

          const user = userResponse.data.message.Data[0]
          setUserData(user)

          // Fetch work order data
          const config = {
            method: 'get',
            maxBodyLength: Infinity,

            // url: 'https://tonen.vsiam.com/api/resource/Work%20Order/MFG-WO-2023-00019',

            url: user.sup_hostaddress + invoiceData.process_status,
            headers: {
              // Authorization: `token 5891d01ccc2961e:0e446b332dc22aa`

              Authorization: `token ${user.sup_apikey}:${user.sup_apisecret}`
            }
          }

          const workOrderResponse = await axios.request(config)
          setData(workOrderResponse.data.data.operations)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData() // Initial data fetch

    const intervalId = setInterval(() => {
      fetchData() // Fetch data every 1 minute
    }, 60000) // 1 minute in milliseconds

    return () => clearInterval(intervalId) // Clear the interval on component unmount
  }, [userId, invoice_id])

  return (
    <Box>
      {data.length > 0 && ( // Check if data has items
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

            <Grid item>
              <Table>
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
                      <TableCell>{item.operation}</TableCell>
                      <TableCell>{item.completed_qty}</TableCell>
                      <TableCell>{item.process_loss_qty}</TableCell>
                      <TableCell>{item.bom}</TableCell>
                      <TableCell>{item.workstation}</TableCell>
                      <TableCell>{item.time_in_mins}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Card>
      )}
      {data.length === 0 && (
        <Box sx={{ display: 'none' }}>No Data</Box> // If no data, hide the entire content
      )}
    </Box>
  )
}

export default withAuth(Word_order)
