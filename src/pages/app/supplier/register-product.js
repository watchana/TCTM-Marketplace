// *** React Import
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// ** Mui imports
import {
  Card,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  ListSubheader,
  Button,
  ImageList,
  ImageListItem
} from '@mui/material'

const RegisterProductPage = () => {
  const [uploadImages, setUploadImages] = useState([])

  const handleImageChange = event => {
    const files = event.target.files
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setUploadImages([...uploadImages, ...newImages])
    }
  }

  useEffect(() => {
    console.log(uploadImages)
  }, [uploadImages])

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4'>Register Product</Typography>
        <Typography variant='body1'>กรอกข้อมูลสินค้าที่ต้องการลงทะเบียน</Typography>
      </Box>

      <Card sx={{ padding: 10 }}>
        <Typography variant='h5'>รูปภาพสินค้า</Typography>
        <Box sx={{ my: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
          <Grid container spacing={5} sx={{ p: 4 }}>
            <Grid item xs={12} sm={2}>
              <Box sx={{ my: 4 }}>
                <Button
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.01)',
                    width: 'full',
                    height: 150
                  }}
                  component='label'
                  fullWidth
                >
                  Upload Image
                  <input type='file' accept='image/*' hidden multiple onChange={handleImageChange} />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Box sx={{ my: 4, p: 4 }} border={1} borderColor='rgba(0, 0, 0, 0.2)' borderRadius={1}>
                {uploadImages ? (
                  <div>
                    <ImageList sx={{ width: '100%', height: 500 }} cols={3}>
                      {uploadImages.map((image, index) => (
                        <ImageListItem key={index}>
                          <Image
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            loading='lazy'
                            width={164}
                            height={164}
                            layout='responsive'
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </div>
                ) : (
                  <Typography variant='body1'>No image selected</Typography>
                )}
              </Box>
              <Box></Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography>ชื่อสินค้า</Typography>
            <TextField fullWidth id='product-name' label='กรอกชื่อสินค้า' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Typography>ราคาสินค้า</Typography>
            <TextField fullWidth id='product-price' label='กรอกชื่อสินค้า' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Typography>จำนวนสินค้า</Typography>
            <TextField fullWidth id='product-quantity' label='กรอกจำนวนสินค้า' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <Typography>หมวดหมู่</Typography>
            <Select fullWidth defaultValue='' id='grouped-select' label='Grouping'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <ListSubheader>Category 1</ListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography>รายละเอียดสินค้า</Typography>
            <TextField
              fullWidth
              id='product-detail'
              multiline
              rows={4}
              label='กรอกรายละเอียดสินค้า'
              variant='outlined'
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default RegisterProductPage
