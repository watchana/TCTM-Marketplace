// ** React Imports
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Hidden from '@mui/material/Hidden'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Autocomplete from '@mui/material/Autocomplete'
import { Select, MenuItem } from '@mui/material'

// ** MUI X Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Axios Import
import axios from 'axios'


const Requirement = SubID => {
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

        // console.log('Api', response.data.message.Data);
        setRowData(response.data.message.Data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

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
    valueGetter: params => {
      const reqStatus = params.row.req_status
      if (reqStatus === '2') {
        return 'ปกติ'
      } else if (reqStatus === '3') {
        return 'สำเร็จ'
      } else {
        return 'Unknown'
      }
    }
  },
  {
    field: 'Detail',
    headerName: 'Detail',
    minWidth: 100,
    renderCell: rowCell => {
      const router = useRouter()
      const handleDetailClick = () => {
        router.push(`/market/port-detail-marker/?req_id=${rowCell.row.req_id}&sub_id=${sub_id}`)
      }

      return (
        <Button variant='contained' onClick={handleDetailClick}>
          Detail
        </Button>
      )
    }
  },
]

  return (
    <>
      {rowdata && rowdata.length > 0 ? (
        <DataGrid rows={rowdata} columns={columns} getRowId={row => row.req_id} pageSize={5} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>No Data</div>
      )}
    </>
  )
}

export default Requirement
