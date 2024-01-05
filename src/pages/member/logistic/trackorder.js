// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
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

// ** axios Import
import axios from 'axios'

const TrackingStatus = ({ productdata, updateProductData, trackNo }) => {
  //แสดงสถานะการขนส่ง
  const [status, setStatus] = useState([])

  const router = useRouter() //use router

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  if (!productdata || productdata.length === 0) {
    return <Typography>No Product</Typography>
  }

  const usertype = '1' // usertype = '1'(member) usertype = '2'(marker)

  // ฟังชัน ย้ายไปหน้า แนบบหลักฐาน
  const handleApprovePage = (sub_id, invoice_id) => {
    router.push(`/member/order/?sub_id=${sub_id}&invoice_id=${invoice_id}`)
  }

  // ฟังชัน ย้ายไปหน้า ดูรายละเอียดผลิตภัณ
  const handleDetailPage = invoice_id => {
    router.push(`/member/logistic/showstatus/?invoice_id=${invoice_id}&usertype=${usertype}`)
  }

  // ฟังชันยืนยันข้อมูล
  const handleConfirmProduct = async (event, invoice_id) => {
    event.preventDefault()

    try {
      const data = {
        invoice_id: invoice_id
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.member_confirm_product`, data)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success'
        })
        console.log(response.status)
        updateProductData()
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

  return (
    <Container maxWidth='xl'>
      {productdata.length === 0 ? (
        <Typography>No Data</Typography>
      ) : (
        <Grid container spacing={4}>
          {productdata.map((item, index) => (
            <>
              <Grid item key={index.id}>
                <Typography variant='body1' fontWeight='' fontSize='1.0rem' color='#000'>
                  Product: {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Card variant='outlined'>
                  <Grid container justifyContent='space-between' sx={{ padding: '14px 14px 0px' }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body1' fontSize='1.0rem' color='#000'>
                        Market Name: {item.sub_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body1' fontSize='1.0rem' color='#000' textAlign='end'>
                        ORDER ID : {item.invoice_id}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={2}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '7px 14px 0px',
                            maxWidth: '250px',
                            maxHeight: '250px'
                          }}
                        >
                          <CardMedia
                            component='img'
                            src={`/imgTctmProduct/${item.image_file_name}`}
                            alt={`image`}
                            height='auto'
                            sx={{ minWidth: '100px', minHeight: '100px' }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '7px 14px 0px' }}>
                          <Typography variant='body1' fontWeight='' fontSize='1.0rem' color='#000'>
                            Product: {item.product_name}
                            {status}
                          </Typography>
                          <Typography variant='body1' fontWeight='' fontSize='1.0rem' color='#000'>
                            Amount: {item.amount}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: '7px 14px 0px'
                          }}
                        >
                          <Typography variant='body1' fontSize='1.0rem' textAlign='end' color='#e61610'>
                            ฿ {item.price_total}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12}>
                      <Grid container justifyContent='space-between' sx={{ paddingX: 4 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='caption'>
                            Please press confirm after receiving and inspecting the product.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant='h6' fontSize='24px bold' color='#2d2e81' textAlign='end'>
                            total Price: {item.price_total}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Box sx={{ width: '100%', padding: 4 }}>
                      <Grid container spacing={2} justifyContent='flex-end'>
                        <Grid item xs={12} md={2}>
                          {/* <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={
                              item.invoice_status === '0' ||
                              item.invoice_status === '1' ||
                              item.invoice_status === '3' ||
                              item.invoice_status === '4' ||
                              item.invoice_status === '5'
                            }
                            onClick={() => handleApprovePage(item.sub_id, item.invoice_id)}
                          >
                            Attach file
                          </Button> */}
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button fullWidth variant='outlined' onClick={() => handleDetailPage(item.invoice_id)}>
                            Detail
                          </Button>
                        </Grid>
                        
                      </Grid>
                    </Box>
                  </Grid>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default TrackingStatus
