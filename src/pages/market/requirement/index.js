// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

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

// ** Data Grid Columns
const columns = [
  { field: 'id', headerName: 'ID  ', width: 90 },
  { field: 'title', headerName: 'Title', width: 350 },
  { field: 'name_member', headerName: 'Name Member', width: 300 },
  { field: 'status', headerName: 'Status', width: 300 },
  {
    field: 'action',
    headerName: 'Action',
    width: 300,
    renderCell: rowCell => (
      <>
        <Button variant='contained' onClick={() => handleEditButtonClick(rowCell.row)}>
          view
        </Button>
        <Button variant='contained' onClick={() => handleEditButtonClick(rowCell.row)}>
          Answer
        </Button>
        <Button variant='contained' onClick={() => handleEditButtonClick(rowCell.row)}>
          refuse
        </Button>
      </>
    )
  }
]

const rows = [
  { id: 1, title: 'Snow', name_member: 'Jon', status: 'Active' },
  { id: 2, title: 'Lannister', name_member: 'Cersei', status: 'Active' },
  { id: 3, title: 'Lannister', name_member: 'Jaime', status: 'Active' }
]

const Requirement = () => {
  return <DataGrid rows={rows} columns={columns} pageSize={5} />
}

export default Requirement
