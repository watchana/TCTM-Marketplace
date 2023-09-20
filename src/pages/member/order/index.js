import React, { useState, useRef } from 'react'
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material'
import Total from './total'
import Payment from './payment'
import Tablepayment from './tablepayment'

//**  Next Import
import { useRouter } from 'next/router'

const Indexpayment = () => {
  const router = useRouter() // use router

  // ตัวแปรเก็บค่าข้อมูล
  const { product_id, price, sub_id, member_id, selection } = router.query

  // ตัวแปรเก็บค่าตัวเลือกก่อนส่ง
  let parsedSelection = null
  if (selection && selection !== 'null' && selection !== 'undefined') {
    parsedSelection = JSON.parse(selection) // แปลงค่า selection เป็นออบเจ็กต์
  }

  return (
    <Container>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Box sx={{ width: '100%', p: '20px' }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} sx={{ p: '10px' }}>
              <Total />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: '10px' }}>
              <Payment product_id={product_id} sub_id={sub_id} member_id={member_id} selection={parsedSelection} />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%', p: '18px 10px 10px' }}>
          <Tablepayment />
        </Box>
      </Box>
    </Container>
  )
}

export default Indexpayment
