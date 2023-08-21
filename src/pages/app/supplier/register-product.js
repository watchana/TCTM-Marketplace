// *** React Import
import React from 'react'

// ** Mui imports
import { Card, Grid, Typography, Box, TextField, Select, MenuItem, ListSubheader } from '@mui/material'

const RegisterProductPage = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4'>Register Product</Typography>
        <Typography variant='body1'>กรอกข้อมูลสินค้าที่ต้องการลงทะเบียน</Typography>
      </Box>
      <Card sx={{ padding: 10 }}>
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
