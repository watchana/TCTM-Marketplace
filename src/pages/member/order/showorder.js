// ** React Imports
import React, { useEffect, useState } from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'

const ShowOrder = ({ productdata }) => {
  // console.log('bill', productdata)
  const router = useRouter()
  if (!productdata || productdata.length === 0) {
    return <Typography>No Product</Typography>
  }

  // ฟังชัน ย้ายไปหน้า แนบบหลักฐาน
  const handleApprovePage = (sub_id, invoice_id) => {
    router.push(`/member/order/?sub_id=${sub_id}&invoice_id=${invoice_id}`)
  }

  return (
    <Box>
      {productdata.length === 0 ? (
        <Typography>No Data</Typography>
      ) : (
        <>
          {productdata.map((item, index) => (
            <div key={index}>
              <Box sx={{ marginBlock: 4 }}>
                <Typography>แทบ: {index + 1}</Typography>
              </Box>
              <Grid container>
                <Grid item xs={12} sx={{ marginBlock: 4 }}>
                  <Card sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='subtitle1'>ชื่อร้านค้า : {item.sub_name}</Typography>
                      <Typography
                        variant='subtitle1'
                        sx={{ display: 'flex', justifyContent: 'flex-end', width: '40vw' }}
                      >
                        ORDER ID : {item.invoice_id}
                      </Typography>
                    </Box>
                    <Divider />
                    <Grid container spacing={2} rowSpacing={2}>
                      <Grid item xs={3} md={2}>
                        <Box
                          sx={{
                            mx: 4,
                            width: { xs: '10vw', sm: 100, md: 100, lg: 150 },
                            height: { xs: '10vh', sm: 100, md: 100, lg: 150 },
                            position: 'relative'
                          }}
                        >
                          <Image
                            src={`/imgTctmProduct/${item.image_file_name}`}
                            alt={`image`}
                            layout='fill'
                            objectFit='cover'
                            loader={({ src }) => src}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={9} md={10}>
                        <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
                          <Grid item xs={12}>
                            <Typography variant='subtitle1'>ชื่อสินค้า : {item.product_name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant='subtitle1'>จำนวน : {item.amount}</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
                          >
                            <Typography variant='subtitle1'>ราคา : {item.price_total} บาท</Typography>
                          </Grid>
                          <Grid item xs={12}></Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Divider sx={{ marginBlock: 4 }} />
                    <Grid container spacing={2} rowSpacing={2}>
                      <Grid item xs={12}>
                        <Typography variant='body1'>รวมการสั่งซื้อ: ฿{item.price_total}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='caption'>กรุณากดยืนยันหลังจากได้รับและตรวจสอบสินค้าแล้ว</Typography>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={2} rowSpacing={2}>
                          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              fullWidth
                              variant='contained'
                              disabled={
                                item.invoice_status === '0' ||
                                item.invoice_status === '1' ||
                                item.invoice_status === '3' ||
                                item.invoice_status === '4' ||
                                item.invoice_status === '5'
                              }
                              onClick={() => handleApprovePage(item.sub_id, item.invoice_id)}
                            >
                              แนบหลักฐาน
                            </Button>{' '}
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              fullWidth
                              variant='contained'
                              disabled={
                                item.invoice_status === '0' ||
                                item.invoice_status === '1' ||
                                item.invoice_status === '2'
                              }
                            >
                              ดูรายละเอียด
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              fullWidth
                              variant='contained'
                              disabled={
                                item.invoice_status === '0' ||
                                item.invoice_status === '1' ||
                                item.invoice_status === '2' ||
                                item.invoice_status === '3' ||
                                item.invoice_status === '5'
                              }
                            >
                              ยอมรับสินค้า
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </div>
          ))}
        </>
      )}
    </Box>
  )
}

export default ShowOrder
