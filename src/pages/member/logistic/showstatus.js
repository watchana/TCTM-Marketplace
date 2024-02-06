// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Hidden,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Material-UI Icons Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Axios import
import axios from 'axios'
import Total from 'src/pages/member/order/details_total'
import Delivery from 'src/pages/member/order/delivery_address'
import Paymant from 'src/pages/member/order/payment_details'
import Word_order from 'src/pages/member/order/workorder/word_order'
import ShowWorkOrder from 'src/pages/member/order/workorder/showworkorder'

//** Auth check
import { withAuth } from 'src/@core/utils/AuthCheck'

// Responsive image
import { useMediaQuery } from '@mui/material'

const Show_Status = () => {
  // ใช้งาน Router
  const router = useRouter() // use router
  const { invoice_id, usertype } = router.query

  //ตัวแปรเก็บค่าข้อมูล
  const [orderdata, setOrderData] = useState('') // Order Data
  const [productoption, setProductOption] = useState('') // Product Option

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

  const [data, setData] = useState([])
  const [userId, setUserId] = useState('')
  const [userdata, setUserData] = useState({})

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem('Member_Id')
    if (userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage)
    }
  }, [])

  useEffect(() => {
    if (userId) {
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
          console.error(error)
        }
      }

      const intervalId = setInterval(() => {
        fetchData() // Fetch data every 1 minute
      }, 60000) // 1 minute in milliseconds

      return () => clearInterval(intervalId) // Clear the interval on component unmount
    }
  }, [userId])

  const isSmallScreen = useMediaQuery('(max-width: 700px)') // ปรับขนาดตามขอบเขตของหน้าจอที่คุณต้องการ

  return (
    <Container maxWidth='xl'>
      <Box>
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: isSmallScreen ? '80px' : '90px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              backgroundColor: '#2d2e81',
              border: '1px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography
                  color='#fff'
                  variant='h5'
                  sx={{ fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.6rem' } }}
                >
                  Orders Detail
                  {usertype === '2' ? <span> (Marker)</span> : usertype === '1' ? <span> (User)</span> : null}
                </Typography>
                <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb' color='#fff'>
                  <Link href='/' passHref>
                    <Typography
                      color='#fff'
                      variant='subtitle1'
                      sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                    >
                      Home
                    </Typography>
                  </Link>
                  <Typography
                    color='#fff'
                    variant='subtitle1'
                    sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                  >
                    Market Management
                  </Typography>
                  <Typography
                    color='#fff'
                    variant='subtitle1'
                    sx={{ cursor: 'pointer', fontSize: { xs: '0.8rem', sm: '0.8rem', md: '1rem' } }}
                  >
                    detail
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 50, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        {/** เลขออเดอร์ */}
        <Box sx={{ width: '100%' }}>
          <Card
            sx={{
              height: '100px',
              marginBottom: '30px',
              padding: '15px 25px 20px',
              border: '2px solid #primary.main'
            }}
          >
            <Grid container alignItems='center'>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant='h5' fontSize='18px bold'>
                  Product Id: {orderdata.product_id}
                </Typography>
                <Typography variant='subtitle2' fontSize='14px' sx={{ p: '0px 4px 0px' }}>
                  Below are the details order
                </Typography>
              </Grid>
              <Hidden smDown>
                <Grid item sm={4} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <MailOutlineIcon sx={{ fontSize: 72, color: '#fff' }} />
                </Grid>
              </Hidden>
            </Grid>
          </Card>
        </Box>

        <Grid container>
          <Grid item sm={12} md={5}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Total productoption={productoption} orderdata={orderdata} />
                </Box>
              </Grid>
              <Grid item sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Delivery orderdata={{ orderdata }} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={5} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <ShowWorkOrder invoice_id={invoice_id} />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Paymant
                    usertype={usertype}
                    orderdata={orderdata}
                    invoice_id={invoice_id}
                    receipt={orderdata.receipt_file_name}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default withAuth(Show_Status)
