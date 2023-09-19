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

const Requirement = SubID => {
  // next Router
  const router = useRouter()

  // ตัวแปรเก็บค่าข้อมูล
  const sub_id = SubID.sub_id
  const [rowdata, setRowData] = useState('')

  // console.log('row', rowdata)

  // เก็บค่าข้อมูลลง Api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}TCTM.requirements.allrequirement_inone_market`,
          {
            params: {
              sub_id: sub_id
            }
          }
        )

        // console.log('Api', response.data.message.Data[0].member_id)
        setRowData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [sub_id])

  // ** Data Grid Columns
  const columns = [
    { field: 'req_id', headerName: 'ID  ', width: 90 },
    { field: 'req_header', headerName: 'Title', width: 250 },
    {
      field: 'creation',
      headerName: 'Post Time',
      width: 300,
      valueGetter: params => {
        return params.row.creation.substring(0, 19)
      }
    },
    {
      field: 'req_status',
      headerName: 'Status',
      width: 150,
      renderCell: params => {
        const reqStatus = params.row.req_status
        if (reqStatus === '2') {
          return <Chip label='Pending' color='warning' />
        } else if (reqStatus === '3') {
          return <Chip label='Success' color='success' />
        } else {
          return <Chip label='Unknow' color='secondary' />
        }
      }
    },
    {
      field: 'Detail',
      headerName: 'Detail',
      minWidth: 100,
      renderCell: rowCell => {
        const handleDetailClick = () => {
          router.push(
            `/market/port-detail-marker/?req_id=${rowCell.row.req_id}&sub_id=${sub_id}&member_id2=${rowCell.row.member_id}`
          )
        }

        return (
          <Button variant='outlined' endIcon={<EyeOutline />} onClick={handleDetailClick}>
            View
          </Button>
        )
      }
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

  return (
    <Box sx={{ padding: '10px 10px 15px' }}>
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
              0 Requirements
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', marginTop: 4 }}>
        {rowdata && rowdata.length > 0 ? (
          <DataGrid rows={rowdata} columns={columns} getRowId={row => row.req_id} pageSize={5} />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h6' fontSize='24px bold'>
              There are no Requirements.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Requirement
