// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** Material UI Imports
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Container,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
  Typography
} from '@mui/material'

// ** Material-UI Icons Imports
import TaskIcon from '@mui/icons-material/Task'
import CloseIcon from '@mui/icons-material/Close'

// ** Material Design Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Plus from 'mdi-material-ui/Plus'
import CircleSmall from 'mdi-material-ui/CircleSmall'
import ChevronRight from 'mdi-material-ui/ChevronRight'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'

const rows = [
  { id: 1, Order_id: 1, Order_date: '2021-10-10', Order_Name: 'Order 1', amount: 1000, status: '1' },
  { id: 2, Order_id: 2, Order_date: '2021-10-10', Order_Name: 'Order 2', amount: 2000, status: '2' },
  { id: 3, Order_id: 3, Order_date: '2021-10-10', Order_Name: 'Order 3', amount: 3000, status: '3' },
  { id: 4, Order_id: 4, Order_date: '2021-10-10', Order_Name: 'Order 4', amount: 4000, status: '4' },
  { id: 5, Order_id: 5, Order_date: '2021-10-10', Order_Name: 'Order 5', amount: 5000, status: '5' }
]

const columns = [
  { field: 'Order_id', headerName: 'ID', width: 100 },
  { field: 'Order_date', headerName: 'Date', width: 200 },
  { field: 'Order_Name', headerName: 'Order Name', width: 280 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    renderCell: rowCell => {
      const reqStatus = rowCell.value
      if (reqStatus === '1') {
        return <Chip label='Waiting for payment' color='warning' />
      } else if (reqStatus === '2') {
        return <Chip label='Send payment' color='primary' />
      } else if (reqStatus === '3') {
        return <Chip label='Success' color='success' />
      } else if (reqStatus === '4') {
        return <Chip label='have a problem' color='error' />
      } else {
        return <Chip label='Unknow' color='secondary' />
      }
    }
  },
  {
    field: 'view',
    headerName: 'View',
    width: 150,
    renderCell: rowCell => (
      <Button variant='contained' endIcon={<EyeOutline />}>
        View
      </Button>
    )
  },
  {
    field: 'Approve',
    headerName: 'Approve',
    minWidth: 150,
    renderCell: rowCell => (
      <Button variant='contained' color='success' startIcon={<TaskIcon />}>
        Approve
      </Button>
    )
  },
  {
    field: 'Reject',
    headerName: 'Reject',
    minWidth: 150,
    renderCell: rowCell => (
      <Button variant='contained' color='error' startIcon={<CloseIcon />}>
        Reject
      </Button>
    )
  }
]

const Orders = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
          <FormControl fullWidth size='small' variant='outlined' sx={{ maxHeight: '42px', height: '42px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>Category</InputLabel>
            <Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' label='Category'>
              <MenuItem>1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
          <TextField fullWidth size='small' label='Search' variant='outlined' />
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={4} xs={4}>
          <Button fullWidth size='small' variant='outlined' sx={{ height: '100%' }}>
            Reset
          </Button>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', paddingLeft: 1 }}>
            <Typography variant='body1' fontSize='1.5rem bold' color='#000'>
              0 Orders
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  )
}

export default Orders
