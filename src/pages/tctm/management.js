// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Tab, Card, Typography, Grid, Link, Stack, Breadcrumbs, Hidden } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

// ** MDI Icon Imports
import CircleSmall from 'mdi-material-ui/CircleSmall'

// ** Material-UI Icons Imports
import LocalAtmIcon from '@mui/icons-material/LocalAtm'

// ** Import axios
import axios from 'axios'

import MemberTable from 'src/views/tctm/MemberTable'
import SupplierTable from 'src/views/tctm/SupplierTable'
import ProductTable from 'src/views/tctm/ProductTable'
import PostTable from 'src/views/tctm/PostTable'

const ManagementPage = () => {
  const [value, setValue] = useState('1')
  const [dataUser, setDataUser] = useState([])
  const [dataMarket, setDataMarket] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [dataPost, setDataPost] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.userqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const marketResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.supplierqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const productResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.productsqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        const postResponse = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.approve.requirementqueue`, {
          headers: {
            Authorization: 'token 76dc8ec5e14d19c:a644317879022f2'
          }
        })

        setDataUser(userResponse.data.message.Data || [])
        setDataMarket(marketResponse.data.message.Data || [])
        setDataProduct(productResponse.data.message.Data || [])
        setDataPost(postResponse.data.message.Data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [value])

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h5' color='primary'>
          TCTM Manager
        </Typography>
        <Typography variant='body2'>Membership approval management page</Typography>
      </Box>
      <Card sx={{ width: '100%' }}>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='User' value='1' />
                <Tab label='Marketplace' value='2' />
                <Tab label='Product' value='3' />
                <Tab label='Post' value='4' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <MemberTable rows={dataUser} />
            </TabPanel>
            <TabPanel value='2'>
              <SupplierTable rows={dataMarket} />
            </TabPanel>
            <TabPanel value='3'>
              <ProductTable rows={dataProduct} />
            </TabPanel>
            <TabPanel value='4'>
              <PostTable rows={dataPost} />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default ManagementPage
