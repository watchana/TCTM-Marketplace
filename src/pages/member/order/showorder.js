// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'

// ** axios Import
import axios from 'axios'

const ShowOrder = ({ productdata, updateProductData }) => {
  const router = useRouter() //use router
  // const [Imount, setImount] = useState()
  //Select for Checkout Order
  const [selectedItems, setSelectedItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const stickyStyle = {
    position: 'sticky',
    bottom: '1px', // กำหนดระยะห่างจากด้านล่างของหน้าเว็บ
    zIndex: '1000' // กำหนดความสูงของปุ่มเมื่อมีองค์ประกอบอื่นทับอยู่
  }

  const stickyRice = {
    position: 'sticky',
    top: '1px', // กำหนดระยะห่างจากด้านล่างของหน้าเว็บ
    zIndex: '1000' // กำหนดความสูงของปุ่มเมื่อมีองค์ประกอบอื่นทับอยู่
  }

  useEffect(() => {
    // Calculate total price of selected items
    const sum = selectedItems.reduce((acc, currItem) => acc + parseFloat(currItem.price_total), 0)
    setTotalPrice(sum)
  }, [selectedItems])

  // นำเข้าตัวsweetalert2
  const Swal = require('sweetalert2')

  if (!productdata || productdata.length === 0) {
    return <Typography>No Product</Typography>
  }

  // Function to handle checkbox change
  const handleCheckboxChange = (event, item) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedItems([...selectedItems, item])
    } else {
      const filteredItems = selectedItems.filter(selectedItem => selectedItem !== item)
      setSelectedItems(filteredItems)
    }
    setIsDrawerOpen(isChecked)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(totalPrice <= 0)
  }

  const convertArrayToObject = (arr = []) => {
    const obj = {}
    arr.forEach((item, index) => {
      obj[index + 1] = JSON.stringify(item)
    })

    return obj
  }

  const handleCheckout = () => {
    // Assuming selectedItems is an array of objects with sub_id and invoice_id properties
    const supId = selectedItems.map(({ sub_id, invoice_id }) => ({ sub_id, invoice_id }))

    const objToEncode = convertArrayToObject(supId)
    const queryString = new URLSearchParams(objToEncode).toString()
    const encodedQueryString = encodeURIComponent(queryString)
    const urlParams = new URLSearchParams(encodedQueryString)
    const decodedQueryString = decodeURIComponent(urlParams)

    router.push(`/member/order/changeorder/?${decodedQueryString}`)

    // console.log('encodedQueryString',decodedQueryString)
  }

  const usertype = '1' // usertype = '1'(member) usertype = '2'(marker)

  // ฟังชัน ย้ายไปหน้า แนบบหลักฐาน
  const handleApprovePage = (sub_id, invoice_id) => {
    const supId = [{ sub_id: sub_id ,  invoice_id: invoice_id }]

    const objToEncode = convertArrayToObject(supId)
    const queryString = new URLSearchParams(objToEncode).toString()
    const encodedQueryString = encodeURIComponent(queryString)
    const urlParams = new URLSearchParams(encodedQueryString)
    const decodedQueryString = decodeURIComponent(urlParams)

    router.push(`/member/order/?${decodedQueryString}`)
  }

  // ฟังชัน ย้ายไปหน้า ดูรายละเอียดผลิตภัณ
  const handleDetailPage = invoice_id => {
    router.push(`/member/order/ordersdetail/?invoice_id=${invoice_id}&usertype=${usertype}`)
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
      {productdata.length === '0' ? (
        <Typography>No Data</Typography>
      ) : (
        <Grid container spacing={4}>
          {productdata
            .map((item, index) => ({
              index,
              item
            }))
            .filter(

              // Filter by item
              ({ item }) =>
                (item.price_total !== null && item.price_total >= '1' && item.invoice_status === '2') ||
                (item.price_total !== null && item.price_total >= '1' && item.invoice_status === '1')
            )
            .map(({ index, item }) => (


                <Grid item xs={12} key={index.id}>
                  <Card variant='outlined'>
                    <Grid container justifyContent='space-between' sx={{ padding: '14px 14px 0px' }}>
                      <Grid item xs={12} sm={1}>
                        <Checkbox
                          checked={selectedItems.includes(item)}
                          onChange={e => handleCheckboxChange(e, item)}
                          disabled={item.invoice_status !== '2'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
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
                            <Button
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
                              {item.invoice_status === '2' ? 'Checkout' : 'Wait Confirm...'}
                            </Button>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <Button
                              fullWidth
                              variant='outlined'
                              disabled={
                                item.invoice_status === '0' ||
                                item.invoice_status === '1' ||
                                item.invoice_status === '2'
                              }
                              onClick={() => handleDetailPage(item.invoice_id)}
                            >
                              Detail
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Card>
                </Grid>
              
            ))}
        </Grid>
      )}

      <Grid container spacing={4} elevation={16}>
        <Drawer
          anchor='bottom'
          open={isDrawerOpen}
          onClose={toggleDrawer}
          variant='persistent'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '95.2%',
              height: 240,
              ml: 8.8,

              borderRadius: '5px'
            }
          }}
        >
          <Grid style={stickyRice}>
            <Card>
              <Typography variant='h6' gutterBottom>
                Selected Items
              </Typography>
            </Card>
          </Grid>
          {selectedItems.map((item, index) => (
            <Grid key={index}>
              <ListItem>
                <Card variant='outlined' elevation={8} sx={{ width: '100%', elevation: 12 }}>
                  <Grid container>
                    <Grid item xs={12} sm={5}>
                      <Typography variant='body1' fontSize='1.0rem' color='#000'>
                        Market Name: {item.sub_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='body1' fontSize='1.0rem' color='#000' textAlign='end'>
                        ORDER ID : {item.invoice_id}
                      </Typography>
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
                  </Grid>
                </Card>
              </ListItem>
            </Grid>
          ))}
          <Divider />
          <Grid style={stickyStyle}>
            <Card>
              <Grid>
                <Typography variant='subtitle1'>Total Price: {totalPrice}</Typography>
              </Grid>

              <Button variant='contained' color='primary' onClick={handleCheckout} fullWidth>
                Checkout
              </Button>
            </Card>
          </Grid>
        </Drawer>
      </Grid>
    </Container>
  )
}

export default ShowOrder
