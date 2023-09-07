// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material'

const ShowOrder = ({ tabValue, orderList }) => {
  return (
    <Box>
      <Box sx={{ marginBlock: 4 }}>
        <Typography>แทบ: {tabValue}</Typography>
      </Box>
      <Grid container>
        {orderList.map(item => (
          <Grid item xs={12} sx={{ marginBlock: 4 }} key={item.id}>
            <Card sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='subtitle1'>ชื่อร้านค้า : {item.storeName}</Typography>
                <Typography variant='subtitle1' sx={{ display: 'flex', justifyContent: 'flex-end', width: '40vw' }}>
                  พัสดุ : {item.trackNo}
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
                    <Image src={item.productImage} alt={`image${item.id}`} layout='fill' objectFit='cover' />
                  </Box>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Grid container spacing={2} rowSpacing={2} sx={{ pt: { md: 2 } }}>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'>ชื่อสินค้า : {item.productName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant='subtitle1'>ตัวเลือกสินค้า : {item.productOption}</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
                    >
                      <Typography variant='subtitle1'>ราคา : {item.productPrice}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'>จำนวน : {item.productPrice}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box
                  sx={{
                    mx: 4,
                    width: { xs: 60, md: 100 },
                    height: { xs: 60, md: 100 },
                    position: 'relative'
                  }}
                >
                  <Image src={item.productImage} alt={`image${item.id}`} layout='fill' objectFit='cover' />
                </Box>
                <Box sx={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant='subtitle1'>ชื่อสินค้า : {item.productName}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <Typography variant='subtitle1'>ตัวเลือกสินค้า : {item.productOption}</Typography>
                      <Typography variant='subtitle1'>ราคา : {item.productPrice}</Typography>
                    </Box>
                  </Box>
                  <Typography variant='subtitle1'>จำนวน : {item.productPrice}</Typography>
                </Box>
              </Box> */}
              <Divider sx={{ marginBlock: 4 }} />
              <Grid container spacing={2} rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography variant='body1'>รวมการสั่งซื้อ: ฿{item.productTotal}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='caption'>กรุณากดยืนยันหลังจากได้รับและตรวจสอบสินค้าแล้ว</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button fullWidth variant='contained'>
                        ตรวจสอบสินค้าและยอมรับสินค้า
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button fullWidth variant='contained'>
                        ขอคืนเงิน
                      </Button>{' '}
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button fullWidth variant='contained'>
                        ติดต่อผู้ขาย
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ShowOrder
