// ** React Imports
import React from 'react'

// ** MUI Imports
import { Card, Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect } from 'react'

const ShowResults = ({ productOptions, productOptionGroups }) => {
  const columns = productOptions.map((option, index) => {
    return {
      field: option.optionName,
      headerName: option.optionName,
      width: 150
    }
  })
  columns.push({ field: 'optionGroupQuantity', headerName: 'Quantity', width: 150 })
  columns.push({ field: 'optionGroupPrice', headerName: 'Price', width: 150 })

  const rows = productOptionGroups.map((optionGroup, index) => {
    let row = {}
    productOptions.map((option, index) => {
      ;(row.id = optionGroup.optionGroupId),
        (row[option.optionName] = optionGroup[`optionGroupColumn${index + 1}`]),
        (row.optionGroupPrice = optionGroup.optionGroupPrice),
        (row.optionGroupQuantity = optionGroup.optionGroupQuantity)
    })

    return row
  })

  useEffect(() => {
    console.log(rows)
  }, [rows])

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Show Results
      </Typography>
      <Card sx={{ p: 8, marginBlock: 5 }}>
        <DataGrid rows={rows} columns={columns} />
      </Card>
    </Box>
  )
}

export default ShowResults
