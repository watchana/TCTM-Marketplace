import React, { useState, useEffect } from 'react'
import { Box, Tab, Card, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MemberTable from 'src/views/admin/manager/MemberTable'
import SupplierTable from 'src/views/admin/manager/SupplierTable'
import ProductTable from 'src/views/admin/manager/ProductTable'
import axios from 'axios'

const ManagerPage = () => {
  const [value, setValue] = useState('1')
  const [dataUser, setDataUser] = useState([])
  const [dataMarket, setDataMarket] = useState([])
  const [dataProduct, setDataProduct] = useState([])

  console.log('ข้อมูล product', dataProduct)

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

        setDataUser(userResponse.data.message.Data || [])
        setDataMarket(marketResponse.data.message.Data || [])
        setDataProduct(productResponse.data.message.Data || [])
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
          </TabContext>
        </Box>
      </Card>
    </>
  )
}

export default ManagerPage
