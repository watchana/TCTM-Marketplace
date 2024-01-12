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
  const router = useRouter() // use router
  const { invoice_id } = router.query

  // เก็บค่าข้อมูลจาก Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.invoice_detail`, {
          params: {
            invoice_id: invoice_id
          }
        })
        setOrderData(response.data.message.Data[0])
        setProductOption(response.data.message.Option_List)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [invoice_id])
  console.log(localStorage)

  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [userdata, setUserData] = useState({})

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.profile.display_profile`, {
        params: {
          member_id: userId
        }
      })
      const user = userResponse.data.message.Data[0]
      setUserData(user)

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${user.sup_hostaddress}MFG-WO-2023-00008`,
        headers: {
          Authorization: `token ${user.sup_apikey}:${user.sup_apisecret}`
        }
      }

      const workOrderResponse = await axios.request(config)
      setData(workOrderResponse.data.data.operations)

      console.log('operations', workOrderResponse.data.data.planned_end_date)
      console.log('actual_start_date', workOrderResponse.data.data.actual_start_date)
      console.log('planned_end_date', workOrderResponse.data.data.planned_end_date)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    if (userId) {
      fetchData() // Initial data fetch

      const intervalId = setInterval(() => {
        fetchData() // Fetch data every 1 minute
      }, 60000) // 1 minute in milliseconds

      return () => clearInterval(intervalId) // Clear the interval on component unmount
    }
  }, [userId])

  return (
    <Container maxWidth='xl'>
      <Grid container>
        <Grid item sm={12} md={12}>
          <Card
            sx={{
              width: '100%',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              border: '2px solid #primary.main'
            }}
          >
            <Grid container spacing={3} rowSpacing={2}>
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default withAuth(Word_order)
