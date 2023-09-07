import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Grid, Typography, Card, CardContent, Container, Button, Box } from '@mui/material'

const Payment = ({ storeName, productName, quantity, price, imgSrc, color }) => {
  return (
    <Grid item xs={12} sm={15}>
      {/* นี่คือ Grid item ที่รองรับ Card */}
      <Card sx={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px' }}>
        <CardContent>
          <Box sx={{ width: '100%' }}>
            {/* นี่คือ Box ที่ครอบส่วนของชื่อร้านค้า */}
            <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', alignItems: 'baseline' }}>
              <Typography variant='subtitle1' gutterBottom>
                ชื่อร้านค้า: {storeName}
              </Typography>
            </div>
          </Box>
          <hr />
          <br />
          <Box sx={{ width: '100%' }}>
            {/* นี่คือ Box ที่ครอบส่วนของรายละเอียดสินค้า */}
            <Grid justifyContent='flex-start'>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Box sx={{ width: '30%' }}>
                    {/* นี่คือ Box ที่ครอบส่วนของรูปภาพสินค้า */}
                    <div style={{ marginRight: '25px' }}>
                      <img src={imgSrc} alt='imageorder' width='100%' />
                    </div>
                  </Box>
                  <Box sx={{ height: 100, width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                    {/* นี่คือ Box ที่ครอบส่วนของรายละเอียดสินค้า */}
                    <div style={{ margin: 10 }}>
                      <Typography variant='body1'>ชื่อสินค้า: {productName}</Typography>
                      <br />
                      <Typography variant='body1'>สินค้าที่เลือก: {color}</Typography>
                      <br />
                      <Typography variant='body1'>จำนวนที่เลือก: {quantity}</Typography>
                    </div>
                  </Box>
                  <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center' }}>
                    {/* นี่คือ Box ที่ครอบส่วนของราคาสินค้า */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
                      <Box>
                        <Typography variant='body1' style={{ color: 'green' }}>
                          {price} THB
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
          <hr />
          <Box sx={{ width: '99%' }}>
            {/* นี่คือ Box ที่ครอบส่วนของราคารวมการสั่งซื้อ */}
            <Grid item xs={12} sm={12} md={11}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant='body1' style={{ color: 'green' }}>
                  รวมการสั่งซื้อ: {price} THB
                </Typography>
                <br />
              </div>
            </Grid>
          </Box>
          <CardContent>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              {/* นี่คือ Box ที่ครอบส่วนของปุ่มและข้อความในล่าง */}
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: '35%', display: 'flex', justifyContent: 'flex-end' }}>
                  {/* นี่คือ Box ที่ครอบข้อความสำหรับคำแนะนำ */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
                    <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                      กรุณากดยืนยันหลังจากได้รับและตรวจสอบสินค้าแล้ว
                    </Typography>
                  </div>
                </Box>
                <Grid>
                  <Box sx={{ width: '15%' }}>
                    {/* นี่คือ Box ที่ครอบปุ่ม "ตรวจสอบสินค้าและยอมรับ" */}
                    <Button sx={{ width: 200 }} variant='outlined' color='primary'>
                      ตรวจสอบสินค้าและยอมรับ
                    </Button>
                  </Box>
                </Grid>
                <Grid>
                  <Box sx={{ width: '15%' }}>
                    {/* นี่คือ Box ที่ครอบปุ่ม "ขอคืนเงิน" */}
                    <Button sx={{ width: 200 }} variant='contained' color='primary'>
                      ขอคืนเงิน
                    </Button>
                  </Box>
                </Grid>
                <Grid>
                  <Box sx={{ width: '18%' }}>
                    {/* นี่คือ Box ที่ครอบปุ่ม "ติดต่อผู้ขาย" */}
                    <Button sx={{ width: 200 }} variant='contained' color='inherit'>
                      ติดต่อผู้ขาย
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
}

const ProductDummy = () => {
  return (
    <Container maxWidth='lg' style={{ padding: '20px' }}>
      <Box>
        <Grid container spacing={10}>
          {/* เพิ่มรายการสินค้าที่ต้องการ */}
          <Payment
            storeName='oker'
            productName='ZELDAR X25'
            color='Black'
            quantity='2'
            price='150'
            imgSrc='/imgTctmProduct/PNG_X58_BLACK-00.png'
          />
          <Payment
            storeName='Nubwo'
            productName='ANTARES X58'
            color='Black'
            quantity='3'
            price='250'
            imgSrc='/imgTctmProduct/AW_Present_NubwoX_X25.jpg'
          />
          <Payment
            storeName='rezear'
            productName='NUBWO HEADSET N40'
            color='Red'
            quantity='1'
            price='50'
            imgSrc='/imgTctmProduct/550x6002.jpg'
          />
        </Grid>
      </Box>
    </Container>
  )
}

export default ProductDummy
