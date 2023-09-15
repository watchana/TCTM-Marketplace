import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'

const Tablepayment = () => {
  return (
    <Card>
    <CardContent>
      <div
        style={{
          marginTop: '15px',
          marginLeft: '15px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant='subtitle1' gutterBottom>
          โอนเงินเพื่อชำระค่าสินค้าผ่านธนาคารไปยังบัญชีธนาคาร
        </Typography>
        <table style={{ borderCollapse: 'collapse' }} sx={{ p: '10px 0px 10px'}}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>ชื่อบัญชี</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>บริษัท ดิจิตอล (ไทยแลนด์) จำกัด</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>บัญชีอออมทรัพย์เลขที่</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>101-203214-9</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>ธนาคารไทยพาณิชย์</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>สาขาถนนสาทร</td>
            </tr>
          </tbody>
        </table>
        <Typography variant='subtitle1' gutterBottom sx={{ p: '10px 0px -0px'}}>
          ชำระสินค้าผ่านพร้อมเพย์
        </Typography>
        <table style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>ชื่อบัญชี</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>บริษัท ดิจิตอล (ไทยแลนด์) จำกัด</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>เลขประจำตัวเสียภาษี</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>01055400088324</td>
            </tr>
          </tbody>
        </table>
        <Typography variant='body1' sx={{ p: '10px 0px 10px'}} gutterBottom>
          สแกน QR Code เพื่อชำระสินค้า
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src='https://www.paymentscardsandmobile.com/wp-content/uploads/2020/05/PayPal-QR-code.png'
            alt='QR Code'
            style={{ maxWidth: '40%' }}
          />
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

export default Tablepayment
