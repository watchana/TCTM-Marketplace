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
      <Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Total />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={11} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ width: '100%' }}>
                  <Payment product_id={product_id} sub_id={sub_id} member_id={member_id} selection={parsedSelection} />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '100%' }}>
              <Tablepayment />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Indexpayment
