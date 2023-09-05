import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  Container,
  Button,
  TableCell,
  TableRow,
  TableHead,
  Box,
  Paper,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'

const Payment = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileInputChange = e => {
    const file = e.target.files[0]
    setSelectedFile(file)
  }

  const handleUploadButtonClick = () => {
    // ทำอะไรกับไฟล์ที่ถูกอัพโหลดที่นี่ (เช่น ส่งไปยังเซิร์ฟเวอร์)
  }

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={8}>
        {/* ส่วนราคารวมของสินค้า */}
        <Grid item xs={15} sm={4}>
          <Card>
            <CardContent>
              <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', alignItems: 'baseline' }}>
                <Typography variant='subtitle1' gutterBottom>
                  items in the Cart
                </Typography>
              </div>
              <div style={{ marginLeft: '15px', display: 'flex', alignItems: 'baseline' }}>
                <Typography variant='body1' style={{ color: 'gray' }} paragraph>
                  {' '}
                  Discount{' '}
                </Typography>
              </div>
            </CardContent>

            {/* ส่วนของ Total */}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <Box style={{ marginLeft: '36px' }}> Total:</Box>
            </div>
            <br />

            <hr />

            <br />
          </Card>

          <br />
          <Card>
            <CardContent>
              <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='subtitle1' gutterBottom>
                  แสดงหลักฐานการโอนเงิน
                </Typography>
                <input
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />
                <Button variant='contained' color='primary' onClick={() => fileInputRef.current.click()}>
                  เลือกรูปภาพ
                </Button>
                <br />
                {selectedFile && (
                  <Box mt={2}>
                    <Typography variant='body1'>{selectedFile.name}</Typography>
                  </Box>
                )}
                <Button variant='contained' color='primary' onClick={handleUploadButtonClick} mt={2}>
                  อัพโหลด
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <div style={{ marginTop: '10px', marginLeft: '15px', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='subtitle1' gutterBottom>
                  โอนเงินเพื่อชำระค่าสินค้าผ่านธนาคารไปยังบัญชีธนาคาร
                </Typography>
                <table style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
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
                <Typography variant='subtitle1' gutterBottom style={{ marginTop: '20px' }}>
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
                <Typography variant='body1' gutterBottom>
                  สแกน QR Code เพื่อชำระสินค้า
                </Typography>
                <img src='URL_QR_CODE_IMAGE' alt='QR Code' />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <br />
      </Grid>
      <br />
    </Container>
  )
}

export default Payment
