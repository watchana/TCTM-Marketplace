// ** React Imports
import { React, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'

import { DataGrid } from '@mui/x-data-grid'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** Data Grid Columns
const columns = [
  { field: 'id', headerName: 'No.', width: 90 },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 150,
    editable: true
  },
  {
    field: 'details',
    headerName: 'Product Details',
    width: 150,
    editable: true
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    width: 110,
    editable: true
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    sortable: false,
    width: 160
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 160
  }
]

// ** Data Grid Rows
const rows = [
  { id: 1, details: 'text', name: 'text', stock: 35, price: 30, status: 'tradable' },
  { id: 2, details: 'text', name: 'text', stock: 42, price: 30, status: 'In progress' },
  { id: 3, details: 'text', name: 'text', stock: 45, price: 30, status: 'tradable' },
  { id: 4, details: 'text', name: 'text', stock: 16, price: 30, status: 'In progress' },
  { id: 5, details: 'text', name: 'text', stock: 32, price: 30, status: 'tradable' },
  { id: 6, details: 'text', name: null, stock: 15, price: 30, status: 'tradable' },
  { id: 7, details: 'text', name: 'text', stock: 44, price: 30, status: 'In progress' },
  { id: 8, details: 'text', name: 'text', stock: 36, price: 30, status: 'tradable' },
  { id: 9, details: 'text', name: 'text', stock: 65, price: 30, status: 'In progress' }
]

const MyMarket = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='xl'>
      <Box>
        {/* แทบไปหน้าต่างๆ */}
        <Box sx={{ width: '100%', marginBottom: '29px' }}>
          <Breadcrumbs separator={<ChevronRight />} aria-label='breadcrumb'>
            <Link underline='hover' color='inherit' href='/'>
              Home
            </Link>
            <Link underline='hover' color='inherit' href='/designs/myMarket/'>
              My Market
            </Link>
          </Breadcrumbs>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography variant='h4' fontSize={36}>
            My Market
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginY: 8, paddingLeft: { xl: 6, lg: 6, md: 0 } }}>
          <Grid container spacing={6}>
            {/* ที่กรอกข้อมูล */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%', bgcolor: '#fff', borderRadius: '7px', padding: 4 }}>
                <Grid container sx={{ marginBottom: 4 }}>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth variant='standard' sx={{ width: '90%' }}>
                      <Typography variant='h6' fontSize={18}>
                        Product Name
                      </Typography>
                      <TextField size='small' id='outlined-basic' variant='outlined' />
                    </FormControl>
                  </Grid>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <FormControl fullWidth variant='standard' sx={{ width: '90%' }}>
                      <Typography variant='h6' fontSize={18}>
                        Product Category
                      </Typography>
                      <TextField size='small' id='outlined-basic' variant='outlined' />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* ปุ่ม */}
                <Grid container>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Box
                      sx={{
                        width: '90%',
                        display: 'flex',
                        direction: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: { sm: 2, xs: 2 }
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Search
                      </Button>
                      <Button variant='contained' color='primary'>
                        Reset
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xl={6} md={6} sm={12} xs={12}>
                    <Box sx={{ width: '90%' }}>
                      <Button variant='contained' color='primary' startIcon={<Plus />}>
                        Add Product
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* ผลรวม Product */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: { xl: '50%', lg: '50%', md: '50%', sm: '100%' },
                    height: '163px',
                    bgcolor: '#fff',
                    borderRadius: '7px',
                    padding: 4
                  }}
                >
                  <Typography variant='h3' fontSize={34} align='center' sx={{ marginBottom: 4 }}>
                    Product List
                  </Typography>
                  <Typography variant='h2' fontSize={54} align='center'>
                    1
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* ตารางแสดงข้อมูล */}
        <Box sx={{ width: '100%', typography: 'body1', bgcolor: '#fff', borderRadius: '7px' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='lab API tabs example'>
                <Tab label='All Product' value='1' />
                <Tab label='Distribution' value='2' />
                <Tab label='Sell out' value='3' />
              </TabList>
            </Box>
            {/* ใส่ Data Grid */}
            <TabPanel value='1'>
              <Box sx={{ width: '100%', height: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5
                      }
                    }
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </Box>
            </TabPanel>
            <TabPanel value='2'>Item Two</TabPanel>
            <TabPanel value='3'>Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  )
}

export default MyMarket
