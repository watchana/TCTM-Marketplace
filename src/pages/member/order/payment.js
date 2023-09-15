import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'

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
    <Card>
    <CardContent>
      <div
        style={{
          marginTop: '5px',
          marginLeft: '15px',
          marginRight: '15px',
          marginRight: '5px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
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
  )
}

export default Payment
