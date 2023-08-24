import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { withAuth } from './pages/AuthCheck'
import SlideshowWithCards from './Fuse/slide/slidebillboard'
import SlideshowWithProduct from './Fuse/slide/slideproduct'
import { Button } from '@mui/material'
import Link from 'src/@core/theme/overrides/link'
import SlideshowWithCategory from './Fuse/slide/slidecategoer'
import axios from 'axios'

const Dashboard = ({ productData }) => {
  const router = useRouter()

  return (
    <Container>
      <Box sx={{ height: '100%' }}>
        {/** ส่วนของ Billboard */}
        <SlideshowWithCards productData={productData} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginY: 5 }}>
          <Typography variant='h4'> Products! </Typography>
          {/** ใส่ Link Product */}
          <a href=''>View More</a>
        </Box>
        <Box sx={{ width: '100%' }}>
          {/** ส่วนของ Slide Products! */}
          <SlideshowWithProduct productData={productData} />
        </Box>
      </Box>
    </Container>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.product.allproducts`)
    const productData = response.data.message.Data

    return {
      props: {
        productData
      }
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        productData: []
      }
    }
  }
}

export default withAuth(Dashboard)
